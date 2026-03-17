import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "GAME ENGINES",
    skills: [
      { name: "Unity", level: 92 },
      { name: "Unreal Engine 5", level: 78 },
      { name: "Godot", level: 65 },
    ],
  },
  {
    title: "PROGRAMMING",
    skills: [
      { name: "C#", level: 95 },
      { name: "C++", level: 82 },
      { name: "GDScript", level: 60 },
      { name: "HLSL / GLSL", level: 70 },
    ],
  },
  {
    title: "LEVEL DESIGN",
    skills: [
      { name: "ProBuilder", level: 85 },
      { name: "Tilemap Systems", level: 88 },
      { name: "World Building", level: 75 },
    ],
  },
  {
    title: "UI/UX FOR GAMES",
    skills: [
      { name: "UI Toolkit", level: 80 },
      { name: "HUD Design", level: 85 },
      { name: "Menu Systems", level: 90 },
    ],
  },
  {
    title: "MULTIPLAYER",
    skills: [
      { name: "Netcode / NGO", level: 72 },
      { name: "Photon", level: 68 },
      { name: "Mirror", level: 65 },
    ],
  },
];

const stagger = { visible: { transition: { staggerChildren: 0.06 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export default function SkillsDungeon() {
  return (
    <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-6">
      {skillCategories.map((cat) => (
        <motion.div key={cat.title} variants={fadeUp}>
          <h4 className="font-display text-gold text-[11px] tracking-wider mb-3">◈ {cat.title}</h4>
          <div className="space-y-2">
            {cat.skills.map((skill) => (
              <div key={skill.name} className="flex items-center gap-3">
                <span className="text-foreground text-xs font-data w-36 flex-shrink-0">{skill.name}</span>
                <div className="flex-1 mana-bar h-3">
                  <motion.div
                    className="mana-bar-fill h-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
                <span className="text-mana font-data text-[10px] w-8 text-right">{skill.level}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
