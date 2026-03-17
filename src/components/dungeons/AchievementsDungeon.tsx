import { motion } from "framer-motion";

const achievements = [
  { icon: "🏆", title: "Global Game Jam 2023", desc: "1st Place – Best Gameplay", type: "AWARD" },
  { icon: "🎮", title: "Ludum Dare 52", desc: "Top 10% Overall – Solo Entry", type: "GAME JAM" },
  { icon: "📜", title: "Unity Certified Developer", desc: "Professional certification – 2022", type: "CERT" },
  { icon: "🚀", title: "Shadow Realms", desc: "Published on Steam – 2000+ downloads", type: "PUBLISHED" },
  { icon: "⚡", title: "GMTK Game Jam 2022", desc: "Honorable Mention – Innovation", type: "GAME JAM" },
  { icon: "🎓", title: "Unreal Engine Nanodegree", desc: "Udacity – 2021", type: "CERT" },
];

const stagger = { visible: { transition: { staggerChildren: 0.08 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export default function AchievementsDungeon() {
  return (
    <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-3">
      {achievements.map((a, i) => (
        <motion.div key={i} variants={fadeUp} className="flex items-start gap-3 p-3 border border-gold/20 bg-gold/5">
          <span className="text-2xl flex-shrink-0">{a.icon}</span>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h4 className="font-display text-foreground text-[11px] tracking-wider">{a.title}</h4>
              <span className="text-[8px] font-data px-1.5 py-0.5 border border-mana/30 text-mana">{a.type}</span>
            </div>
            <p className="text-muted-foreground text-[10px] mt-0.5">{a.desc}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
