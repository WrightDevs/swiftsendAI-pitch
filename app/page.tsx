"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";

import {

  Sparkles, ArrowRight, ChevronLeft, ChevronRight, CheckCircle2, Circle,

  Zap, ShieldCheck, Wallet, MessageSquare, Send, ArrowRightLeft, AtSign,

  Gauge, Coins, Network, Clock3, Rocket, Users, Briefcase, PiggyBank, Plane

} from "lucide-react";



/* ---------------------------------------------------------------

   SwiftSend AI — brand tokens (green theme)

--------------------------------------------------------------- */

const C = {

  primary: "#15845F",

  primaryBright: "#059669",

  primaryDeep: "#127554",

  onPrimary: "#FFFFFF",

  ink: "#191D24",

  inkSoft: "#676F7E",

  canvas: "#FFFFFF",

  paper: "#FAFAFA",

  cloud: "#F3F4F6",

  hairline: "#E5E7EB",

  tagBg: "#ECFDF5",

  stepBg: "#D1FAE5",

};



const cardShadow = "0 20px 25px -5px rgba(21,132,95,0.05), 0 8px 10px -6px rgba(21,132,95,0.05)";

const glowShadow = "0 10px 15px -3px rgba(21,132,95,0.2), 0 4px 6px -4px rgba(21,132,95,0.2)";



/* ---------------------------------------------------------------

   Small building blocks

--------------------------------------------------------------- */

function Tag({ children, tone = "default" }) {

  const style =

    tone === "muted"

      ? { background: C.cloud, color: C.inkSoft }

      : { background: C.tagBg, color: C.primary };

  return (

    <span

      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1"

      style={{ ...style, fontSize: 12, fontWeight: 500, letterSpacing: 0.2 }}

    >

      {children}

    </span>

  );

}



function Eyebrow({ index, total, label }) {

  return (

    <div className="flex items-center gap-2 mb-6 stagger-item" style={{ color: C.inkSoft, fontSize: 13, fontWeight: 500, "--d": "0ms" }}>

      <span style={{ color: C.primary, fontWeight: 700 }}>

        {String(index + 1).padStart(2, "0")}

      </span>

      <span style={{ color: C.hairline }}>/</span>

      <span>{String(total).padStart(2, "0")}</span>

      <span className="w-6 h-px" style={{ background: C.hairline }} />

      <span>{label}</span>

    </div>

  );

}



function H({ children, size = "lg" }) {

  const px = size === "xl" ? 44 : size === "lg" ? 34 : 24;

  return (

    <h2

      className="stagger-item"

      style={{

        fontFamily: "'DM Sans', system-ui, sans-serif",

        fontWeight: 700,

        fontSize: px,

        lineHeight: 1.15,

        color: C.ink,

        letterSpacing: "-0.01em",

        "--d": "90ms",

      }}

    >

      {children}

    </h2>

  );

}



function Body({ children, muted = true, size = 16 }) {

  return (

    <p style={{ color: muted ? C.inkSoft : C.ink, fontSize: size, lineHeight: 1.6, fontWeight: 400 }}>

      {children}

    </p>

  );

}



function Card({ children, className = "", style = {}, delay = 0 }) {

  return (

    <div

      className={`rounded-2xl p-6 hover-card stagger-item ${className}`}

      style={{ background: C.paper, boxShadow: cardShadow, "--d": `${140 + delay * 70}ms`, ...style }}

    >

      {children}

    </div>

  );

}



/* ---------------------------------------------------------------

   iPhone 17 mockup — refined minimal aesthetic

--------------------------------------------------------------- */

function IPhoneMockup({ children, className = "" }) {

  return (

    <div className={`relative float-phone ${className}`} style={{ width: 280, height: 572 }}>

      {/* soft floor shadow */}

      <div

        className="absolute left-1/2 -translate-x-1/2 rounded-full"

        style={{ bottom: -26, width: 190, height: 26, background: "radial-gradient(ellipse, rgba(25,29,36,0.12), transparent 72%)" }}

      />



      {/* thin side controls */}

      <div className="absolute -right-[1.5px] top-[130px] w-[1.5px] h-14 rounded-r-sm" style={{ background: "#A0A0A0" }} />

      <div className="absolute -left-[1.5px] top-[100px] w-[1.5px] h-6 rounded-l-sm" style={{ background: "#A0A0A0" }} />

      <div className="absolute -left-[1.5px] top-[140px] w-[1.5px] h-12 rounded-l-sm" style={{ background: "#A0A0A0" }} />



      {/* outer bezel — clean metallic gradient */}

      <div

        className="absolute inset-0 rounded-[2.8rem]"

        style={{

          background: "linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 50%, #f0f0f0 100%)",

          boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.08), 0 20px 40px -12px rgba(0,0,0,0.15)",

        }}

      />



      {/* screen */}

      <div className="absolute z-10 rounded-[2.4rem] overflow-hidden" style={{ inset: 10, background: C.canvas, boxShadow: `inset 0 0 0 1px rgba(0,0,0,0.06)` }}>

        {/* notch */}

        <div className="absolute left-1/2 -translate-x-1/2 top-2 z-20 rounded-b-2xl" style={{ width: 76, height: 22, background: "#000000" }} />

        <div className="w-full h-full pt-10">{children}</div>

      </div>

    </div>

  );

}



