import { useState, useCallback } from "react";

export function useAchievements() {
  const [visited, setVisited] = useState<Set<number>>(new Set());
  const [questComplete, setQuestComplete] = useState(false);

  const markVisited = useCallback((dungeonId: number) => {
    setVisited((prev) => {
      const next = new Set(prev);
      next.add(dungeonId);
      if (next.size >= 6 && !questComplete) {
        setQuestComplete(true);
      }
      return next;
    });
  }, [questComplete]);

  return { visited, markVisited, questComplete, setQuestComplete };
}
