"use client";

import { useState, useRef, useEffect } from "react";

// ─── n8n webhook URL ──────────────────────────────────────────────────────────
// Kendi n8n webhook URL'nizi buraya yapıştırın.
const N8N_WEBHOOK_URL =
  process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL ||
  "https://hohenhim.app.n8n.cloud/webhook/dishci-webchat";
// ─────────────────────────────────────────────────────────────────────────────

type Role = "user" | "assistant";

interface Message {
  id: string;
  role: Role;
  text: string;
  timestamp: Date;
  status?: "sending" | "sent" | "error";
}

const WELCOME_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  text: "Merhaba! Ben Radent AI. Kliniğiniz için yapay zeka destekli randevu ve otomasyon sistemleri kuruyoruz. Demo almak, fiyat öğrenmek veya sistemi tanımak ister misiniz?",
  timestamp: new Date(),
  status: "sent",
};

function formatTime(date: Date) {
  return date.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" });
}

function generateId() {
  return Math.random().toString(36).slice(2) + Date.now();
}

// ─── Typing indicator ─────────────────────────────────────────────────────────
function TypingDots() {
  return (
    <div className="cw-typing-indicator">
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}

// ─── Main widget ──────────────────────────────────────────────────────────────
export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [unread, setUnread] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 150);
      setUnread(0);
    }
  }, [open]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || isTyping) return;

    const userMsg: Message = {
      id: generateId(),
      role: "user",
      text,
      timestamp: new Date(),
      status: "sending",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          sessionId: getSessionId()
        }),
      });

      // Mark user message as sent
      setMessages((prev) =>
        prev.map((m) => (m.id === userMsg.id ? { ...m, status: "sent" } : m))
      );

      let botText = "";

      if (res.ok) {
        try {
          const data = await res.json();
          // n8n'den dönen yanıtı çeşitli formatlarda destekle
          botText =
            data?.output ||
            data?.message ||
            data?.text ||
            data?.response ||
            (typeof data === "string" ? data : botText);
        } catch {
          // JSON parse başarısız olursa raw text'i dene
          const raw = await res.text().catch(() => "");
          if (raw) botText = raw;
        }
      } else {
        botText = "Üzgünüm, şu an bağlantı sağlanamıyor. Lütfen biraz sonra tekrar deneyin veya bizi WhatsApp'tan arayın.";
      }

      const botMsg: Message = {
        id: generateId(),
        role: "assistant",
        text: botText,
        timestamp: new Date(),
        status: "sent",
      };

      setMessages((prev) => [...prev, botMsg]);

      if (!open) setUnread((n) => n + 1);
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === userMsg.id ? { ...m, status: "error" } : m
        )
      );

      const errMsg: Message = {
        id: generateId(),
        role: "assistant",
        text: "Bağlantı hatası oluştu. İnternet bağlantınızı kontrol edip tekrar deneyin.",
        timestamp: new Date(),
        status: "sent",
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([WELCOME_MESSAGE]);
    setUnread(0);
  };

  return (
    <>
      {/* ── Embedded styles (fully self-contained) ── */}
      <style>{`
        /* ─── Variables ─────────────────────── */
        .cw-root {
          --cw-bg: #0d0d1a;
          --cw-surface: #13131f;
          --cw-border: rgba(255,255,255,0.08);
          --cw-accent: #7c3aed;
          --cw-accent-2: #3b82f6;
          --cw-accent-glow: rgba(124,58,237,0.4);
          --cw-text: #f1f5f9;
          --cw-text-muted: rgba(241,245,249,0.45);
          --cw-user-bg: linear-gradient(135deg,#7c3aed,#4f46e5);
          --cw-bot-bg: #1e1e30;
          --cw-radius: 20px;
          --cw-font: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          font-family: var(--cw-font);
        }

        /* ─── FAB button ─────────────────────── */
        .cw-fab {
          position: fixed;
          bottom: 28px;
          right: 28px;
          z-index: 9999;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          background: linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%);
          box-shadow: 0 8px 32px rgba(124,58,237,0.45), 0 2px 8px rgba(0,0,0,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.25s cubic-bezier(.34,1.56,.64,1), box-shadow 0.25s ease;
          outline: none;
        }
        .cw-fab:hover {
          transform: scale(1.1);
          box-shadow: 0 12px 40px rgba(124,58,237,0.6), 0 2px 8px rgba(0,0,0,0.4);
        }
        .cw-fab svg { transition: transform 0.3s ease; }
        .cw-fab[data-open="true"] svg { transform: rotate(45deg); }

        .cw-fab-badge {
          position: absolute;
          top: -2px;
          right: -2px;
          min-width: 20px;
          height: 20px;
          border-radius: 10px;
          background: #ef4444;
          color: #fff;
          font-size: 11px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 4px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
          animation: cw-pop 0.3s cubic-bezier(.34,1.56,.64,1);
        }

        @keyframes cw-pop {
          from { transform: scale(0); }
          to   { transform: scale(1); }
        }

        /* ─── Window ─────────────────────────── */
        .cw-window {
          position: fixed;
          bottom: 100px;
          right: 28px;
          z-index: 9998;
          width: 380px;
          max-width: calc(100vw - 32px);
          height: 560px;
          max-height: calc(100vh - 120px);
          border-radius: var(--cw-radius);
          background: var(--cw-bg);
          border: 1px solid var(--cw-border);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow:
            0 32px 80px rgba(0,0,0,0.6),
            0 0 0 1px rgba(124,58,237,0.15),
            0 0 60px rgba(124,58,237,0.08);
          transform-origin: bottom right;
          transition: transform 0.3s cubic-bezier(.34,1.56,.64,1), opacity 0.25s ease;
        }
        .cw-window[data-open="false"] {
          transform: scale(0.85) translateY(20px);
          opacity: 0;
          pointer-events: none;
        }
        .cw-window[data-open="true"] {
          transform: scale(1) translateY(0);
          opacity: 1;
        }

        /* ─── Header ─────────────────────────── */
        .cw-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 18px;
          background: linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(59,130,246,0.1) 100%);
          border-bottom: 1px solid var(--cw-border);
          flex-shrink: 0;
        }
        .cw-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #7c3aed, #3b82f6);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(124,58,237,0.35);
        }
        .cw-header-info { flex: 1; min-width: 0; }
        .cw-header-name {
          font-size: 14px;
          font-weight: 700;
          color: var(--cw-text);
          line-height: 1;
          margin-bottom: 3px;
        }
        .cw-header-status {
          font-size: 11px;
          color: var(--cw-text-muted);
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .cw-header-status::before {
          content: '';
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 6px #22c55e;
          animation: cw-blink 2s ease-in-out infinite;
        }
        @keyframes cw-blink {
          0%,100% { opacity:1; }
          50% { opacity:0.4; }
        }
        .cw-header-actions { display: flex; gap: 4px; }
        .cw-icon-btn {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          border: none;
          background: transparent;
          color: var(--cw-text-muted);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.15s, color 0.15s;
        }
        .cw-icon-btn:hover {
          background: rgba(255,255,255,0.08);
          color: var(--cw-text);
        }

        /* ─── Messages ───────────────────────── */
        .cw-messages {
          flex: 1;
          overflow-y: auto;
          padding: 18px 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          scroll-behavior: smooth;
        }
        .cw-messages::-webkit-scrollbar { width: 4px; }
        .cw-messages::-webkit-scrollbar-track { background: transparent; }
        .cw-messages::-webkit-scrollbar-thumb {
          background: rgba(124,58,237,0.4);
          border-radius: 2px;
        }

        /* ─── Message bubble ─────────────────── */
        .cw-msg-row {
          display: flex;
          gap: 8px;
          animation: cw-fade-in 0.3s ease;
        }
        @keyframes cw-fade-in {
          from { opacity:0; transform: translateY(8px); }
          to   { opacity:1; transform: translateY(0); }
        }
        .cw-msg-row.user { flex-direction: row-reverse; }

        .cw-msg-avatar {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 700;
          margin-top: 2px;
        }
        .cw-msg-avatar.bot {
          background: linear-gradient(135deg,#7c3aed,#3b82f6);
          color: #fff;
        }
        .cw-msg-avatar.user {
          background: rgba(255,255,255,0.1);
          color: var(--cw-text);
        }

        .cw-msg-content { max-width: 78%; display: flex; flex-direction: column; gap: 2px; }
        .cw-msg-row.user .cw-msg-content { align-items: flex-end; }

        .cw-bubble {
          padding: 10px 14px;
          border-radius: 16px;
          font-size: 13.5px;
          line-height: 1.55;
          word-break: break-word;
          position: relative;
        }
        .cw-bubble.bot {
          background: var(--cw-bot-bg);
          color: var(--cw-text);
          border-bottom-left-radius: 4px;
          border: 1px solid rgba(255,255,255,0.06);
        }
        .cw-bubble.user {
          background: var(--cw-user-bg);
          color: #fff;
          border-bottom-right-radius: 4px;
          box-shadow: 0 4px 16px rgba(124,58,237,0.3);
        }
        .cw-bubble.error {
          background: rgba(239,68,68,0.12);
          border: 1px solid rgba(239,68,68,0.25);
          color: #fca5a5;
        }

        .cw-msg-meta {
          font-size: 10.5px;
          color: var(--cw-text-muted);
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .cw-msg-row.user .cw-msg-meta { flex-direction: row-reverse; }

        /* ─── Typing indicator ───────────────── */
        .cw-typing-row {
          display: flex;
          gap: 8px;
          align-items: flex-end;
          animation: cw-fade-in 0.3s ease;
        }
        .cw-typing-bubble {
          background: var(--cw-bot-bg);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px;
          border-bottom-left-radius: 4px;
          padding: 10px 14px;
        }
        .cw-typing-indicator {
          display: flex;
          gap: 4px;
          align-items: center;
          height: 16px;
        }
        .cw-typing-indicator span {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--cw-text-muted);
          animation: cw-bounce 1.2s ease-in-out infinite;
        }
        .cw-typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
        .cw-typing-indicator span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes cw-bounce {
          0%,60%,100% { transform: translateY(0); opacity:0.4; }
          30%          { transform: translateY(-6px); opacity:1; }
        }

        /* ─── Divider ────────────────────────── */
        .cw-divider {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--cw-text-muted);
          font-size: 11px;
          margin: 4px 0;
        }
        .cw-divider::before, .cw-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: var(--cw-border);
        }

        /* ─── Footer / Input ─────────────────── */
        .cw-footer {
          padding: 14px 14px 16px;
          border-top: 1px solid var(--cw-border);
          background: var(--cw-surface);
          flex-shrink: 0;
        }
        .cw-input-row {
          display: flex;
          align-items: flex-end;
          gap: 8px;
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--cw-border);
          border-radius: 14px;
          padding: 8px 8px 8px 14px;
          transition: border-color 0.2s;
        }
        .cw-input-row:focus-within {
          border-color: rgba(124,58,237,0.5);
          box-shadow: 0 0 0 3px rgba(124,58,237,0.08);
        }
        .cw-textarea {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          resize: none;
          color: var(--cw-text);
          font-size: 13.5px;
          line-height: 1.5;
          font-family: var(--cw-font);
          max-height: 100px;
          min-height: 22px;
        }
        .cw-textarea::placeholder { color: var(--cw-text-muted); }
        .cw-send-btn {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          background: linear-gradient(135deg,#7c3aed,#4f46e5);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
          box-shadow: 0 4px 12px rgba(124,58,237,0.35);
        }
        .cw-send-btn:hover:not(:disabled) {
          transform: scale(1.08);
          box-shadow: 0 6px 18px rgba(124,58,237,0.5);
        }
        .cw-send-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        .cw-footer-note {
          text-align: center;
          font-size: 10.5px;
          color: var(--cw-text-muted);
          margin-top: 8px;
        }
        .cw-footer-note a { color: rgba(167,139,250,0.8); text-decoration: none; }
        .cw-footer-note a:hover { color: #a78bfa; }
      `}</style>

      {/* ── Widget root ── */}
      <div className="cw-root">
        {/* Chat window */}
        <div className="cw-window" data-open={open ? "true" : "false"} role="dialog" aria-label="Radent AI Sohbet">
          {/* Header */}
          <div className="cw-header">
            <div className="cw-avatar">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" fill="white" opacity="0" />
                <path d="M9 9h2v1.5l3-2.5v8l-3-2.5V15H9V9z" fill="white" opacity="0" />
                <circle cx="12" cy="12" r="4" fill="white" opacity="0.9" />
                <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm-1 5.5v-3l2.5 1.5-2.5 1.5z" fill="white" />
              </svg>
            </div>
            <div className="cw-header-info">
              <div className="cw-header-name">Radent AI Asistan</div>
              <div className="cw-header-status">Çevrimiçi &amp; hazır</div>
            </div>
            <div className="cw-header-actions">
              <button className="cw-icon-btn" title="Sohbeti temizle" onClick={clearChat} aria-label="Sohbeti temizle">
                <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
              <button className="cw-icon-btn" title="Kapat" onClick={() => setOpen(false)} aria-label="Pencereyi kapat">
                <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="cw-messages">
            <div className="cw-divider">Bugün</div>

            {messages.map((msg) => (
              <div key={msg.id} className={`cw-msg-row ${msg.role === "user" ? "user" : ""}`}>
                <div className={`cw-msg-avatar ${msg.role === "user" ? "user" : "bot"}`}>
                  {msg.role === "user" ? "S" : "AI"}
                </div>
                <div className="cw-msg-content">
                  <div className={`cw-bubble ${msg.role === "user" ? "user" : "bot"} ${msg.status === "error" ? "error" : ""}`}>
                    {msg.text}
                  </div>
                  <div className="cw-msg-meta">
                    {formatTime(msg.timestamp)}
                    {msg.role === "user" && msg.status === "sending" && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ opacity: 0.5 }}>
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                      </svg>
                    )}
                    {msg.role === "user" && msg.status === "sent" && (
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="#22c55e">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                      </svg>
                    )}
                    {msg.status === "error" && <span style={{ color: "#f87171" }}>• hata</span>}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="cw-typing-row">
                <div className="cw-msg-avatar bot">AI</div>
                <div className="cw-typing-bubble">
                  <TypingDots />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Footer */}
          <div className="cw-footer">
            <div className="cw-input-row">
              <textarea
                ref={inputRef}
                className="cw-textarea"
                placeholder="Mesajınızı yazın…"
                value={input}
                rows={1}
                onChange={(e) => {
                  setInput(e.target.value);
                  // Auto-resize
                  e.target.style.height = "auto";
                  e.target.style.height = `${Math.min(e.target.scrollHeight, 100)}px`;
                }}
                onKeyDown={handleKeyDown}
                disabled={isTyping}
                aria-label="Mesaj yaz"
              />
              <button
                className="cw-send-btn"
                onClick={sendMessage}
                disabled={!input.trim() || isTyping}
                aria-label="Gönder"
              >
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                  <path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M22 2L15 22 11 13 2 9l20-7z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <div className="cw-footer-note">
              <a href="https://radent.ai" target="_blank" rel="noopener noreferrer">Radent AI</a> tarafından desteklenmektedir
            </div>
          </div>
        </div>

        {/* FAB trigger */}
        <button
          className="cw-fab"
          onClick={() => setOpen((o) => !o)}
          data-open={open ? "true" : "false"}
          aria-label={open ? "Sohbeti kapat" : "Sohbeti aç"}
        >
          {/* Chat icon / X icon */}
          <svg width="26" height="26" fill="none" viewBox="0 0 24 24">
            {open ? (
              /* X */
              <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
            ) : (
              /* Chat bubble */
              <>
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8 10h8M8 13h5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </>
            )}
          </svg>
          {!open && unread > 0 && (
            <div className="cw-fab-badge">{unread > 9 ? "9+" : unread}</div>
          )}
        </button>
      </div>
    </>
  );
}

// ─── Session helper ───────────────────────────────────────────────────────────
function getSessionId(): string {
  if (typeof window === "undefined") return "ssr";
  const sessionId = localStorage.getItem('chatSessionId') || Math.random().toString(36).substring(7);
  localStorage.setItem('chatSessionId', sessionId);
  return sessionId;
}