function BrowserMockup({ children, className = "", url = "app.swiftsend.ai" }) {

  return (

    <div

      className={`rounded-2xl overflow-hidden ${className}`}

      style={{ background: C.canvas, boxShadow: "0 25px 50px -12px rgba(21,132,95,0.18)", border: `1px solid ${C.hairline}` }}

    >

      <div className="flex items-center gap-3 px-4 py-3" style={{ background: C.cloud, borderBottom: `1px solid ${C.hairline}` }}>

        <div className="flex gap-1.5">

          {[0, 1, 2].map((i) => (

            <span key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: C.hairline }} />

          ))}

        </div>

        <div

          className="flex-1 mx-2 rounded-full px-3 py-1 text-center"

          style={{ background: C.canvas, color: C.inkSoft, fontSize: 12, border: `1px solid ${C.hairline}` }}

        >

          {url}

        </div>

      </div>

      {children}

    </div>

  );

}



/* ---------------------------------------------------------------

   Animated chat demo

--------------------------------------------------------------- */

const SCRIPT = [

  { from: "bot", text: "Hey! I'm SwiftSend AI. Who would you like to send to?" },

  { from: "user", text: "Send 500 USDC to John's GTBank" },

  { from: "bot", text: "Got it. Routing SOL → USDC on Jupiter at best rate..." },

  { from: "bot", text: "John will receive ₦757,500. Confirm to send?" },

  { from: "user", text: "Confirm" },

  { from: "bot", text: "Sent! Naira payout is simulated for this demo build." },

];



function ChatDemo() {

  const [visible, setVisible] = useState(0);

  const [typing, setTyping] = useState(false);

  const scrollRef = useRef(null);



  useEffect(() => {

    let cancelled = false;

    let step = 0;



    const run = () => {

      if (cancelled) return;

      if (step >= SCRIPT.length) {

        setTimeout(() => {

          if (cancelled) return;

          setVisible(0);

          setTyping(false);

          step = 0;

          setTimeout(run, 500);

        }, 2200);

        return;

      }

      const msg = SCRIPT[step];

      if (msg.from === "bot") {

        setTyping(true);

        setTimeout(() => {

          if (cancelled) return;

          setTyping(false);

          setVisible((v) => v + 1);

          step += 1;

          setTimeout(run, 550);

        }, 850);

      } else {

        setTimeout(() => {

          if (cancelled) return;

          setVisible((v) => v + 1);

          step += 1;

          setTimeout(run, 650);

        }, 500);

      }

    };

    const kickoff = setTimeout(run, 500);

    return () => { cancelled = true; clearTimeout(kickoff); };

  }, []);



  useEffect(() => {

    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;

  }, [visible, typing]);



  return (

    <div className="flex flex-col h-full" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>

      <div className="flex items-center gap-2.5 px-4 py-3" style={{ borderBottom: `1px solid ${C.hairline}` }}>

        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: C.tagBg }}>

          <Zap size={15} color={C.primary} />

        </div>

        <div>

          <div style={{ fontSize: 13, fontWeight: 600, color: C.ink }}>SwiftSend AI</div>

          <div className="flex items-center gap-1" style={{ fontSize: 11, color: C.primaryBright }}>

            <span className="w-1.5 h-1.5 rounded-full pulse-dot" style={{ background: C.primaryBright }} />

            Online

          </div>

        </div>

      </div>

      <div ref={scrollRef} className="flex-1 overflow-hidden px-3 py-3 flex flex-col gap-2" style={{ background: C.canvas }}>

        {SCRIPT.slice(0, visible).map((m, i) => (

          <div

            key={i}

            className={`chat-bubble-in max-w-[85%] rounded-2xl px-3 py-2 ${m.from === "user" ? "self-end" : "self-start"}`}

            style={{

              background: m.from === "user" ? C.primary : C.cloud,

              color: m.from === "user" ? C.onPrimary : C.ink,

              fontSize: 12.5,

              lineHeight: 1.45,

            }}

          >

            {m.text}

          </div>

        ))}

        {typing && (

          <div className="self-start rounded-2xl px-3 py-2.5 flex gap-1" style={{ background: C.cloud }}>

            {[0, 1, 2].map((i) => (

              <span

                key={i}

                className="w-1.5 h-1.5 rounded-full typing-dot"

                style={{ background: C.inkSoft, animationDelay: `${i * 0.15}s` }}

              />

            ))}

          </div>

        )}

      </div>

      <div className="px-3 pb-3 pt-1">

        <div className="flex items-center gap-2 rounded-full px-3 py-2" style={{ background: C.canvas, border: `1px solid ${C.hairline}` }}>

          <span style={{ fontSize: 11.5, color: C.inkSoft, flex: 1 }}>Type a command...</span>

          <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: C.primary }}>

            <Send size={11} color={C.onPrimary} />

          </div>

        </div>

      </div>

    </div>

  );

}



