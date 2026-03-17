import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { dungeons } from "@/data/dungeons";
import type { GameProgress } from "@/hooks/useGameProgress";

interface MinimapProps {
  progress: GameProgress;
  isUnlocked: (id: number) => boolean;
  onDungeonClick: (id: number) => void;
}

export default function Minimap({ progress, isUnlocked, onDungeonClick }: MinimapProps) {
  const [open, setOpen] = useState(false);
  const completed = new Set(progress.completedLevels);

  return (
    <div className="fixed bottom-4 right-4 z-30">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="mb-2 w-48 h-28 relative border border-mana/30 bg-card/80 backdrop-blur-sm"
            style={{ mixBlendMode: "screen" }}
          >
            {dungeons.map((d) => (
              <button
                key={d.id}
                className={`absolute w-3 h-3 transition-all ${
                  completed.has(d.id)
                    ? "bg-gold shadow-[0_0_6px_hsl(var(--gold)/0.6)] cursor-pointer"
                    : isUnlocked(d.id)
                    ? "bg-mana/60 shadow-[0_0_4px_hsl(var(--mana)/0.4)] cursor-pointer"
                    : "bg-muted-foreground/20 cursor-not-allowed"
                }`}
                style={{
                  left: `${d.x}%`,
                  top: `${d.y}%`,
                  transform: "translate(-50%, -50%)",
                  clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                }}
                onClick={() => { onDungeonClick(d.id); setOpen(false); }}
                title={`${d.name}${completed.has(d.id) ? " ✓" : !isUnlocked(d.id) ? " 🔒" : ""}`}
              />
            ))}
            <p className="absolute bottom-1 left-2 text-[7px] text-muted-foreground font-data">
              FAST TRAVEL
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 flex items-center justify-center border border-mana/40 bg-card/80 backdrop-blur-sm text-mana hover:border-mana/70 hover:shadow-[0_0_12px_hsl(var(--mana)/0.3)] transition-all font-display text-xs"
      >
        {open ? "✕" : "🗺️"}
      </button>
    </div>
  );
}
