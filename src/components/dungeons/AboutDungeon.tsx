import { motion } from "framer-motion";

const stats = [
  { label: "STR", name: "C++", value: 18 },
  { label: "INT", name: "Architecture", value: 16 },
  { label: "DEX", name: "Unity", value: 17 },
  { label: "WIS", name: "Game Design", value: 15 },
  { label: "CHA", name: "Teamwork", value: 14 },
];

const stagger = { visible: { transition: { staggerChildren: 0.08 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function AboutDungeon() {
  return (
    <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-6">
      {/* Character sheet header */}
      <motion.div variants={fadeUp} className="flex items-start gap-4">
        <div className="w-20 h-20 pixel-avatar bg-muted flex items-center justify-center text-4xl flex-shrink-0">
          ⚔️
        </div>
        <div>
          <h3 className="font-display text-foreground text-sm tracking-wider">DRAGON SLAYER DEV</h3>
          <p className="text-gold text-xs font-data mt-1">Level 24 Game Developer</p>
          <p className="text-muted-foreground text-xs font-data mt-2">
            Specializing in Shader Magic & C# Alchemy
          </p>
        </div>
      </motion.div>

      <motion.div variants={fadeUp}>
        <p className="text-muted-foreground text-xs leading-relaxed">
          A passionate game developer with 5+ years of experience crafting immersive worlds
          and engaging gameplay systems. From indie roguelikes to multiplayer arenas,
          every project is a new quest to conquer.
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div variants={fadeUp}>
        <h4 className="font-display text-mana text-[11px] tracking-wider mb-3">◈ CHARACTER STATS</h4>
        <div className="space-y-3">
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={fadeUp} className="flex items-center gap-3">
              <span className="text-gold font-display text-[10px] w-8">{stat.label}</span>
              <span className="text-foreground text-xs w-24 font-data">{stat.name}</span>
              <div className="flex-1 flex gap-1">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-3 w-1.5 ${
                      i < stat.value
                        ? "bg-mana shadow-[0_0_4px_hsl(var(--mana)/0.5)]"
                        : "bg-muted"
                    }`}
                  />
                ))}
              </div>
              <span className="text-gold font-data text-[10px] w-6 text-right">{stat.value}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div variants={fadeUp}>
        <h4 className="font-display text-mana text-[11px] tracking-wider mb-2">◈ EQUIPMENT</h4>
        <div className="flex flex-wrap gap-2">
          {["Unity", "Unreal Engine", "C#", "C++", "Game Design", "Blender", "Shader Graph"].map((t) => (
            <span key={t} className="text-[10px] font-data px-2 py-1 border border-mana/30 text-mana bg-mana/5">
              {t}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
