import { useState, useCallback, useEffect } from "react";

export interface GameProgress {
  completedLevels: number[]; // dungeon IDs completed
  currentLevel: number; // highest unlocked dungeon ID
  xp: number;
  badges: string[];
}

const STORAGE_KEY = "rpg-portfolio-progress";
const XP_PER_LEVEL = [0, 100, 200, 300, 400, 500, 600]; // index = dungeon id

const BADGE_NAMES: Record<number, string> = {
  1: "Origin Seeker",
  2: "Skill Forger",
  3: "Relic Hunter",
  4: "Chronicle Keeper",
  5: "Trophy Collector",
  6: "Guild Messenger",
};

function loadProgress(): GameProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { completedLevels: [], currentLevel: 1, xp: 0, badges: [] };
}

function saveProgress(p: GameProgress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
}

export function useGameProgress() {
  const [progress, setProgress] = useState<GameProgress>(loadProgress);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const isUnlocked = useCallback(
    (dungeonId: number) => dungeonId <= progress.currentLevel,
    [progress.currentLevel]
  );

  const isCompleted = useCallback(
    (dungeonId: number) => progress.completedLevels.includes(dungeonId),
    [progress.completedLevels]
  );

  const completeLevel = useCallback((dungeonId: number) => {
    setProgress((prev) => {
      if (prev.completedLevels.includes(dungeonId)) return prev;
      const xpGain = XP_PER_LEVEL[dungeonId] || 100;
      const badge = BADGE_NAMES[dungeonId];
      return {
        completedLevels: [...prev.completedLevels, dungeonId],
        currentLevel: Math.max(prev.currentLevel, dungeonId + 1),
        xp: prev.xp + xpGain,
        badges: badge ? [...prev.badges, badge] : prev.badges,
      };
    });
  }, []);

  const resetProgress = useCallback(() => {
    const fresh: GameProgress = { completedLevels: [], currentLevel: 1, xp: 0, badges: [] };
    setProgress(fresh);
  }, []);

  const getXpForLevel = (dungeonId: number) => XP_PER_LEVEL[dungeonId] || 100;
  const getBadgeName = (dungeonId: number) => BADGE_NAMES[dungeonId] || "Unknown";

  return {
    progress,
    isUnlocked,
    isCompleted,
    completeLevel,
    resetProgress,
    getXpForLevel,
    getBadgeName,
  };
}
