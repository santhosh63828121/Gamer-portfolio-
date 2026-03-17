import { useState, useCallback } from "react";
import { motion } from "framer-motion";

const events = [
  { id: 1, label: "Learned to code", year: 2018 },
  { id: 2, label: "First game jam", year: 2019 },
  { id: 3, label: "Unity certification", year: 2021 },
  { id: 4, label: "Published first game", year: 2022 },
  { id: 5, label: "Led a dev team", year: 2023 },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

interface TimelineGameProps {
  onComplete: () => void;
}

export default function TimelineGame({ onComplete }: TimelineGameProps) {
  const [items, setItems] = useState(() => shuffle(events));
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [error, setError] = useState(false);
  const [solved, setSolved] = useState(false);

  const isCorrect = items.every((item, i) => i === 0 || items[i - 1].year <= item.year);

  const handleSwap = useCallback((idx: number) => {
    if (solved) return;
    if (selectedIdx === null) {
      setSelectedIdx(idx);
      setError(false);
    } else {
      const next = [...items];
      [next[selectedIdx], next[idx]] = [next[idx], next[selectedIdx]];
      setItems(next);
      setSelectedIdx(null);

      const correct = next.every((item, i) => i === 0 || next[i - 1].year <= item.year);
      if (correct) {
        setSolved(true);
        setTimeout(onComplete, 800);
      }
    }
  }, [selectedIdx, items, solved, onComplete]);

  const handleCheck = () => {
    if (isCorrect) {
      setSolved(true);
      setTimeout(onComplete, 500);
    } else {
      setError(true);
    }
  };

  return (
    <div className="space-y-4">
      <span className="font-data text-mana text-[10px]">ARRANGE THE TIMELINE</span>
      <p className="text-[9px] font-data text-muted-foreground">
        Tap two events to swap them into chronological order
      </p>

      <div className="space-y-2">
        {items.map((item, i) => (
          <motion.button
            key={item.id}
            layout
            onClick={() => handleSwap(i)}
            className={`w-full text-left p-3 border font-data text-xs transition-all flex items-center gap-3 ${
              solved
                ? "border-gold/60 bg-gold/10 text-gold"
                : selectedIdx === i
                ? "border-mana/60 bg-mana/10 text-mana"
                : "border-muted-foreground/20 text-foreground hover:border-mana/40"
            }`}
            whileTap={{ scale: 0.97 }}
          >
            <span className="text-muted-foreground w-4">{i + 1}.</span>
            <span className="flex-1">{item.label}</span>
            {solved && <span className="text-gold text-[10px]">{item.year}</span>}
          </motion.button>
        ))}
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-destructive text-xs font-data"
        >
          ✗ Not quite right — keep swapping!
        </motion.p>
      )}

      {!solved && (
        <button
          onClick={handleCheck}
          className="w-full font-display text-xs px-4 py-2 border border-mana/60 text-mana bg-mana/10 hover:bg-mana/20 transition-all"
        >
          CHECK ORDER
        </button>
      )}
    </div>
  );
}
