"use client";

import { useState } from 'react';

export default function BrainConsole() {
  const [input, setInput] = useState('');
  const [log, setLog] = useState<string[]>([]);

  const sendToBrain = async () => {
    if (!input.trim()) return;
    setLog((prev) => [`> ${input}`, ...prev]);
    setInput('');
    // In production, call your Linux brain API:
    // const res = await fetch("https://YOUR-LINUX-SERVER/api/brain", { ... });
  };

  return (
    <section className="apex-card col-span-2">
      <h2 className="apex-title">J-A-U-P Brain Console</h2>
      <div className="flex gap-2 mb-2">
        <input
          className="flex-1 bg-black/60 border border-apex-gold px-2 py-1 text-xs"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Send command to brain..."
        />
        <button
          onClick={sendToBrain}
          className="px-3 py-1 text-xs border border-apex-gold hover:bg-apex-gold/10"
        >
          Send
        </button>
      </div>
      <div className="h-32 bg-black/60 border border-apex-gold text-xs overflow-y-auto px-2 py-1">
        {log.length === 0 && <div className="text-apex-red/70">No brain activity yet.</div>}
        {log.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
    </section>
  );
}
