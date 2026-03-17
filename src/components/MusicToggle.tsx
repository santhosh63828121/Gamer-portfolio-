import { useState } from "react";

export default function MusicToggle() {
  const [muted, setMuted] = useState(true);

  return (
    <button
      onClick={() => setMuted(!muted)}
      className="fixed top-4 right-4 z-30 w-10 h-10 flex items-center justify-center border border-mana/40 bg-card/80 backdrop-blur-sm text-mana hover:border-mana/70 hover:shadow-[0_0_12px_hsl(var(--mana)/0.3)] transition-all text-sm"
      title={muted ? "Unmute" : "Mute"}
    >
      {muted ? "🔇" : "🔊"}
    </button>
  );
}
