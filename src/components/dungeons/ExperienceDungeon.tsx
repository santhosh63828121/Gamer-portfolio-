import { motion } from "framer-motion";

const experiences = [
  {
    role: "Senior Game Developer",
    company: "Mythic Studios",
    period: "2022 – Present",
    desc: "Lead developer on a multiplayer action RPG. Architected combat and netcode systems.",
    type: "FULL-TIME",
  },
  {
    role: "Unity Developer",
    company: "Indie Collective",
    period: "2020 – 2022",
    desc: "Shipped 3 titles on Steam. Built modular gameplay frameworks and CI/CD pipelines.",
    type: "CONTRACT",
  },
  {
    role: "Game Design Intern",
    company: "PixelForge Games",
    period: "2019 – 2020",
    desc: "Prototyped level designs and balancing systems for a mobile roguelike.",
    type: "INTERNSHIP",
  },
  {
    role: "Freelance Developer",
    company: "Various Clients",
    period: "2018 – Present",
    desc: "Built custom tools, shaders, and gameplay systems for indie studios worldwide.",
    type: "FREELANCE",
  },
];

const stagger = { visible: { transition: { staggerChildren: 0.08 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function ExperienceDungeon() {
  return (
    <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-4">
      {experiences.map((exp, i) => (
        <motion.div
          key={i}
          variants={fadeUp}
          className="relative pl-6 border-l-2 border-mana/30 pb-4 last:pb-0"
        >
          <div className="absolute left-0 top-0 w-3 h-3 -translate-x-[7px] bg-mana/80 shadow-[0_0_8px_hsl(var(--mana)/0.5)]" style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }} />
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-display text-foreground text-[11px] tracking-wider">{exp.role}</h4>
            <span className="text-[8px] font-data px-1.5 py-0.5 border border-gold/30 text-gold">{exp.type}</span>
          </div>
          <p className="text-mana text-[10px] font-data">{exp.company} · {exp.period}</p>
          <p className="text-muted-foreground text-xs mt-1">{exp.desc}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}
