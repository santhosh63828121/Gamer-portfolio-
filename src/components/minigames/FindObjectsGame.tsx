import { useState } from "react";
import { motion } from "framer-motion";

const objects = [
  { id: 1, icon: "💎", label: "Diamond Relic", x: 22, y: 30 },
  { id: 2, icon: "📦", label: "Artifact Box", x: 65, y: 55 },
  { id: 3, icon: "🗝️", label: "Ancient Key", x: 40, y: 75 },
  { id: 4, icon: "📜", label: "Code Scroll", x: 80, y: 25 },
  { id: 5, icon: "⚡", label: "Power Gem", x: 15, y: 65 },
];

interface FindObjectsGameProps {
  onComplete: () => void;
}

export default function FindObjectsGame({ onComplete }: FindObjectsGameProps) {
  const [found, setFound] = useState<number[]>([]);
  const [hint, setHint] = useState<string | null>(null);

  const handleFind = (id: number, label: string) => {
    if (found.includes(id)) return;
    const next = [...found, id];
    setFound(next);
    setHint(`Found: ${label}!`);
    setTimeout(() => setHint(null), 1000);
    if (next.length === objects.length) {
      setTimeout(onComplete, 800);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <span className="font-data text-mana text-[10px]">FIND HIDDEN RELICS</span>
        <span className="font-data text-muted-foreground text-[10px]">{found.length}/{objects.length}</span>
      </div>

      <div className="relative w-full h-48 border border-muted-foreground/20 bg-muted/30 overflow-hidden">
        {/* Decorative grid */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, hsl(var(--mana)/0.3) 0 1px, transparent 1px 20px), repeating-linear-gradient(90deg, hsl(var(--mana)/0.3) 0 1px, transparent 1px 20px)",
          }}
        />

        {objects.map((obj) => (
          <motion.button
            key={obj.id}
            className={`absolute transition-all ${
              found.includes(obj.id)
                ? "opacity-100 scale-110"
                : "opacity-30 hover:opacity-60 cursor-pointer"
            }`}
            style={{ left: `${obj.x}%`, top: `${obj.y}%`, transform: "translate(-50%, -50%)" }}
            onClick={() => handleFind(obj.id, obj.label)}
            whileHover={{ scale: found.includes(obj.id) ? 1.1 : 1.3 }}
            whileTap={{ scale: 0.9 }}
            animate={found.includes(obj.id) ? { scale: [1, 1.3, 1] } : {}}
          >
            <span className="text-2xl">{obj.icon}</span>
          </motion.button>
        ))}
      </div>

      {hint && (
        <motion.p
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center font-data text-gold text-xs"
        >
          ✦ {hint}
        </motion.p>
      )}

      <p className="text-[9px] font-data text-muted-foreground text-center">
        Click on the hidden relics to reveal them
      </p>
    </div>
  );
}