/* ---------------------------------------------------------------

   Browser dashboard mock

--------------------------------------------------------------- */

function DashboardMock() {

  const [tab, setTab] = useState("people");

  return (

    <div className="h-full bg-white flex" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>

      {/* Left side - Chat/Dashboard */}

      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Header */}

        <div className="px-6 py-4 border-b" style={{ borderColor: C.hairline }}>

          <div className="flex items-center justify-between mb-2">

            <div className="flex items-center gap-2">

              <Zap size={18} color={C.primary} />

              <div>

                <div style={{ fontSize: 15, fontWeight: 700, color: C.ink }}>SwiftSend AI</div>

                <div style={{ fontSize: 12, color: C.inkSoft }}>Crypto to fiat, in a chat.</div>

              </div>

            </div>

            <Tag style={{ background: C.primary, color: C.onPrimary }}>

              <Wallet size={12} />

              8PgiUN...FiT8

            </Tag>

          </div>

        </div>

        {/* Chat area */}

        <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-4">

          {/* User message */}

          <div className="flex justify-end">

            <div className="max-w-xs rounded-3xl px-4 py-2" style={{ background: C.primary, color: C.onPrimary, fontSize: 13 }}>

              send 0.0008 sol to Righteous

            </div>

          </div>

          {/* Bot response */}

          <div className="flex justify-start">

            <div className="max-w-md rounded-3xl px-4 py-3" style={{ background: C.paper }}>

              <div style={{ color: C.inkSoft, fontSize: 13, marginBottom: 12 }}>Here's the breakdown before I send anything — take a look and reply <strong style={{ color: C.ink }}>confirm</strong> to proceed.</div>

              {/* Send Breakdown card */}

              <div className="rounded-lg px-4 py-3" style={{ border: `1px solid ${C.hairline}` }}>

                <div style={{ fontSize: 12, fontWeight: 600, color: C.ink, marginBottom: 10 }}>Send Breakdown</div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-2" style={{ marginBottom: 10 }}>

                  <div>

                    <div style={{ fontSize: 11, color: C.inkSoft, fontWeight: 500, marginBottom: 2 }}>AMOUNT IN</div>

                    <div style={{ fontSize: 15, fontWeight: 700, color: C.ink }}>0.0008 SOL</div>

                  </div>

                  <div>

                    <div style={{ fontSize: 11, color: C.inkSoft, fontWeight: 500, marginBottom: 2 }}>JUPITER CONVERSION</div>

                    <div style={{ fontSize: 15, fontWeight: 700, color: C.ink }}>~0.76 USDC</div>

                  </div>

                  <div>

                    <div style={{ fontSize: 11, color: C.inkSoft, fontWeight: 500, marginBottom: 2 }}>SLIPPAGE</div>

                    <div style={{ fontSize: 15, fontWeight: 700, color: C.ink }}>0.50%</div>

                  </div>

                  <div>

                    <div style={{ fontSize: 11, color: C.inkSoft, fontWeight: 500, marginBottom: 2 }}>PAYOUT ESTIMATE</div>

                    <div style={{ fontSize: 17, fontWeight: 700, color: C.primary }}>1216.00 NGN</div>

                  </div>

                </div>

                <div style={{ fontSize: 10, color: C.inkSoft, marginBottom: 8 }}>Rate: ~1600 NGN/USDC (test-mode estimate)</div>

                <div style={{ background: "#FEF3C7", border: "1px solid #FDE68A", borderRadius: 6, padding: "8px 10px", fontSize: 11, color: "#92400E", display: "flex", gap: 6, alignItems: "flex-start" }}>

                  <span>⚠</span>

                  <span>Live bank settlement isn't configured yet — the payout leg is simulated as a test USDC transfer.</span>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Input */}

        <div className="px-6 pb-6">

          <div className="flex gap-2 items-center rounded-full px-4 py-2.5" style={{ border: `1px solid ${C.hairline}`, background: C.canvas }}>

            <input type="text" placeholder="Type a command..." style={{ fontSize: 13, color: C.ink, flex: 1, border: "none", outline: "none", background: "transparent" }} />

            <button style={{ width: 32, height: 32, borderRadius: 9999, background: C.primary, color: C.onPrimary, border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>

              <Send size={14} />

            </button>

          </div>

        </div>

      </div>

      {/* Right sidebar */}

      <div className="w-64 border-l flex flex-col" style={{ borderColor: C.hairline, background: C.canvas }}>

        {/* Tabs */}

        <div className="flex border-b" style={{ borderColor: C.hairline }}>

          <button onClick={() => setTab("history")} className="flex-1 px-4 py-3 text-center" style={{ fontSize: 12, fontWeight: 500, color: tab === "history" ? C.primary : C.inkSoft, borderBottom: tab === "history" ? `2px solid ${C.primary}` : "none" }}>

            <Clock3 size={14} className="inline mr-1" />

            History

          </button>

          <button onClick={() => setTab("people")} className="flex-1 px-4 py-3 text-center" style={{ fontSize: 12, fontWeight: 500, color: tab === "people" ? C.primary : C.inkSoft, borderBottom: tab === "people" ? `2px solid ${C.primary}` : "none" }}>

            <Users size={14} className="inline mr-1" />

            People

          </button>

        </div>

        {/* Tab content */}

        {tab === "people" && (

          <div className="flex-1 overflow-y-auto p-4">

            <div className="flex items-center justify-between mb-4">

              <div style={{ fontSize: 13, fontWeight: 600, color: C.ink }}>Recipients</div>

              <button style={{ width: 28, height: 28, borderRadius: 9999, background: C.primary, color: C.onPrimary, border: "none", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>

                +

              </button>

            </div>

            {/* Recipient card */}

            <div className="rounded-lg p-3" style={{ border: `1px solid ${C.hairline}` }}>

              <div className="flex items-center gap-2 mb-2">

                <div className="w-8 h-8 rounded-full" style={{ background: C.tagBg, display: "flex", alignItems: "center", justifyContent: "center" }}>

                  <Users size={14} color={C.primary} />

                </div>

                <div style={{ fontWeight: 600, fontSize: 13, color: C.ink }}>Righteous</div>

                <CheckCircle2 size={14} color={C.primaryBright} className="ml-auto" />

              </div>

              <div style={{ fontSize: 11, color: C.inkSoft, lineHeight: 1.4 }}>

                Moniepoint MFB — 7089...

                <div style={{ color: C.primary, fontWeight: 500 }}>RIGHTEOUS IHECHI NDUBUSI</div>

              </div>

            </div>

          </div>

        )}

      </div>

    </div>

  );

}



/* ---------------------------------------------------------------

   Abstract ambient background

--------------------------------------------------------------- */

function AbstractAmbient() {

  return (

    <div className="absolute inset-0 overflow-hidden">

      <div className="blob-a absolute rounded-full" style={{ width: 560, height: 560, top: -220, right: -180, background: "radial-gradient(circle, rgba(21,132,95,0.14), transparent 68%)", filter: "blur(2px)" }} />

      <div className="blob-b absolute rounded-full" style={{ width: 460, height: 460, bottom: -200, left: -160, background: "radial-gradient(circle, rgba(5,150,105,0.12), transparent 68%)", filter: "blur(2px)" }} />

      <div className="blob-c absolute rounded-full" style={{ width: 300, height: 300, top: "38%", left: "48%", background: "radial-gradient(circle, rgba(21,132,95,0.07), transparent 70%)" }} />



      <svg className="absolute ring-a" style={{ top: "12%", right: "14%", width: 220, height: 220 }} viewBox="0 0 100 100">

        <circle cx="50" cy="50" r="46" fill="none" stroke="#15845F" strokeOpacity="0.16" strokeWidth="0.6" strokeDasharray="1 6" strokeLinecap="round" />

      </svg>

      <svg className="absolute ring-b" style={{ bottom: "16%", left: "10%", width: 160, height: 160 }} viewBox="0 0 100 100">

        <rect x="8" y="8" width="84" height="84" rx="24" fill="none" stroke="#059669" strokeOpacity="0.14" strokeWidth="0.7" />

      </svg>

      <svg className="absolute ring-c" style={{ top: "58%", right: "6%", width: 120, height: 120 }} viewBox="0 0 100 100">

        <polygon points="50,4 95,50 50,96 5,50" fill="none" stroke="#127554" strokeOpacity="0.12" strokeWidth="0.7" />

      </svg>

    </div>

  );

}



/* ---------------------------------------------------------------

   Slides

--------------------------------------------------------------- */

function SlideHero({ i, total }) {

  return (

    <div className="grid md:grid-cols-2 gap-10 items-center w-full">

      <div>

        <Eyebrow index={i} total={total} label="SwiftSend AI · Hack4FUTO Vibecoding" />

        <div className="mb-5 stagger-item" style={{ "--d": "60ms" }}><Tag><Sparkles size={12} /> Crypto to Fiat, Reimagined</Tag></div>

        <H size="xl">

          Send crypto to any <span style={{ color: C.primary }}>bank account</span> — just chat.

        </H>

        <div className="mt-5 max-w-md stagger-item" style={{ "--d": "160ms" }}><Body>

          SwiftSend AI turns natural language into a Solana transaction and a bank payout. No forms, no manual swaps — type who, how much, and it handles the rest.

        </Body></div>

        <div className="mt-8 flex flex-wrap items-center gap-3 stagger-item" style={{ "--d": "230ms" }}>

          <div

            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 cursor-pointer btn-hover"

            style={{ background: C.primary, color: C.onPrimary, fontWeight: 600, fontSize: 14, boxShadow: glowShadow }}

          >

            Built at Hack4FUTO <ArrowRight size={15} />

          </div>

          <Tag tone="muted"><ShieldCheck size={12} /> Wallet-based, no passwords</Tag>

        </div>

      </div>

      <div className="flex justify-center stagger-item" style={{ "--d": "120ms" }}>

        <IPhoneMockup><ChatDemo /></IPhoneMockup>

      </div>

    </div>

  );

}



function SlideProblem({ i, total }) {

  const items = [

    { icon: Coins, t: "Crypto sits idle", d: "USDC and SOL balances grow, but rent, food, and family transfers still need naira in a bank account." },

    { icon: Network, t: "Off-ramping is a maze", d: "Three or four apps — swap here, withdraw there, bank transfer last — just to spend what you already hold." },

    { icon: Clock3, t: "Trust and speed both suffer", d: "Manual P2P means waiting, hoping rates hold, and trusting intermediaries. One wrong step and funds disappear." },

  ];

  const stats = [

    { num: "42M+", label: "Africans hold crypto" },

    { num: "12.5%", label: "Nigeria's crypto penetration" },

    { num: "5-30 min", label: "Current off-ramp time" },

    { num: "2-3%", label: "Typical fee charges" },

  ];

  return (

    <div className="w-full grid md:grid-cols-2 gap-10 items-center">

      <div>

        <Eyebrow index={i} total={total} label="The Problem" />

        <div className="mb-4"><H>Nigeria holds crypto. Nigeria still can't spend it directly.</H></div>

        <div className="mb-8 stagger-item" style={{ "--d": "110ms" }}><Body size={15}>

          Every crypto holder in the country — trader, freelancer, saver — hits the same wall the moment they need naira in hand.

        </Body></div>

        <div className="grid grid-cols-2 gap-3">

          {stats.map((s, k) => (

            <div key={k} className="rounded-lg px-4 py-3 stagger-item" style={{ background: C.paper, border: `1px solid ${C.hairline}`, "--d": `${200 + k * 60}ms` }}>

              <div style={{ fontSize: 20, fontWeight: 700, color: C.primary, marginBottom: 4 }}>{s.num}</div>

              <div style={{ fontSize: 11, color: C.inkSoft }}>{s.label}</div>

            </div>

          ))}

        </div>

      </div>

      <div className="flex flex-col gap-4">

        {items.map((it, k) => (

          <Card key={k} delay={k} className="flex items-start gap-4" style={{ display: "flex", padding: 20 }}>

            <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: C.stepBg }}>

              <it.icon size={16} color={C.primaryDeep} />

            </div>

            <div>

              <div style={{ fontWeight: 600, fontSize: 15, color: C.ink, marginBottom: 4 }}>{it.t}</div>

              <Body size={13.5}>{it.d}</Body>

            </div>

          </Card>

        ))}

      </div>

    </div>

  );

}



function SlideWhoFor({ i, total }) {

  const items = [

    { icon: Briefcase, t: "Freelancers paid in stablecoins", d: "Devs and creators earning USDC from global clients, needing naira for daily life." },

    { icon: PiggyBank, t: "Traders and savers", d: "Anyone holding SOL or USDC as a hedge, who wants to cash out part of it without friction." },

    { icon: Plane, t: "Diaspora & family support", d: "Nigerians abroad sending crypto home, and family converting it to spend locally." },

    { icon: Users, t: "Everyday holders", d: "Anyone in Nigeria who owns crypto and just wants it to behave like money when it needs to." },

  ];

  return (

    <div className="w-full">

      <Eyebrow index={i} total={total} label="Who It's For" />

      <div className="max-w-2xl mb-10"><H>Built for anyone holding crypto in Nigeria.</H></div>

      <div className="grid md:grid-cols-2 gap-4">

        {items.map((it, k) => (

          <Card key={k} delay={k} className="flex items-start gap-4" style={{ display: "flex" }}>

            <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: C.tagBg }}>

              <it.icon size={17} color={C.primary} />

            </div>

            <div>

              <div style={{ fontWeight: 600, fontSize: 15, color: C.ink, marginBottom: 4 }}>{it.t}</div>

              <Body size={13.5}>{it.d}</Body>

            </div>

          </Card>

        ))}

      </div>

    </div>

  );

}



