import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Send, 
  SkipForward, 
  X, 
  MessageCircle, 
  Loader2,
  ArrowLeft,
  Users
} from "lucide-react";
import { Button } from "@/react-app/components/ui/button";
import { Input } from "@/react-app/components/ui/input";
import { useChat } from "@/react-app/hooks/useChat";

export default function ChatRoom() {
  const {
    status,
    messages,
    onlineCount,
    startSearching,
    sendMessage,
    disconnect,
    skipToNext,
  } = useChat();

  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (status === "connected") {
      inputRef.current?.focus();
    }
  }, [status]);

  const handleSendMessage = () => {
    if (!inputValue.trim() || status !== "connected") return;
    sendMessage(inputValue.trim());
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatOnlineCount = (count: number) => {
    return count.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-xl border-b border-border sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              to="/" 
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back</span>
            </Link>
            
            <div className="h-6 w-px bg-border" />
            
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-bold text-lg text-foreground">
                Vik<span className="text-primary">Chat</span>
              </span>
            </Link>
          </div>

          {/* Status indicator */}
          <div className="flex items-center gap-3">
            {status === "connected" && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-green-400">Connected</span>
              </div>
            )}
            {status === "searching" && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-500/10 border border-yellow-500/20 rounded-full">
                <Loader2 className="w-3 h-3 text-yellow-400 animate-spin" />
                <span className="text-sm font-medium text-yellow-400">Searching...</span>
              </div>
            )}
            <div className="hidden sm:flex items-center gap-2 text-muted-foreground">
              <Users className="w-4 h-4" />
              <span className="text-sm">{formatOnlineCount(onlineCount)} online</span>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col max-w-4xl w-full mx-auto">
        {/* Messages container */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          {status === "idle" && (
            <IdleState onStart={startSearching} onlineCount={onlineCount} />
          )}

          {status === "searching" && (
            <SearchingState />
          )}

          {(status === "connected" || status === "disconnected") && (
            <div className="space-y-4">
              {/* Connection message */}
              <div className="text-center">
                <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm rounded-full">
                  {status === "connected" 
                    ? "You're now chatting with a stranger!" 
                    : "Chat has ended"}
                </span>
              </div>

              {/* Messages */}
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-border bg-card/50 backdrop-blur-xl p-4">
          <div className="max-w-4xl mx-auto">
            {status === "connected" && (
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={disconnect}
                  className="shrink-0 border-destructive/50 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                  title="Disconnect"
                >
                  <X className="w-5 h-5" />
                </Button>
                
                <div className="flex-1 relative">
                  <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message..."
                    className="pr-12 bg-secondary border-border focus:border-primary h-12"
                  />
                  <Button
                    size="icon"
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    className="absolute right-1.5 top-1.5 h-9 w-9 bg-primary hover:bg-primary/90"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>

                <Button
                  variant="outline"
                  onClick={skipToNext}
                  className="shrink-0 border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground gap-2"
                >
                  <SkipForward className="w-4 h-4" />
                  <span className="hidden sm:inline">Next</span>
                </Button>
              </div>
            )}

            {status === "disconnected" && (
              <div className="flex justify-center gap-4">
                <Button
                  onClick={startSearching}
                  className="bg-primary hover:bg-primary/90 gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  Find New Chat
                </Button>
                <Link to="/">
                  <Button variant="outline">
                    Back to Home
                  </Button>
                </Link>
              </div>
            )}

            {(status === "idle" || status === "searching") && (
              <div className="text-center text-muted-foreground text-sm">
                {status === "searching" 
                  ? "Looking for someone to chat with..." 
                  : "Click the button above to start chatting!"}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface IdleStateProps {
  onStart: () => void;
  onlineCount: number;
}

function IdleState({ onStart, onlineCount }: IdleStateProps) {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 glow">
        <MessageCircle className="w-10 h-10 text-white" />
      </div>
      <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground mb-3">
        Ready to chat?
      </h2>
      <p className="text-muted-foreground max-w-md mb-8">
        Click the button below to connect with a random stranger from around the world. 
        Be respectful and have fun!
      </p>
      <Button 
        size="lg" 
        onClick={onStart}
        className="bg-primary hover:bg-primary/90 font-semibold px-8 py-6 text-lg glow"
      >
        Start Chatting
      </Button>
      
      <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-400 rounded-full" />
          {onlineCount.toLocaleString()} online now
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4" />
          Free & Anonymous
        </div>
      </div>
    </div>
  );
}

function SearchingState() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="relative mb-8">
        <div className="w-20 h-20 rounded-full border-4 border-primary/30 border-t-primary animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Users className="w-8 h-8 text-primary" />
        </div>
      </div>
      <h2 className="font-display font-bold text-2xl text-foreground mb-2">
        Finding a stranger...
      </h2>
      <p className="text-muted-foreground">
        Connecting you with someone awesome
      </p>
    </div>
  );
}

interface Message {
  id: string;
  content: string;
  sender: "me" | "stranger";
  timestamp: Date;
}

function MessageBubble({ message }: { message: Message }) {
  const isMe = message.sender === "me";
  
  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] sm:max-w-[70%] px-4 py-2.5 rounded-2xl ${
          isMe
            ? "bg-primary text-primary-foreground rounded-tr-sm"
            : "bg-secondary text-foreground rounded-tl-sm"
        }`}
      >
        <p className="text-sm sm:text-base break-words">{message.content}</p>
      </div>
    </div>
  );
}
