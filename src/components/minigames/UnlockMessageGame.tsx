import { useState } from "react";
import { motion } from "framer-motion";

const CODE_WORD = "HELLO";

interface UnlockMessageGameProps {
  onComplete: () => void;
}

export default function UnlockMessageGame({ onComplete }: UnlockMessageGameProps) {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [solved, setSolved] = useState(false);

  const handleSubmit = () => {
    if (input.toUpperCase().trim() === CODE_WORD) {
      setSolved(true);
      setTimeout(onComplete, 800);
    } else {
      setError(true);
      setTimeout(() => setError(false), 1500);
    }
  };

  // Show letter hints
  const hints = CODE_WORD.split("").map((letter, i) => {
    const entered = input.toUpperCase()[i];
    return { letter, entered, correct: entered === letter };
  });

  return (
    <div className="space-y-4">
      <span className="font-data text-mana text-[10px]">UNLOCK THE GUILD DOOR</span>
      <p className="text-[9px] font-data text-muted-foreground">
        Type the secret word to open the messenger guild
      </p>

      {/* Hint display */}
      <div className="flex justify-center gap-2">
        {hints.map((h, i) => (
          <motion.div
            key={i}
            className={`w-10 h-12 flex items-center justify-center border font-display text-lg ${
              solved
                ? "border-gold/60 bg-gold/10 text-gold"
                : h.entered
                ? h.correct
                  ? "border-green-500/60 bg-green-500/10 text-green-400"
                  : "border-destructive/60 bg-destructive/10 text-destructive"
                : "border-muted-foreground/30 text-muted-foreground"
            }`}
            animate={error && h.entered && !h.correct ? { x: [0, -5, 5, -5, 0] } : {}}
          >
            {h.entered || "_"}
          </motion.div>
        ))}
      </div>

      <p className="text-center text-[9px] font-data text-muted-foreground">
        HINT: A common greeting 👋
      </p>

      {!solved && (
        <div className="flex gap-2">
          <input
            type="text"
            maxLength={5}
            value={input}
            onChange={(e) => { setInput(e.target.value); setError(false); }}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            className="flex-1 bg-muted/50 border border-muted-foreground/30 text-foreground font-data text-xs px-3 py-2 focus:outline-none focus:border-mana/60 uppercase tracking-widest"
            placeholder="TYPE HERE..."
          />
          <button
            onClick={handleSubmit}
            className="font-display text-xs px-4 py-2 border border-mana/60 text-mana bg-mana/10 hover:bg-mana/20 transition-all"
          >
            ENTER
          </button>
        </div>
      )}

      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-destructive text-xs font-data"
        >
          ✗ Incorrect — try again!
        </motion.p>
      )}

      {solved && (
        <motion.p
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center text-gold font-display text-xs"
        >
          ✦ GUILD DOOR UNLOCKED ✦
        </motion.p>
      )}
    </div>
  );
}