function SlideSolution({ i, total }) {

  const items = [

    { t: "No forms", d: "One sentence in plain English is the entire transaction. Chat feels natural — no dropdowns, fields, or confusion." },

    { t: "No manual routing", d: "SwiftSend AI parses intent, finds the recipient, routes through Jupiter for the best rate, and prepares everything." },

    { t: "No guesswork", d: "Live conversion rates, slippage, and NGN payout estimate shown before you confirm. You always see what's going out and what arrives." },

  ];

  return (

    <div className="w-full grid md:grid-cols-2 gap-10 items-center">

      <div>

        <Eyebrow index={i} total={total} label="The Solution" />

        <H>Talk to your wallet.<br />It handles the rest.</H>

        <div className="mt-6 flex flex-col gap-4">

          {items.map((it, k) => (

            <div key={k} className="flex gap-3 stagger-item" style={{ "--d": `${180 + k * 90}ms` }}>

              <CheckCircle2 size={18} color={C.primaryBright} className="mt-0.5 shrink-0" />

              <div>

                <div style={{ fontWeight: 600, color: C.ink, fontSize: 15 }}>{it.t}</div>

                <Body size={14}>{it.d}</Body>

              </div>

            </div>

          ))}

        </div>

      </div>

      <Card style={{ background: C.canvas, border: `1px solid ${C.hairline}`, boxShadow: cardShadow }} className="hover-card">

        <div style={{ fontFamily: "'DM Sans'", fontSize: 13, color: C.inkSoft, marginBottom: 10 }}>You type</div>

        <div className="rounded-xl px-4 py-3 mb-4" style={{ background: C.cloud, fontSize: 14, color: C.ink, fontWeight: 500 }}>

          "Send 20 dollars worth of SOL to my sister's Access Bank account"

        </div>

        <div style={{ fontSize: 13, color: C.inkSoft, marginBottom: 10 }}>SwiftSend AI understands</div>

        <div className="flex flex-wrap gap-2">

          <Tag>amount: $20</Tag><Tag>asset: SOL</Tag><Tag>bank: Access Bank</Tag><Tag>action: swap + payout</Tag>

        </div>

      </Card>

    </div>

  );

}



