import { motion, AnimatePresence } from "framer-motion";

interface FloatingXPProps {
  show: boolean;
  xp: number;
  onDone: () => void;
}

export default function FloatingXP({ show, xp, onDone }: FloatingXPProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed top-20 left-1/2 -translate-x-1/2 z-[80] pointer-events-none"
          initial={{ opacity: 0, y: 0, scale: 0.5 }}
          animate={{ opacity: 1, y: -40, scale: 1.2 }}
          exit={{ opacity: 0, y: -80, scale: 0.8 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          onAnimationComplete={() => onDone()}
        >
          <span
            className="font-display text-2xl tracking-wider"
            style={{
              color: "hsl(var(--gold))",
              textShadow: "0 0 20px hsl(var(--gold) / 0.8), 0 0 40px hsl(var(--gold) / 0.4)",
            }}
          >
            +{xp} XP
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
