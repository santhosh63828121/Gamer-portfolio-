import { motion, AnimatePresence } from "framer-motion";

interface QuestToastProps {
  show: boolean;
  onClose: () => void;
}

export default function QuestToast({ show, onClose }: QuestToastProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed top-8 left-1/2 z-[60] -translate-x-1/2 obsidian-panel px-8 py-4 text-center"
          initial={{ opacity: 0, y: -30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ type: "spring", damping: 20 }}
        >
          <p className="font-display text-gold text-sm tracking-wider animate-pulse-glow">
            ✦ QUEST COMPLETE ✦
          </p>
          <p className="text-muted-foreground text-[10px] font-data mt-1">
            All dungeons explored. You are a true adventurer.
          </p>
          <button
            onClick={onClose}
            className="text-mana text-[10px] font-data mt-2 hover:underline"
          >
            [DISMISS]
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
