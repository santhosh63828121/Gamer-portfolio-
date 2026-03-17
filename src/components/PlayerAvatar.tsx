import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { dungeons, mapPaths } from "@/data/dungeons";
import type { GameProgress } from "@/hooks/useGameProgress";

interface PlayerAvatarProps {
  progress: GameProgress;
  targetDungeonId: number | null;
  onArrived?: () => void;
}

function findPath(fromId: number, toId: number): number[] {
  // BFS through mapPaths
  const adj: Record<number, number[]> = {};
  mapPaths.forEach(([a, b]) => {
    if (!adj[a]) adj[a] = [];
    if (!adj[b]) adj[b] = [];
    adj[a].push(b);
    adj[b].push(a);
  });

  const queue: number[][] = [[fromId]];
  const visited = new Set<number>([fromId]);

  while (queue.length > 0) {
    const path = queue.shift()!;
    const current = path[path.length - 1];
    if (current === toId) return path;
    for (const neighbor of adj[current] || []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([...path, neighbor]);
      }
    }
  }
  return [fromId, toId];
}

export default function PlayerAvatar({ progress, targetDungeonId, onArrived }: PlayerAvatarProps) {
  const controls = useAnimationControls();
  const [currentPos, setCurrentPos] = useState({ x: dungeons[0].x, y: dungeons[0].y });
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);
  const trailId = useRef(0);
  const currentDungeonRef = useRef(1);

  useEffect(() => {
    // Set initial position to current level dungeon
    const startDungeon = dungeons.find(d => d.id === progress.currentLevel) || dungeons[0];
    setCurrentPos({ x: startDungeon.x, y: startDungeon.y });
    currentDungeonRef.current = progress.currentLevel;
  }, []);

  useEffect(() => {
    if (!targetDungeonId) return;

    const path = findPath(currentDungeonRef.current, targetDungeonId);
    if (path.length <= 1) {
      onArrived?.();
      return;
    }

    const animate = async () => {
      for (let i = 1; i < path.length; i++) {
        const target = dungeons.find(d => d.id === path[i])!;
        const prev = dungeons.find(d => d.id === path[i - 1])!;

        // Add trail points between positions
        const steps = 5;
        for (let s = 1; s <= steps; s++) {
          const t = s / steps;
          setTrail(prev => [
            ...prev.slice(-15),
            {
              x: prev.length > 0 ? prev[prev.length - 1].x + (target.x - (prev[prev.length - 1]?.x || prev.length > 0 ? prev[prev.length - 1].x : 0)) * 0.2 : prev.length > 0 ? prev[prev.length - 1].x : currentPos.x,
              y: prev.length > 0 ? prev[prev.length - 1].y + (target.y - (prev[prev.length - 1]?.y || 0)) * 0.2 : currentPos.y,
              id: trailId.current++,
            }
          ]);
        }

        await controls.start({
          left: `${target.x}%`,
          top: `${target.y}%`,
          transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
        });

        setCurrentPos({ x: target.x, y: target.y });
      }

      currentDungeonRef.current = targetDungeonId;
      // Clear trail after a bit
      setTimeout(() => setTrail([]), 800);
      onArrived?.();
    };

    animate();
  }, [targetDungeonId]);

  return (
    <>
      {/* Trail */}
      {trail.map((t) => (
        <motion.div
          key={t.id}
          className="absolute z-[8] pointer-events-none"
          style={{ left: `${t.x}%`, top: `${t.y}%`, transform: "translate(-50%, -50%)" }}
          initial={{ opacity: 0.8, scale: 1 }}
          animate={{ opacity: 0, scale: 0.3 }}
          transition={{ duration: 1 }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-mana/60" style={{ boxShadow: "0 0 6px hsl(187 85% 53% / 0.4)" }} />
        </motion.div>
      ))}

      {/* Avatar */}
      <motion.div
        className="absolute z-[9] pointer-events-none"
        style={{ left: `${currentPos.x}%`, top: `${currentPos.y}%` }}
        animate={controls}
      >
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Shadow */}
          <div
            className="absolute left-1/2 -translate-x-1/2 bottom-[-4px] w-6 h-2 rounded-full"
            style={{ background: "radial-gradient(ellipse, rgba(0,0,0,0.4) 0%, transparent 70%)" }}
          />
          {/* Character */}
          <div
            className="w-8 h-8 flex items-center justify-center text-lg"
            style={{
              background: "hsl(var(--card))",
              border: "2px solid hsl(var(--gold))",
              borderRadius: "50%",
              boxShadow: "0 0 12px hsl(var(--gold) / 0.5), 0 0 24px hsl(var(--gold) / 0.2)",
            }}
          >
            ⚔️
          </div>
          {/* Glow ring */}
          <motion.div
            className="absolute inset-[-4px] rounded-full"
            style={{ border: "1px solid hsl(var(--gold) / 0.3)" }}
            animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </>
  );
}
