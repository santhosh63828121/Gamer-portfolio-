import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Dungeon } from "@/data/dungeons";

interface DungeonMarkerProps {
  dungeon: Dungeon;
  unlocked: boolean;
  completed: boolean;
  onClick: () => void;
}

function SparkleParticles() {
  return (
    <>
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            background: "hsl(var(--gold))",
            boxShadow: "0 0 4px hsl(var(--gold) / 0.8)",
            left: "50%",
            top: "50%",
          }}
          animate={{
            x: [0, (Math.random() - 0.5) * 40],
            y: [0, (Math.random() - 0.5) * 40],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 2,
            delay: i * 0.3,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
    </>
  );
}

export default function DungeonMarker({ dungeon, unlocked, completed, onClick }: DungeonMarkerProps) {
  const [hovered, setHovered] = useState(false);
  const [shaking, setShaking] = useState(false);

  const handleClick = () => {
    if (!unlocked) {
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
    }
    onClick();
  };

  return (
    <motion.div
      className={`absolute z-10 ${unlocked ? "cursor-pointer" : "cursor-not-allowed"}`}
      style={{ left: `${dungeon.x}%`, top: `${dungeon.y}%`, transform: "translate(-50%, -50%)" }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={handleClick}
      whileHover={unlocked ? { scale: 1.15 } : {}}
      whileTap={unlocked ? { scale: 0.95 } : {}}
      animate={shaking ? { x: [0, -4, 4, -3, 3, -1, 0] } : { x: 0 }}
      transition={shaking ? { duration: 0.4 } : {}}
    >
      {/* Glow ring */}
      <motion.div
        className="absolute rounded-full"
        style={{
          background: completed
            ? "radial-gradient(circle, hsl(45 93% 56% / 0.4), transparent 70%)"
            : unlocked
            ? "radial-gradient(circle, hsl(187 85% 53% / 0.3), transparent 70%)"
            : "radial-gradient(circle, hsl(0 0% 40% / 0.1), transparent 70%)",
          width: "90px",
          height: "90px",
          left: "-19px",
          top: "-19px",
        }}
        animate={{
          opacity: hovered ? 1 : unlocked ? 0.6 : 0.15,
          scale: hovered && unlocked ? 1.4 : completed ? [1, 1.15, 1] : 1,
        }}
        transition={completed ? { duration: 3, repeat: Infinity, ease: "easeInOut" } : { duration: 0.3 }}
      />

      {/* Completed sparkles */}
      {completed && <SparkleParticles />}

      {/* Lock glow for locked dungeons */}
      {!unlocked && (
        <motion.div
          className="absolute rounded-full"
          style={{
            width: "60px",
            height: "60px",
            left: "-4px",
            top: "-4px",
            background: "radial-gradient(circle, hsl(0 84% 60% / 0.15), transparent 60%)",
          }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}

      {/* Dungeon icon */}
      <motion.div
        className={`relative flex items-center justify-center w-12 h-12 text-2xl ${
          completed ? "border-gold" : unlocked ? "border-mana" : "border-muted-foreground/30"
        }`}
        style={{
          background: unlocked ? "hsl(220 30% 8% / 0.9)" : "hsl(220 30% 5% / 0.95)",
          border: `2px solid`,
          clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          filter: unlocked ? "none" : "grayscale(0.8) brightness(0.4)",
        }}
        animate={
          unlocked && !completed
            ? { y: [0, -5, 0] }
            : completed
            ? { y: [0, -3, 0], rotate: [0, 2, -2, 0] }
            : {}
        }
        transition={
          unlocked
            ? { duration: 3, repeat: Infinity, ease: "easeInOut", delay: dungeon.id * 0.4 }
            : {}
        }
      >
        <span className={unlocked ? "" : "opacity-30"}>{unlocked ? dungeon.icon : "🔒"}</span>

        {/* Completed badge */}
        {completed && (
          <motion.div
            className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-[8px] font-bold rounded-full"
            style={{
              background: "hsl(var(--gold))",
              color: "hsl(var(--background))",
              boxShadow: "0 0 8px hsl(var(--gold) / 0.6)",
            }}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", delay: 0.2, damping: 10 }}
          >
            ✓
          </motion.div>
        )}
      </motion.div>

      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="rpg-tooltip absolute left-1/2 -translate-x-1/2 bottom-full mb-3 px-3 py-2 whitespace-nowrap pointer-events-none"
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.9 }}
            transition={{ duration: 0.2, type: "spring", damping: 20 }}
          >
            <p
              className={`font-display text-[10px] tracking-wider ${
                completed ? "text-gold" : unlocked ? "text-mana" : "text-muted-foreground"
              }`}
            >
              [LVL {dungeon.level}] {dungeon.name}
            </p>
            <p className="text-muted-foreground text-[9px] mt-0.5">{dungeon.subtitle}</p>
            {completed && <p className="text-gold text-[9px] mt-1">✦ CLEARED</p>}
            {!unlocked && <p className="text-destructive text-[9px] mt-1">🔒 LOCKED</p>}
            {unlocked && !completed && (
              <p className="text-mana text-[9px] mt-1">⚔️ CHALLENGE AWAITS</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
