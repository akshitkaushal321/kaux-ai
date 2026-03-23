"use client";

import { useState, useRef, useEffect } from "react";
import ChatHeader from "./chatheader";

/* ================= TYPES ================= */

type Message = {
  text: string;
  sender: "user" | "bot";
};

type FeedbackType = "like" | "dislike" | null;

const QUICK_MESSAGES = [
  "Who Created you?",
  "Tell me a Joke 👅",
  "What is Generative AI 🧠",
  "How are you? 🧏"
];

/* ================= COMPONENT ================= */

export default function ChatUI() {

  /* ================= STATE ================= */

  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [chatStarted,setChatStarted] = useState(false)
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [typingText, setTypingText] = useState("");
  const [mode, setMode] = useState<"thinking" | "creative" | "fast">("fast");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState<FeedbackType>(null); 


  /* ================= REFS ================= */

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  /* ================= AUTO SCROLL ================= */

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typingText]);

  /* ================= AUTO GROW TEXTAREA ================= */

  const handleInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {

    setInput(e.target.value);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }

  };

  /* ================= TYPEWRITER ================= */

  const addBotMessageWithTyping = (reply: string) => {
  // Step 1: empty bot message add
  setMessages((prev) => [
    ...prev,
    { text: "", sender: "bot" },
  ]);

  let index = 0;

  const speed = 12; // 🔥 lower = faster (10–20 best)

  const interval = setInterval(() => {
    index++;

    setMessages((prev) => {
      const updated = [...prev];

      updated[updated.length - 1] = {
        text: reply.slice(0, index),
        sender: "bot",
      };

      return updated;
    });

    if (index >= reply.length) {
      clearInterval(interval);
    }
  }, speed);
};


   /* ================= copy function ================= */

  const handleCopy = (text: string, index: number) => {
  navigator.clipboard.writeText(text);

  setCopiedIndex(index);

  setTimeout(() => {
    setCopiedIndex(null);
  }, 1500);
};

/*new chat function*/

const handleNewChat = () => {
  setMessages([]);
  setMode("fast");
  setTypingText("");
  setIsThinking(false);
  setChatStarted(false);
};

/*like and dislike function*/ 

  const handleFeedback = (index: number, type: Exclude<FeedbackType, null>) => {
  setSelectedIndex(index);
  setSelectedType(type);
};

  /* ================= SEND FUNCTION ================= */

  const handleSend = async (presetMessage?: string) => {
  const textToSend = (presetMessage ?? input).trim();

  if (!textToSend || isThinking) return;

  setChatStarted(true);

  const userMessage = { text: textToSend, sender: "user" as const };

  setMessages((prev) => [...prev, userMessage]);
  setInput("");
  setIsThinking(true);

  try {
    // ✅ Convert to OpenAI format
    const formattedMessages = [
      ...messages.slice(-6).map((msg) => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.text,
      })),
      { role: "user", content: textToSend },
    ];

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: formattedMessages,
        mode,
      }),
    });

    if (!res.ok) throw new Error("Server error");

    const data = await res.json();

    const reply = data?.reply || "No response from AI.";


    // ✅ Save bot message
    setMessages((prev) => [
      ...prev,
      { text: reply, sender: "bot" },
    ]);

  } catch (err: any) {
    console.error("Send Error:", err.message);

    const errorMsg = "Server error. Please try again.";



    setMessages((prev) => [
      ...prev,
      { text: errorMsg, sender: "bot" },
    ]);

  } finally {
    setIsThinking(false);
  }
};

 /* ============== UI ============== */

return (
  <div className="app-layout">

    {/* SIDEBAR */}
    <aside className="sidebar">
      <h2 className="logo">KauX</h2>

      <button className="new-chat">+ New Chat</button>

      <div className="modes">
        <p className="modes-title">Modes</p>
        <button
  onClick={() => setMode("thinking")}
  className={`mode-btn ${mode === "thinking" ? "active-blue" : ""}`}
>
 ✺ Thinking
</button>

<button
  onClick={() => setMode("creative")}
  className={`mode-btn ${mode === "creative" ? "active-green" : ""}`}
>
 ✴ Creative
</button>

<button
  onClick={() => setMode("fast")}
  className={`mode-btn ${mode === "fast" ? "active-red" : ""}`}
>
 ❋  Fast
</button>
      </div>
    </aside>

    {/* MAIN CHAT */}
    <div className="chat-page">

      {/* HEADER */}
      <ChatHeader />

      {/* CHAT AREA (ONLY ONE) */}
      <div className="chat-area">
        <div className="chat-inner">

          {/* MESSAGES */}
          {messages.map((m, i) => (
            <div key={i} className={`message ${m.sender}`}>
              <div className="bubble-wrapper">
                <span className={`bubble ${m.sender}`}>
                  {m.text}
                </span>

                  {/*like and dislike button*/}

                  <div className="message-actions">
      {m.sender === "bot" && (
        <div className="feedback-buttons">
          <button
            className={
              selectedIndex === i && selectedType === "like"
                ? "active"
                : ""
            }
            onClick={() => handleFeedback(i, "like")}
          >
            ❤︎
          </button>

          <button
            className={
              selectedIndex === i && selectedType === "dislike"
                ? "active"
                : ""
            }
            onClick={() => handleFeedback(i, "dislike")}
          >
            ⟳
          </button>

          {selectedIndex === i && (

            <span className="thanks-text">
              Thanks for feedback ❤️
            </span>
          )}
        </div>
      )}
                {/* COPY BUTTON */}
                {m.sender === "bot" && (
                  <button
                    className="copy-btn"
                    onClick={() => handleCopy(m.text, i)}
                  >
                    {copiedIndex === i ? "✓" : "⧉"}
                  </button>
                )}
              </div>
            </div>
            </div>
          ))}

          {/* TYPING EFFECT */}
          {typingText && (
            <div className="message bot">
              <span className="bubble bot">{typingText}</span>
            </div>
          )}

          {/* SCROLL ANCHOR */}
          <div ref={messagesEndRef} />

        </div>
      </div>

    

      {/* INPUT (FIXED) */}
      <div className={`input-container ${messages.length > 0 ? "bottom" : "center"}`}>

        {/* TITLE (only landing) */}
        {messages.length === 0 && (
          <h1 className="center-title">
            What brings you here? 🚀
          </h1>
        )}

        {/* INPUT BAR */}
        <div className="input-bar">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleInputChange}
            placeholder="Ask KauX..."
            disabled={isThinking}
            rows={1}
            className="chat-textarea"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />

          <button
            onClick={() => handleSend()}
            disabled={isThinking}
            className="send-btn"
          >
            →
          </button>
        </div>

        {/* QUICK BUTTONS (only landing) */}
        {messages.length === 0 && (
          <div className="quick-row">
            {QUICK_MESSAGES.map((msg) => (
              <button
                key={msg}
                onClick={() => handleSend(msg)}
                className="quick-btn"
              >
                {msg}
              </button>
            ))}
          </div>
        )}

      </div>
    </div>

  </div>
);
}