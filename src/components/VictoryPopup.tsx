import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface VictoryPopupProps {
  show: boolean;
  dungeonName: string;
  xpGained: number;
  badgeName: string;
  onContinue: () => void;
}

export default function VictoryPopup({ show, dungeonName, xpGained, badgeName, onContinue }: VictoryPopupProps) {
  const [particles, setParticles] = useState<{ x: number; y: number; delay: number }[]>([]);

  useEffect(() => {
    if (show) {
      setParticles(
        Array.from({ length: 20 }, () => ({
          x: Math.random() * 400 - 200,
          y: Math.random() * -300 - 50,
          delay: Math.random() * 0.5,
        }))
      );
    }
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            className="fixed inset-0 z-[60]"
            style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(6px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="obsidian-panel p-8 text-center pointer-events-auto relative overflow-visible"
              initial={{ scale: 0.3, opacity: 0, rotateX: 45 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", damping: 15, stiffness: 200 }}
            >
              {/* Particles */}
              {particles.map((p, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-gold"
                  style={{
                    left: "50%",
                    top: "50%",
                    clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                  }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{ x: p.x, y: p.y, opacity: 0, scale: 0 }}
                  transition={{ duration: 1.5, delay: p.delay, ease: "easeOut" }}
                />
              ))}

              {/* Victory star */}
              <motion.div
                className="text-6xl mb-4"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", delay: 0.2, damping: 10 }}
              >
                ⚔️
              </motion.div>

              <motion.h2
                className="font-display text-gold text-xl tracking-wider mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                DUNGEON CLEARED!
              </motion.h2>

              <motion.p
                className="text-muted-foreground text-xs font-data mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {dungeonName}
              </motion.p>

              {/* Rewards */}
              <motion.div
                className="space-y-3 mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-center justify-center gap-3 p-2 border border-gold/30 bg-gold/5">
                  <span className="text-gold text-lg">✦</span>
                  <span className="font-data text-gold text-sm">+{xpGained} XP</span>
                </div>
                <div className="flex items-center justify-center gap-3 p-2 border border-mana/30 bg-mana/5">
                  <span className="text-mana text-lg">🏅</span>
                  <span className="font-data text-mana text-[11px]">BADGE: {badgeName}</span>
                </div>
              </motion.div>

              <motion.button
                className="font-display text-xs tracking-wider px-6 py-2 border border-gold/60 text-gold bg-gold/10 hover:bg-gold/20 transition-all hover:shadow-[0_0_15px_hsl(var(--gold)/0.3)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                onClick={onContinue}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                VIEW CONTENT →
              </motion.button>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
