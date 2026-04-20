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


declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

/* ================= COMPONENT ================= */

export default function ChatUI() {

  /* ================= STATE ================= */
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [chatStarted,setChatStarted] = useState(false)
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [typingText, setTypingText] = useState("");
  const [mode, setMode] = useState<"thinking" | "creative" | "fast">("fast");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState<FeedbackType>(null); 
  const [listening, setListening] = useState<boolean>(false);

  /* ================= REFS ================= */
  const recognitionRef = useRef<any>(null);
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

/*text to speech*/   

const speakText = (text: string) => {
  window.speechSynthesis.cancel(); // stop previous

  const speech = new SpeechSynthesisUtterance(text);

  const voices = window.speechSynthesis.getVoices();

  // 🔥 Try to pick best male voice
  const selectedVoice =
    voices.find((v) =>
      v.name.includes("Google UK English Male")
    ) ||
    voices.find((v) =>
      v.name.includes("Microsoft David")
    ) ||
    voices[0];

  speech.voice = selectedVoice;
  speech.rate = 2;
  speech.pitch = 0.9;

  window.speechSynthesis.speak(speech);
};

/*stt*/

useEffect(() => {
  const SpeechRecognition =
    (window as any).webkitSpeechRecognition;

  if (!SpeechRecognition) {
    console.log("❌ Not supported");
    return;
  }

  const recognition = new SpeechRecognition();

  recognition.lang = "en-US";
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onstart = () => {
    console.log("🎤 Listening...");
    setListening(true);
  };

  recognition.onresult = (event: any) => {
    console.log("✅ RESULT EVENT FIRED");

    const transcript = event.results[0][0].transcript;  

    console.log("📝 TEXT:", transcript);

    setInput(transcript);
    setTimeout(() => {
    handleSend(transcript);
  }, 300);
  };

  recognition.onerror = (e: any) => {
    console.log("❌ ERROR:", e.error);
  };

  recognition.onend = () => {
    console.log("🔴 Mic ended");
    setListening(false);
  };

  recognitionRef.current = recognition;
}, []);

const handleMic = () => {
  if (!recognitionRef.current) return;

  try {
    recognitionRef.current.start();
  } catch (e) {
    console.log("Already running...");
  }
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


/*close sidebar and open*/ 

const CloseIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M15 6L9 12L15 18"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const OpenIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M9 6L15 12L9 18"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);



  /* ================= SEND FUNCTION ================= */

const handleSend = async (presetMessage?: string) => {
  const textToSend = (presetMessage ?? input).trim();

  if (!textToSend) return;

  // ✅ Start chat if first message
  setChatStarted(true);

  // ✅ Add user message
  const userMessage = {
    text: textToSend,
    sender: "user" as const,
  };

  setMessages((prev) => [...prev, userMessage]);
  setInput("");
  setIsThinking(true);

  try {
    // ✅ Format last messages (context window)
    const formattedMessages = [
      ...messages.slice(-6).map((msg) => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.text,
      })),
      { role: "user", content: textToSend },
    ];

    // ✅ API call
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

    if (!res.ok) {
      throw new Error(`Server error: ${res.status}`);
    }

    const data = await res.json();

    const reply: string =
      typeof data?.reply === "string" && data.reply.trim()
        ? data.reply
        : "No response from AI.";

    // ✅ Save bot message
    setMessages((prev) => [
      ...prev,
      { text: reply, sender: "bot" },
    ]);

    // 🔊 ✅ TEXT TO SPEECH (IMPORTANT)
    window.speechSynthesis.cancel(); // stop previous

    const speech = new SpeechSynthesisUtterance(reply);
    speech.lang = "en-US";
    speech.rate = 1;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);

  } catch (err: any) {
    console.error("Send Error:", err?.message || err);

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

    <button
  className="toggle-btn"
  onClick={() => setSidebarOpen(!sidebarOpen)}
>
  {sidebarOpen ? <CloseIcon /> : <OpenIcon />}
</button>

  <aside className={`sidebar ${sidebarOpen ? "" : "closed"}`}>
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

{/* MOBILE TOP LOGO */}
<div className="mobile-top-logo">
  KauX AI
</div>
    

      {/* INPUT (FIXED) */}
      <div className={`input-container ${messages.length > 0 ? "bottom" : "center"}`}>

        {/* TITLE (only landing) */}
        {messages.length === 0 && (
          <h1 className="center-title">
            Hi <span className="user-gradient">user! </span>how can i
           help you?
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
          <div className="input-actions">
            <button onClick={handleMic} className="mic-btn">
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="9" y="1" width="6" height="11" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0" />
      <line x1="12" y1="18" x2="12" y2="22" />
    </svg>

  </button>

          <button
            onClick={() => handleSend()}
            disabled={isThinking}
            className="send-btn"
          >
            →
          </button>
        </div>
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