function SlideHow({ i, total }) {

  const steps = [

    { t: "Type a command", d: "\"Send 500 USDC to John's GTBank\" — plain language. No fields, no complexity, just natural conversation." },

    { t: "Parse intent", d: "LLM agent extracts amount, asset, recipient bank, and account details. Validates and prepares for next step." },

    { t: "Swap on Solana", d: "Jupiter DEX aggregator routes the swap (SOL → USDC, etc.) at best available rate. Sub-second finality." },

    { t: "NGN payout", d: "Converts to NGN at live rates and routes to recipient bank. Simulated for this build; real integration coming.", sim: true },

  ];

  return (

    <div className="w-full">

      <Eyebrow index={i} total={total} label="How It Works" />

      <div className="max-w-xl mb-10"><H>Four steps. One sentence.</H></div>

      <div className="grid md:grid-cols-4 gap-4">

        {steps.map((s, k) => (

          <div key={k} className="relative stagger-item" style={{ "--d": `${140 + k * 90}ms` }}>

            <div className="w-9 h-9 rounded-full flex items-center justify-center mb-4 font-semibold" style={{ background: C.stepBg, color: C.primaryDeep, fontSize: 14 }}>

              {k + 1}

            </div>

            <div style={{ fontWeight: 600, fontSize: 15, color: C.ink, marginBottom: 6 }}>{s.t}</div>

            <Body size={13.5}>{s.d}</Body>

            {s.sim && <div className="mt-3"><Tag tone="muted">Simulated for this build</Tag></div>}

            {k < steps.length - 1 && (

              <div className="hidden md:block absolute top-4 -right-3" style={{ color: C.hairline }}>

                <ArrowRight size={16} />

              </div>

            )}

          </div>

        ))}

      </div>

    </div>

  );

}



