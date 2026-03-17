import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "Shadow Realms",
    desc: "A dark action RPG with procedural dungeons and souls-like combat.",
    challenge: "Implemented real-time lighting with dynamic shadow maps on mobile GPU.",
    tech: ["Unity", "C#", "Shader Graph", "Addressables"],
  },
  {
    title: "Neon Drift",
    desc: "High-speed cyberpunk racing with destructible environments.",
    challenge: "Custom physics engine handling 60+ simultaneous colliders at 120fps.",
    tech: ["Unreal Engine 5", "C++", "Niagara", "Chaos Physics"],
  },
  {
    title: "Pixel Kingdoms",
    desc: "Retro strategy game with online multiplayer and procedural maps.",
    challenge: "Built peer-to-peer netcode with rollback for deterministic simulation.",
    tech: ["Godot", "GDScript", "WebRTC", "Tilemap"],
  },
  {
    title: "Void Walker",
    desc: "VR puzzle platformer exploring gravity-defying mechanics.",
    challenge: "Designed comfort-first locomotion reducing motion sickness by 40%.",
    tech: ["Unity", "C#", "XR Toolkit", "OpenXR"],
  },
];

const stagger = { visible: { transition: { staggerChildren: 0.08 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function ProjectsDungeon() {
  return (
    <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-4">
      <motion.p variants={fadeUp} className="text-muted-foreground text-xs">
        Ancient relics recovered from the developer's quest log.
      </motion.p>
      <div className="grid gap-4">
        {projects.map((p) => (
          <motion.div key={p.title} variants={fadeUp} className="relic-card p-4 space-y-3">
            <div className="flex items-start justify-between">
              <h4 className="font-display text-foreground text-sm tracking-wider">{p.title}</h4>
              <span className="text-gold text-[9px] font-data">★ LEGENDARY</span>
            </div>
            <p className="text-muted-foreground text-xs">{p.desc}</p>
            <div>
              <p className="text-mana text-[10px] font-data mb-1">◇ LORE (Technical Challenge):</p>
              <p className="text-muted-foreground text-[10px]">{p.challenge}</p>
            </div>
            <div>
              <p className="text-gold text-[10px] font-data mb-1">⬡ ENCHANTMENTS:</p>
              <div className="flex flex-wrap gap-1.5">
                {p.tech.map((t) => (
                  <span key={t} className="text-[9px] font-data px-1.5 py-0.5 border border-gold/30 text-gold bg-gold/5">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <Button variant="mana" size="sm" className="text-[10px] mt-1">
              VIEW RELIC →
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
