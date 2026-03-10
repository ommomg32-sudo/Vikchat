import { useState, useCallback, useRef, useEffect } from "react";

type ChatStatus = "idle" | "searching" | "connected" | "disconnected";

interface Message {
  id: string;
  content: string;
  sender: "me" | "stranger";
  timestamp: Date;
}

const SESSION_TOKEN_KEY = "vikchat_session_token";

function getStoredToken(): string | null {
  try {
    return localStorage.getItem(SESSION_TOKEN_KEY);
  } catch {
    return null;
  }
}

function storeToken(token: string): void {
  try {
    localStorage.setItem(SESSION_TOKEN_KEY, token);
  } catch {
    // Ignore storage errors
  }
}

export function useChat() {
  const [status, setStatus] = useState<ChatStatus>("idle");
  const [messages, setMessages] = useState<Message[]>([]);
  const [onlineCount, setOnlineCount] = useState<number>(150);
  const [chatId, setChatId] = useState<number | null>(null);
  
  const sessionTokenRef = useRef<string | null>(getStoredToken());
  const lastMessageIdRef = useRef<number | null>(null);
  const pollingRef = useRef<NodeJS.Timeout | null>(null);
  const statusPollingRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch online count
  const fetchOnlineCount = useCallback(async () => {
    try {
      const res = await fetch("/api/chat/online");
      const data = await res.json();
      if (data.online) {
        setOnlineCount(data.online);
      }
    } catch {
      // Ignore errors
    }
  }, []);

  // Poll for messages
  const pollMessages = useCallback(async () => {
    if (!sessionTokenRef.current || !chatId) return;

    try {
      const res = await fetch("/api/chat/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionToken: sessionTokenRef.current,
          lastMessageId: lastMessageIdRef.current,
        }),
      });
      
      const data = await res.json();
      
      if (data.messages && data.messages.length > 0) {
        const newMessages: Message[] = data.messages.map((msg: { id: number; content: string; isMe: boolean; createdAt: string }) => ({
          id: msg.id.toString(),
          content: msg.content,
          sender: msg.isMe ? "me" : "stranger",
          timestamp: new Date(msg.createdAt),
        }));
        
        setMessages((prev) => {
          const existingIds = new Set(prev.map((m) => m.id));
          const uniqueNew = newMessages.filter((m) => !existingIds.has(m.id));
          return [...prev, ...uniqueNew];
        });
        
        const lastMsg = data.messages[data.messages.length - 1];
        if (lastMsg) {
          lastMessageIdRef.current = lastMsg.id;
        }
      }
    } catch {
      // Ignore polling errors
    }
  }, [chatId]);

  // Poll for status changes (when searching)
  const pollStatus = useCallback(async () => {
    if (!sessionTokenRef.current) return;

    try {
      const res = await fetch("/api/chat/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionToken: sessionTokenRef.current }),
      });
      
      const data = await res.json();
      
      if (data.status === "connected" && data.chatId) {
        setStatus("connected");
        setChatId(data.chatId);
        lastMessageIdRef.current = null;
        setMessages([]);
      } else if (data.status === "disconnected") {
        setStatus("disconnected");
        setChatId(null);
      }
    } catch {
      // Ignore errors
    }
  }, []);

  // Start searching for a match
  const startSearching = useCallback(async () => {
    setStatus("searching");
    setMessages([]);
    setChatId(null);
    lastMessageIdRef.current = null;

    try {
      const res = await fetch("/api/chat/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionToken: sessionTokenRef.current }),
      });
      
      const data = await res.json();
      
      if (data.sessionToken) {
        sessionTokenRef.current = data.sessionToken;
        storeToken(data.sessionToken);
      }
      
      if (data.status === "connected" && data.chatId) {
        setStatus("connected");
        setChatId(data.chatId);
      } else {
        setStatus("searching");
      }
    } catch {
      setStatus("idle");
    }
  }, []);

  // Send a message
  const sendMessage = useCallback(async (content: string) => {
    if (!sessionTokenRef.current || !content.trim()) return;

    // Optimistically add the message
    const tempId = `temp-${Date.now()}`;
    const newMessage: Message = {
      id: tempId,
      content: content.trim(),
      sender: "me",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);

    try {
      const res = await fetch("/api/chat/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionToken: sessionTokenRef.current,
          content: content.trim(),
        }),
      });
      
      const data = await res.json();
      
      if (data.message) {
        // Replace temp message with real one
        setMessages((prev) =>
          prev.map((m) =>
            m.id === tempId
              ? { ...m, id: data.message.id.toString() }
              : m
          )
        );
        lastMessageIdRef.current = data.message.id;
      }
    } catch {
      // Keep the optimistic message but mark as failed if needed
    }
  }, []);

  // Disconnect from chat
  const disconnect = useCallback(async () => {
    if (!sessionTokenRef.current) return;

    try {
      await fetch("/api/chat/disconnect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionToken: sessionTokenRef.current }),
      });
    } catch {
      // Ignore errors
    }

    setStatus("disconnected");
    setChatId(null);
  }, []);

  // Skip to next person
  const skipToNext = useCallback(async () => {
    if (!sessionTokenRef.current) return;

    setStatus("searching");
    setMessages([]);
    lastMessageIdRef.current = null;

    try {
      const res = await fetch("/api/chat/skip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionToken: sessionTokenRef.current }),
      });
      
      const data = await res.json();
      
      if (data.status === "connected" && data.chatId) {
        setStatus("connected");
        setChatId(data.chatId);
      } else {
        setStatus("searching");
      }
    } catch {
      setStatus("idle");
    }
  }, []);

  // Set up polling intervals
  useEffect(() => {
    // Fetch online count periodically
    fetchOnlineCount();
    const onlineInterval = setInterval(fetchOnlineCount, 30000);
    
    return () => clearInterval(onlineInterval);
  }, [fetchOnlineCount]);

  // Message polling when connected
  useEffect(() => {
    if (status === "connected" && chatId) {
      pollMessages();
      pollingRef.current = setInterval(pollMessages, 1000);
    } else {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
        pollingRef.current = null;
      }
    }
    
    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
      }
    };
  }, [status, chatId, pollMessages]);

  // Status polling when searching
  useEffect(() => {
    if (status === "searching") {
      statusPollingRef.current = setInterval(pollStatus, 1500);
    } else {
      if (statusPollingRef.current) {
        clearInterval(statusPollingRef.current);
        statusPollingRef.current = null;
      }
    }
    
    return () => {
      if (statusPollingRef.current) {
        clearInterval(statusPollingRef.current);
      }
    };
  }, [status, pollStatus]);

  // Also poll status when connected to detect disconnection
  useEffect(() => {
    if (status === "connected") {
      const interval = setInterval(pollStatus, 3000);
      return () => clearInterval(interval);
    }
  }, [status, pollStatus]);

  return {
    status,
    messages,
    onlineCount,
    startSearching,
    sendMessage,
    disconnect,
    skipToNext,
  };
}
