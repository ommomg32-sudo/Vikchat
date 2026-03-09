import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/react-app/pages/Home";
import ChatRoom from "@/react-app/pages/ChatRoom";
import About from "@/react-app/pages/About";
import Support from "@/react-app/pages/Support";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<ChatRoom />} />
        <Route path="/about" element={<About />} />
        <Route path="/support" element={<Support />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
