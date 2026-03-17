import { motion } from "framer-motion";
import { useEffect, useState, useCallback } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  type: "firefly" | "dust";
}

export default function AmbientEffects() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generated: Particle[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 5,
      type: Math.random() > 0.4 ? "firefly" : "dust",
    }));
    setParticles(generated);
  }, []);

  return (
    <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
      {/* Fireflies & dust */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background:
              p.type === "firefly"
                ? "hsl(var(--gold))"
                : "hsl(var(--mana) / 0.3)",
            boxShadow:
              p.type === "firefly"
                ? `0 0 ${p.size * 3}px hsl(var(--gold) / 0.6)`
                : "none",
          }}
          animate={{
            x: [0, (Math.random() - 0.5) * 60, (Math.random() - 0.5) * 40, 0],
            y: [0, (Math.random() - 0.5) * 60, (Math.random() - 0.5) * 40, 0],
            opacity: p.type === "firefly" ? [0, 0.9, 0.4, 0.9, 0] : [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Fog layers */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 20% 80%, hsl(var(--mana) / 0.04) 0%, transparent 50%)",
        }}
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 80% 30%, hsl(var(--gold) / 0.03) 0%, transparent 40%)",
        }}
        animate={{ opacity: [0.5, 0.2, 0.5] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, hsl(var(--background) / 0.6) 100%)",
        }}
      />
    </div>
  );
}
