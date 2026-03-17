import { useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import worldMapBg from "@/assets/world-map-bg.jpg";
import { dungeons } from "@/data/dungeons";
import DungeonMarker from "@/components/DungeonMarker";
import MapPaths from "@/components/MapPaths";
import DungeonModal from "@/components/DungeonModal";
import Minimap from "@/components/Minimap";
import MusicToggle from "@/components/MusicToggle";
import QuestToast from "@/components/QuestToast";
import VictoryPopup from "@/components/VictoryPopup";
import PlayerAvatar from "@/components/PlayerAvatar";
import AmbientEffects from "@/components/AmbientEffects";
import FloatingXP from "@/components/FloatingXP";
import ScreenShake, { type ScreenShakeRef } from "@/components/ScreenShake";
import ParallaxMap from "@/components/ParallaxMap";
import { useGameProgress } from "@/hooks/useGameProgress";
import type { Dungeon } from "@/data/dungeons";

export default function Index() {
  const {
    progress,
    isUnlocked,
    isCompleted,
    completeLevel,
    getXpForLevel,
    getBadgeName,
    resetProgress,
  } = useGameProgress();

  const [activeDungeon, setActiveDungeon] = useState<Dungeon | null>(null);
  const [showMiniGame, setShowMiniGame] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showVictory, setShowVictory] = useState(false);
  const [victoryDungeon, setVictoryDungeon] = useState<Dungeon | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const [lockedMsg, setLockedMsg] = useState<string | null>(null);
  const [playerTarget, setPlayerTarget] = useState<number | null>(null);
  const [pendingDungeon, setPendingDungeon] = useState<Dungeon | null>(null);
  const [showFloatingXP, setShowFloatingXP] = useState(false);
  const [floatingXPAmount, setFloatingXPAmount] = useState(0);
  const [shakeTrigger, setShakeTrigger] = useState(0);

  const screenShakeRef = useRef<ScreenShakeRef>(null);

  const openDungeon = useCallback(
    (dungeon: Dungeon) => {
      setActiveDungeon(dungeon);
      if (isCompleted(dungeon.id)) {
        setShowContent(true);
        setShowMiniGame(false);
      } else {
        setShowMiniGame(true);
        setShowContent(false);
      }
    },
    [isCompleted]
  );

  const handleDungeonClick = useCallback(
    (dungeon: Dungeon) => {
      if (!isUnlocked(dungeon.id)) {
        setLockedMsg(`Complete Level ${dungeon.id - 1} to unlock!`);
        setShakeTrigger((p) => p + 1);
        setTimeout(() => setLockedMsg(null), 2000);
        return;
      }
      // Move player to dungeon, then open
      setPendingDungeon(dungeon);
      setPlayerTarget(dungeon.id);
    },
    [isUnlocked]
  );

  const handlePlayerArrived = useCallback(() => {
    setPlayerTarget(null);
    if (pendingDungeon) {
      // Small delay for suspense
      setTimeout(() => openDungeon(pendingDungeon), 300);
      setPendingDungeon(null);
    }
  }, [pendingDungeon, openDungeon]);

  const handleMiniGameComplete = useCallback(() => {
    if (!activeDungeon) return;
    const xp = getXpForLevel(activeDungeon.id);
    completeLevel(activeDungeon.id);
    setShowMiniGame(false);
    setVictoryDungeon(activeDungeon);
    setShowVictory(true);
    setShakeTrigger((p) => p + 1);

    // Show floating XP
    setFloatingXPAmount(xp);
    setShowFloatingXP(true);
  }, [activeDungeon, completeLevel, getXpForLevel]);

  const handleVictoryContinue = useCallback(() => {
    setShowVictory(false);
    setShowContent(true);
  }, []);

  const handleClose = useCallback(() => {
    setActiveDungeon(null);
    setShowMiniGame(false);
    setShowContent(false);
  }, []);

  const handleMinimapClick = useCallback(
    (id: number) => {
      const d = dungeons.find((d) => d.id === id);
      if (d) handleDungeonClick(d);
    },
    [handleDungeonClick]
  );

  const allComplete = progress.completedLevels.length >= 6;
  const xpProgress = Math.min((progress.completedLevels.length / 6) * 100, 100);

  return (
    <ScreenShake ref={screenShakeRef} trigger={shakeTrigger}>
      <div className="relative w-screen h-screen overflow-hidden bg-map">
        {/* Fade-in from black */}
        <motion.div
          className="absolute inset-0 z-20 bg-background pointer-events-none"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.5, delay: 0.3 }}
        />

        {/* Hero header */}
        <motion.div
          className="absolute top-6 left-6 z-20 pointer-events-none"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <h1 className="font-display text-foreground text-lg md:text-2xl tracking-wider">
            A NEW CHALLENGER APPROACHES
          </h1>
          <p className="text-mana text-[10px] md:text-xs font-data mt-1">
            LEVEL 24 GAME DEVELOPER | SHADER MAGIC & C# ALCHEMY
          </p>
          <p className="text-muted-foreground text-[9px] font-data mt-2">
            ◈ COMPLETE MINI-GAMES TO UNLOCK EACH DUNGEON
          </p>
        </motion.div>

        {/* World map with parallax */}
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          onAnimationComplete={() => setMapReady(true)}
        >
          <ParallaxMap>
            <img
              src={worldMapBg}
              alt="Fantasy world map"
              className="w-full h-full object-cover"
              style={{ minWidth: "calc(100% + 40px)", minHeight: "calc(100% + 40px)" }}
              loading="eager"
            />
            <div className="absolute inset-0 bg-background/40" />
          </ParallaxMap>
        </motion.div>

        {/* Ambient effects */}
        {mapReady && <AmbientEffects />}

        {/* Paths */}
        {mapReady && <MapPaths progress={progress} />}

        {/* Player Avatar */}
        {mapReady && (
          <PlayerAvatar
            progress={progress}
            targetDungeonId={playerTarget}
            onArrived={handlePlayerArrived}
          />
        )}

        {/* Dungeons */}
        {mapReady &&
          dungeons.map((d) => (
            <DungeonMarker
              key={d.id}
              dungeon={d}
              unlocked={isUnlocked(d.id)}
              completed={isCompleted(d.id)}
              onClick={() => handleDungeonClick(d)}
            />
          ))}

        {/* Locked message toast */}
        {lockedMsg && (
          <motion.div
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 obsidian-panel px-6 py-3 pointer-events-none"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            <p className="font-display text-destructive text-xs tracking-wider flex items-center gap-2">
              🔒 {lockedMsg}
            </p>
          </motion.div>
        )}

        {/* Player Progress Bar */}
        <motion.div
          className="fixed top-4 left-1/2 -translate-x-1/2 z-20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <div className="obsidian-panel px-4 py-2 flex items-center gap-3">
            <span className="font-data text-mana text-[9px]">
              LVL {Math.min(progress.completedLevels.length + 1, 6)}
            </span>
            {/* XP bar */}
            <div className="relative w-24 h-2 bg-muted overflow-hidden" style={{ clipPath: "polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%)" }}>
              <motion.div
                className="absolute inset-y-0 left-0"
                style={{
                  background: "linear-gradient(90deg, hsl(var(--mana)), hsl(var(--gold)))",
                  boxShadow: "0 0 8px hsl(var(--gold) / 0.5)",
                }}
                initial={{ width: "0%" }}
                animate={{ width: `${xpProgress}%` }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
            <div className="flex gap-1">
              {dungeons.map((d) => (
                <div
                  key={d.id}
                  className={`w-4 h-4 flex items-center justify-center text-[8px] border transition-all ${
                    isCompleted(d.id)
                      ? "border-gold/60 bg-gold/20 text-gold"
                      : isUnlocked(d.id)
                      ? "border-mana/40 bg-mana/10 text-mana animate-pulse"
                      : "border-muted-foreground/20 bg-muted/30 text-muted-foreground"
                  }`}
                  style={{
                    clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                  }}
                  title={`${d.name}${
                    isCompleted(d.id)
                      ? " ✓"
                      : isUnlocked(d.id)
                      ? " (current)"
                      : " 🔒"
                  }`}
                />
              ))}
            </div>
            <span className="font-data text-gold text-[9px]">{progress.xp} XP</span>
          </div>
        </motion.div>

        {/* Bottom progress */}
        <motion.div
          className="fixed bottom-4 left-4 z-20 flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span className="text-[9px] font-data text-muted-foreground">PROGRESS:</span>
          <div className="flex gap-1">
            {dungeons.map((d) => (
              <motion.div
                key={d.id}
                className={`w-3 h-3 ${
                  isCompleted(d.id)
                    ? "bg-gold"
                    : isUnlocked(d.id)
                    ? "bg-mana/60"
                    : "bg-muted"
                }`}
                style={{
                  clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                  boxShadow: isCompleted(d.id) ? "0 0 6px hsl(var(--gold) / 0.5)" : "none",
                }}
                animate={
                  isCompleted(d.id)
                    ? { boxShadow: ["0 0 6px hsl(45 93% 56% / 0.3)", "0 0 12px hsl(45 93% 56% / 0.7)", "0 0 6px hsl(45 93% 56% / 0.3)"] }
                    : {}
                }
                transition={isCompleted(d.id) ? { duration: 2, repeat: Infinity } : {}}
                title={d.name}
              />
            ))}
          </div>
          <span className="text-[9px] font-data text-muted-foreground">
            {progress.completedLevels.length}/6
          </span>
          {progress.completedLevels.length > 0 && (
            <button
              onClick={resetProgress}
              className="text-[8px] font-data text-muted-foreground/50 hover:text-destructive transition-colors ml-2"
              title="Reset progress"
            >
              [RESET]
            </button>
          )}
        </motion.div>

        {/* Floating XP */}
        <FloatingXP
          show={showFloatingXP}
          xp={floatingXPAmount}
          onDone={() => setShowFloatingXP(false)}
        />

        {/* Modal */}
        <DungeonModal
          dungeon={activeDungeon}
          showMiniGame={showMiniGame}
          showContent={showContent}
          onClose={handleClose}
          onMiniGameComplete={handleMiniGameComplete}
        />

        {/* Victory Popup */}
        <VictoryPopup
          show={showVictory}
          dungeonName={victoryDungeon?.name || ""}
          xpGained={victoryDungeon ? getXpForLevel(victoryDungeon.id) : 0}
          badgeName={victoryDungeon ? getBadgeName(victoryDungeon.id) : ""}
          onContinue={handleVictoryContinue}
        />

        {/* Minimap */}
        <Minimap progress={progress} isUnlocked={isUnlocked} onDungeonClick={handleMinimapClick} />

        {/* Music toggle */}
        <MusicToggle />

        {/* Quest toast */}
        <QuestToast show={allComplete} onClose={() => {}} />
      </div>
    </ScreenShake>
  );
}