function SlideStack({ i, total }) {

  const items = [

    { icon: Network, t: "Solana", d: "Settlement blockchain. Sub-second finality, ~$0.00001 fees, highest throughput for real-time transactions." },

    { icon: ArrowRightLeft, t: "Jupiter", d: "Solana's DEX aggregator. Finds best SOL ↔ USDC rates across all pools in milliseconds." },

    { icon: Sparkles, t: "Poof.new", d: "AI-powered full-stack builder. This entire prototype was vibecoded in ~8 hours at Hack4FUTO." },

    { icon: MessageSquare, t: "LLM Intent Parser", d: "Anthropic Claude API parses natural language into structured actions, validates intent, routes decisions." },

  ];

  return (

    <div className="w-full">

      <Eyebrow index={i} total={total} label="Tech Stack" />

      <div className="max-w-xl mb-10"><H>Built fast, on real rails.</H></div>

      <div className="grid md:grid-cols-4 gap-4">

        {items.map((it, k) => (

          <Card key={k} delay={k}>

            <div className="w-9 h-9 rounded-full flex items-center justify-center mb-4" style={{ background: C.tagBg }}>

              <it.icon size={16} color={C.primary} />

            </div>

            <div style={{ fontWeight: 600, fontSize: 15, color: C.ink, marginBottom: 6 }}>{it.t}</div>

            <Body size={13.5}>{it.d}</Body>

          </Card>

        ))}

      </div>

    </div>

  );

}



function SlideWhy({ i, total }) {

  const items = [

    { icon: Gauge, t: "Fast", d: "Sub-second finality. Confirmations feel instant, not eventual." },

    { icon: Coins, t: "Cheap", d: "Fractions of a cent per swap keep small remittances viable." },

    { icon: Network, t: "Composable", d: "Plugs straight into Jupiter and any Solana-compatible wallet." },

  ];

  return (

    <div className="w-full">

      <Eyebrow index={i} total={total} label="Why Solana" />

      <div className="max-w-2xl mb-10"><H>Fast, cheap, composable — exactly what a chat-speed agent needs.</H></div>

      <div className="grid md:grid-cols-3 gap-4">

        {items.map((it, k) => (

          <Card key={k} delay={k} style={{ background: C.canvas, border: `1px solid ${C.hairline}` }}>

            <it.icon size={20} color={C.primary} className="mb-4" />

            <div style={{ fontWeight: 600, fontSize: 15, color: C.ink, marginBottom: 6 }}>{it.t}</div>

            <Body size={13.5}>{it.d}</Body>

          </Card>

        ))}

      </div>

    </div>

  );

}



