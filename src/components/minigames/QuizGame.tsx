import { useState } from "react";
import { motion } from "framer-motion";

const questions = [
  {
    q: "What does a game developer primarily do?",
    options: ["Cook meals", "Create interactive digital experiences", "Build furniture", "Drive trucks"],
    answer: 1,
  },
  {
    q: "Which engine is widely used for game development?",
    options: ["Photoshop", "Unity", "Excel", "WordPress"],
    answer: 1,
  },
  {
    q: "What language is commonly used in Unity?",
    options: ["HTML", "Python", "C#", "SQL"],
    answer: 2,
  },
];

interface QuizGameProps {
  onComplete: () => void;
}

export default function QuizGame({ onComplete }: QuizGameProps) {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    const correct = idx === questions[current].answer;
    if (correct) setScore((s) => s + 1);

    setTimeout(() => {
      if (current + 1 < questions.length) {
        setCurrent((c) => c + 1);
        setSelected(null);
      } else {
        setShowResult(true);
      }
    }, 800);
  };

  if (showResult) {
    const passed = score >= 2;
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-4">
        <p className="text-4xl">{passed ? "✅" : "❌"}</p>
        <p className="font-display text-foreground text-sm">
          {passed ? "QUEST COMPLETE!" : "TRY AGAIN, ADVENTURER"}
        </p>
        <p className="font-data text-muted-foreground text-xs">
          Score: {score}/{questions.length}
        </p>
        {passed ? (
          <button
            onClick={onComplete}
            className="font-display text-xs px-4 py-2 border border-gold/60 text-gold bg-gold/10 hover:bg-gold/20 transition-all"
          >
            CLAIM REWARDS →
          </button>
        ) : (
          <button
            onClick={() => { setCurrent(0); setScore(0); setSelected(null); setShowResult(false); }}
            className="font-display text-xs px-4 py-2 border border-mana/60 text-mana bg-mana/10 hover:bg-mana/20 transition-all"
          >
            RETRY
          </button>
        )}
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="font-data text-mana text-[10px]">QUESTION {current + 1}/{questions.length}</span>
        <div className="flex-1 h-1 bg-muted overflow-hidden">
          <motion.div
            className="h-full bg-mana"
            animate={{ width: `${((current + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>
      <motion.p
        key={current}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="font-display text-foreground text-[11px] tracking-wider"
      >
        {questions[current].q}
      </motion.p>
      <div className="grid grid-cols-1 gap-2">
        {questions[current].options.map((opt, i) => {
          let style = "border-muted-foreground/30 text-foreground hover:border-mana/60 hover:bg-mana/10";
          if (selected !== null) {
            if (i === questions[current].answer) style = "border-green-500/60 bg-green-500/10 text-green-400";
            else if (i === selected) style = "border-destructive/60 bg-destructive/10 text-destructive";
          }
          return (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => handleAnswer(i)}
              className={`text-left p-3 border font-data text-xs transition-all ${style}`}
              disabled={selected !== null}
            >
              <span className="text-muted-foreground mr-2">{String.fromCharCode(65 + i)}.</span>
              {opt}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
