import { motion } from "framer-motion";
import { dungeons, mapPaths } from "@/data/dungeons";
import type { GameProgress } from "@/hooks/useGameProgress";

interface MapPathsProps {
  progress: GameProgress;
}

export default function MapPaths({ progress }: MapPathsProps) {
  const completed = new Set(progress.completedLevels);

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" preserveAspectRatio="none">
      <defs>
        <filter id="pathGlow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="pathGlowStrong">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Animated dash for active paths */}
        <linearGradient id="manaGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(187, 85%, 53%)" />
          <stop offset="100%" stopColor="hsl(45, 93%, 56%)" />
        </linearGradient>
      </defs>
      {mapPaths.map(([fromId, toId], i) => {
        const from = dungeons.find((d) => d.id === fromId)!;
        const to = dungeons.find((d) => d.id === toId)!;
        const bothCompleted = completed.has(fromId) && completed.has(toId);
        const anyUnlocked = fromId <= progress.currentLevel && toId <= progress.currentLevel;

        return (
          <g key={i}>
            {/* Base path */}
            <motion.line
              x1={`${from.x}%`}
              y1={`${from.y}%`}
              x2={`${to.x}%`}
              y2={`${to.y}%`}
              stroke={
                bothCompleted
                  ? "hsl(45, 93%, 56%)"
                  : anyUnlocked
                  ? "hsl(187, 85%, 53%)"
                  : "hsl(215, 20%, 35%)"
              }
              strokeWidth={bothCompleted ? "3" : "2"}
              strokeDasharray={bothCompleted ? "none" : "8 6"}
              strokeOpacity={bothCompleted ? 0.8 : anyUnlocked ? 0.4 : 0.15}
              filter={bothCompleted ? "url(#pathGlowStrong)" : "url(#pathGlow)"}
              initial={bothCompleted ? { pathLength: 0, strokeOpacity: 0 } : {}}
              animate={bothCompleted ? { pathLength: 1, strokeOpacity: 0.8 } : {}}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
            {/* Animated particle along completed paths */}
            {bothCompleted && (
              <motion.circle
                r="3"
                fill="hsl(45, 93%, 56%)"
                filter="url(#pathGlowStrong)"
                initial={{ opacity: 0 }}
                animate={{
                  cx: [`${from.x}%`, `${to.x}%`],
                  cy: [`${from.y}%`, `${to.y}%`],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.5,
                }}
              />
            )}
            {/* Animated dash for unlocked paths */}
            {anyUnlocked && !bothCompleted && (
              <motion.line
                x1={`${from.x}%`}
                y1={`${from.y}%`}
                x2={`${to.x}%`}
                y2={`${to.y}%`}
                stroke="hsl(187, 85%, 53%)"
                strokeWidth="1"
                strokeDasharray="4 8"
                strokeOpacity={0.6}
                initial={{ strokeDashoffset: 0 }}
                animate={{ strokeDashoffset: -24 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}