function SlideStatus({ i, total }) {

  const live = ["Natural-language chat interface", "SOL → USDC swap via Jupiter", "Wallet balance detection"];

  const progress = ["NGN bank payout — simulated leg for this demo", "Live exchange-rate lock before confirm", "Direct Breet-style bank rail integration"];

  return (

    <div className="w-full">

      <Eyebrow index={i} total={total} label="Current Status" />

      <div className="max-w-xl mb-10"><H>What's actually working right now.</H></div>

      <div className="grid md:grid-cols-2 gap-6">

        <Card style={{ background: C.canvas, border: `1px solid ${C.hairline}` }}>

          <div style={{ fontSize: 13, fontWeight: 600, color: C.primaryDeep, marginBottom: 14 }}>Live in this build</div>

          <div className="flex flex-col gap-3">

            {live.map((t, k) => (

              <div key={k} className="flex items-start gap-2.5">

                <CheckCircle2 size={16} color={C.primaryBright} className="mt-0.5 shrink-0" />

                <Body size={14} muted={false}>{t}</Body>

              </div>

            ))}

          </div>

        </Card>

        <Card delay={1} style={{ background: C.paper }}>

          <div style={{ fontSize: 13, fontWeight: 600, color: C.inkSoft, marginBottom: 14 }}>In progress / simulated</div>

          <div className="flex flex-col gap-3">

            {progress.map((t, k) => (

              <div key={k} className="flex items-start gap-2.5">

                <Circle size={16} color={C.inkSoft} className="mt-0.5 shrink-0" />

                <Body size={14}>{t}</Body>

              </div>

            ))}

          </div>

        </Card>

      </div>

    </div>

  );

}



function SlideVision({ i, total }) {

  const pillars = [

    { label: "Speed", detail: "Sub-second settlement, not T+1 or T+3" },

    { label: "Simplicity", detail: "Chat, not forms — that's it" },

    { label: "Access", detail: "Available in any wallet, across all borders" },

  ];

  return (

    <div className="w-full">

      <Eyebrow index={i} total={total} label="Our Vision" />

      <H size="xl">Money should move as fast as a message.</H>

      <div className="mt-6 mb-10 stagger-item" style={{ "--d": "180ms" }}><Body size={17}>

        We believe sending value across a border should feel like sending a text — not filling out a form. SwiftSend AI is a first step toward a world where crypto is seamlessly spendable, built from Nigeria, for the world.

      </Body></div>

      <div className="grid md:grid-cols-3 gap-4">

        {pillars.map((p, k) => (

          <div key={k} className="rounded-lg px-4 py-3 stagger-item" style={{ background: C.paper, border: `1px solid ${C.hairline}`, "--d": `${240 + k * 60}ms` }}>

            <div style={{ fontSize: 13, fontWeight: 600, color: C.primary, marginBottom: 4 }}>{p.label}</div>

            <div style={{ fontSize: 12, color: C.inkSoft }}>{p.detail}</div>

          </div>

        ))}

      </div>

    </div>

  );

}



function SlideTeam({ i, total }) {

  return (

    <div className="w-full max-w-xl">

      <Eyebrow index={i} total={total} label="Thank You" />

      <H size="xl">Built live, in one sprint.</H>

      <div className="mt-6 flex flex-col gap-3">

        <div className="stagger-item" style={{ "--d": "150ms" }}><Body size={16}>SwiftSend AI — Team WrightDevs · Vibecoder #11</Body></div>

        <div className="flex flex-wrap gap-3 mt-2 stagger-item" style={{ "--d": "220ms" }}>

          <Tag><AtSign size={12} /> i_am_wright</Tag>

          <Tag tone="muted"><Sparkles size={12} /> Built with Poof.new</Tag>

          <Tag tone="muted"><Rocket size={12} /> Hack4FUTO Vibecoding</Tag>

        </div>

      </div>

    </div>

  );

}



const SLIDES = [SlideHero, SlideProblem, SlideWhoFor, SlideSolution, SlideHow, SlideStack, SlideWhy, SlideStatus, SlideVision, SlideTeam];



/* ---------------------------------------------------------------

   App shell

--------------------------------------------------------------- */

