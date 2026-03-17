import { motion, AnimatePresence } from "framer-motion";
import type { Dungeon } from "@/data/dungeons";
import AboutDungeon from "./dungeons/AboutDungeon";
import SkillsDungeon from "./dungeons/SkillsDungeon";
import ProjectsDungeon from "./dungeons/ProjectsDungeon";
import ExperienceDungeon from "./dungeons/ExperienceDungeon";
import AchievementsDungeon from "./dungeons/AchievementsDungeon";
import ContactDungeon from "./dungeons/ContactDungeon";
import QuizGame from "./minigames/QuizGame";
import MemoryGame from "./minigames/MemoryGame";
import FindObjectsGame from "./minigames/FindObjectsGame";
import TimelineGame from "./minigames/TimelineGame";
import CoinCollectGame from "./minigames/CoinCollectGame";
import UnlockMessageGame from "./minigames/UnlockMessageGame";

interface DungeonModalProps {
  dungeon: Dungeon | null;
  showMiniGame: boolean;
  showContent: boolean;
  onClose: () => void;
  onMiniGameComplete: () => void;
}

const modalVariants = {
  hidden: { scale: 0.8, opacity: 0, y: 20 },
  visible: {
    scale: 1, opacity: 1, y: 0,
    transition: { type: "spring" as const, damping: 25, stiffness: 300 },
  },
  exit: { scale: 0.9, opacity: 0, transition: { duration: 0.2 } },
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const dungeonContent: Record<number, React.FC> = {
  1: AboutDungeon,
  2: SkillsDungeon,
  3: ProjectsDungeon,
  4: ExperienceDungeon,
  5: AchievementsDungeon,
  6: ContactDungeon,
};

const miniGames: Record<number, React.FC<{ onComplete: () => void }>> = {
  1: QuizGame,
  2: MemoryGame,
  3: FindObjectsGame,
  4: TimelineGame,
  5: CoinCollectGame,
  6: UnlockMessageGame,
};

export default function DungeonModal({ dungeon, showMiniGame, showContent, onClose, onMiniGameComplete }: DungeonModalProps) {
  const Content = dungeon && showContent ? dungeonContent[dungeon.id] : null;
  const MiniGame = dungeon && showMiniGame ? miniGames[dungeon.id] : null;
  const isOpen = dungeon && (showMiniGame || showContent);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-40"
            style={{ backdropFilter: "blur(4px)", background: "rgba(0,0,0,0.6)" }}
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className="obsidian-panel w-full max-w-2xl max-h-[85vh] overflow-y-auto p-6 pointer-events-auto"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="gold-border-bottom pb-4 mb-6 flex items-center justify-between">
                <div>
                  <p className="text-mana text-[10px] font-data tracking-wider mb-1">
                    {showMiniGame ? "⚔️ CHALLENGE" : "📜 DUNGEON LORE"} — [LVL {dungeon!.level}] DUNGEON {dungeon!.id}
                  </p>
                  <h2 className="font-display text-gold text-lg tracking-wider">{dungeon!.name}</h2>
                  <p className="text-muted-foreground text-xs mt-1">
                    {showMiniGame ? "Complete the challenge to unlock this dungeon's secrets" : dungeon!.subtitle}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="text-muted-foreground hover:text-foreground transition-colors font-display text-xs border border-muted-foreground/30 px-3 py-1 hover:border-mana/50"
                >
                  [ESC]
                </button>
              </div>

              {/* Mini Game */}
              {MiniGame && <MiniGame onComplete={onMiniGameComplete} />}

              {/* Content */}
              {Content && <Content />}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
