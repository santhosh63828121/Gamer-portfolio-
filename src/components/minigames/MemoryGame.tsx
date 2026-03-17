import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const pairs = [
  { id: "unity", label: "Unity", icon: "🎮" },
  { id: "csharp", label: "C#", icon: "💻" },
  { id: "unreal", label: "Unreal", icon: "🔥" },
  { id: "cpp", label: "C++", icon: "⚙️" },
  { id: "design", label: "Design", icon: "🎨" },
  { id: "3d", label: "3D Art", icon: "🧊" },
];

interface Card {
  uid: string;
  id: string;
  label: string;
  icon: string;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

interface MemoryGameProps {
  onComplete: () => void;
}

export default function MemoryGame({ onComplete }: MemoryGameProps) {
  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<string[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    const deck = pairs.flatMap((p) => [
      { uid: p.id + "-a", ...p },
      { uid: p.id + "-b", ...p },
    ]);
    setCards(shuffle(deck));
  }, []);

  const handleFlip = (uid: string, id: string) => {
    if (flipped.length >= 2 || flipped.includes(uid) || matched.includes(id)) return;
    const next = [...flipped, uid];
    setFlipped(next);

    if (next.length === 2) {
      setMoves((m) => m + 1);
      const [first] = next;
      const firstCard = cards.find((c) => c.uid === first)!;
      const secondCard = cards.find((c) => c.uid === uid)!;

      if (firstCard.id === secondCard.id) {
        setMatched((m) => [...m, id]);
        setFlipped([]);
        if (matched.length + 1 === pairs.length) {
          setTimeout(onComplete, 600);
        }
      } else {
        setTimeout(() => setFlipped([]), 700);
      }
    }
  };

  const isFlipped = (uid: string, id: string) => flipped.includes(uid) || matched.includes(id);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="font-data text-mana text-[10px]">MATCH THE SKILLS</span>
        <span className="font-data text-muted-foreground text-[10px]">MOVES: {moves}</span>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {cards.map((card) => {
          const revealed = isFlipped(card.uid, card.id);
          return (
            <motion.button
              key={card.uid}
              onClick={() => handleFlip(card.uid, card.id)}
              className={`aspect-square flex items-center justify-center border text-lg transition-all ${
                matched.includes(card.id)
                  ? "border-gold/60 bg-gold/10"
                  : revealed
                  ? "border-mana/60 bg-mana/10"
                  : "border-muted-foreground/20 bg-muted/50 hover:border-mana/40"
              }`}
              whileTap={{ scale: 0.9 }}
            >
              {revealed ? (
                <motion.div
                  initial={{ rotateY: 90 }}
                  animate={{ rotateY: 0 }}
                  className="flex flex-col items-center"
                >
                  <span className="text-xl">{card.icon}</span>
                  <span className="text-[7px] font-data text-muted-foreground mt-0.5">{card.label}</span>
                </motion.div>
              ) : (
                <span className="text-muted-foreground text-sm">?</span>
              )}
            </motion.button>
          );
        })}
      </div>
      <p className="text-[9px] font-data text-muted-foreground text-center">
        {matched.length}/{pairs.length} PAIRS FOUND
      </p>
    </div>
  );
}