export default function App() {

  const [idx, setIdx] = useState(0);

  const total = SLIDES.length;



  const go = useCallback((dir) => {

    setIdx((cur) => Math.min(Math.max(cur + dir, 0), total - 1));

  }, [total]);



  useEffect(() => {

    const onKey = (e) => {

      if (e.key === "ArrowRight") go(1);

      if (e.key === "ArrowLeft") go(-1);

    };

    window.addEventListener("keydown", onKey);

    return () => window.removeEventListener("keydown", onKey);

  }, [go]);



  const Slide = SLIDES[idx];



  return (

    <div className="w-full h-screen overflow-hidden relative" style={{ background: C.canvas }}>

      <style>{`

        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');

        * { font-family: 'DM Sans', system-ui, sans-serif; }

        @keyframes fadeSlideIn { from { opacity: 0; transform: translateY(16px) scale(.99); } to { opacity: 1; transform: translateY(0) scale(1); } }

        @keyframes itemIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }

        @keyframes typingBounce { 0%,60%,100% { transform: translateY(0); opacity: .4; } 30% { transform: translateY(-3px); opacity: 1; } }

        @keyframes bubbleIn { from { opacity: 0; transform: translateY(6px) scale(.97); } to { opacity: 1; transform: translateY(0) scale(1); } }

        @keyframes pulseDot { 0%,100% { opacity: 1; transform: scale(1); } 50% { opacity: .5; transform: scale(1.3); } }

        @keyframes floatPhone { 0%,100% { transform: translateY(0) rotate(-0.4deg); } 50% { transform: translateY(-14px) rotate(0.4deg); } }

        @keyframes blobDriftA { 0%,100% { transform: translate(0,0) scale(1); border-radius: 50%; } 33% { transform: translate(-30px,26px) scale(1.08); border-radius: 46% 54% 58% 42%; } 66% { transform: translate(18px,-16px) scale(0.96); border-radius: 54% 46% 42% 58%; } }

        @keyframes blobDriftB { 0%,100% { transform: translate(0,0) scale(1); border-radius: 50%; } 50% { transform: translate(26px,-22px) scale(1.1); border-radius: 44% 56% 60% 40%; } }

        @keyframes blobDriftC { 0%,100% { transform: translate(0,0) scale(1); opacity: .8; } 50% { transform: translate(-16px,14px) scale(1.15); opacity: 1; } }

        @keyframes spinSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        @keyframes spinSlowReverse { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }

        .float-phone { animation: floatPhone 6.5s ease-in-out infinite; }

        .blob-a { animation: blobDriftA 14s ease-in-out infinite; }

        .blob-b { animation: blobDriftB 17s ease-in-out infinite; }

        .blob-c { animation: blobDriftC 10s ease-in-out infinite; }

        .ring-a { animation: spinSlow 40s linear infinite; }

        .ring-b { animation: spinSlowReverse 55s linear infinite; }

        .ring-c { animation: spinSlow 32s linear infinite; }

        .chat-bubble-in { animation: bubbleIn .28s ease-out both; }

        .typing-dot { animation: typingBounce 1.1s ease-in-out infinite; }

        .pulse-dot { animation: pulseDot 1.6s ease-in-out infinite; }

        .slide-fade { animation: fadeSlideIn .55s cubic-bezier(0.4,0,0.2,1) both; }

        .stagger-item { animation: itemIn .5s cubic-bezier(0.4,0,0.2,1) both; animation-delay: var(--d, 0ms); }

        .hover-card { transition: transform .25s cubic-bezier(0.4,0,0.2,1), box-shadow .25s; cursor: default; }

        .hover-card:hover { transform: translateY(-5px); box-shadow: 0 28px 40px -12px rgba(21,132,95,0.16); }

        .btn-hover { transition: transform .18s cubic-bezier(0.4,0,0.2,1), box-shadow .18s; }

        .btn-hover:hover { transform: translateY(-2px); box-shadow: 0 16px 24px -6px rgba(21,132,95,0.32); }

      `}</style>



      {/* ambient abstract background */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <AbstractAmbient />

      </div>



      {/* progress bar */}

      <div className="absolute top-0 left-0 h-[3px] z-30" style={{ width: `${((idx + 1) / total) * 100}%`, background: C.primary, transition: "width .4s ease" }} />



      {/* content */}

      <div className="relative z-10 h-full flex items-center justify-center px-6 md:px-16">

        <div key={idx} className="slide-fade w-full max-w-5xl">

          <Slide i={idx} total={total} />

        </div>

      </div>



      {/* footer nav */}

      <div className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-between px-6 md:px-10 py-5" style={{ borderTop: `1px solid ${C.hairline}`, background: "rgba(255,255,255,0.7)", backdropFilter: "blur(6px)" }}>

        <div style={{ fontSize: 12, color: C.inkSoft, fontWeight: 500 }}>SwiftSend AI · H4F Vibecoding</div>

        <div className="flex items-center gap-4">

          <button

            onClick={() => go(-1)}

            disabled={idx === 0}

            className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer disabled:cursor-not-allowed disabled:opacity-30 btn-hover"

            style={{ border: `1px solid ${C.hairline}`, color: C.ink }}

          >

            <ChevronLeft size={16} />

          </button>

          <span style={{ fontSize: 12, color: C.inkSoft, minWidth: 40, textAlign: "center" }}>

            {String(idx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}

          </span>

          <button

            onClick={() => go(1)}

            disabled={idx === total - 1}

            className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer disabled:cursor-not-allowed disabled:opacity-30 btn-hover"

            style={{ background: C.primary, color: C.onPrimary }}

          >

            <ChevronRight size={16} />

          </button>

        </div>

      </div>

    </div>

  );

}
