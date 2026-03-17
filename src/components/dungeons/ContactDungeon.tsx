import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const links = [
  { icon: "📧", label: "Email", value: "dev@dragonslayer.quest", href: "mailto:dev@dragonslayer.quest" },
  { icon: "💼", label: "LinkedIn", value: "/in/dragonslayer-dev", href: "#" },
  { icon: "🐙", label: "GitHub", value: "github.com/dragonslayer", href: "#" },
  { icon: "💬", label: "Discord", value: "DragonSlayer#1337", href: "#" },
];

const stagger = { visible: { transition: { staggerChildren: 0.08 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export default function ContactDungeon() {
  const [sent, setSent] = useState(false);

  return (
    <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={fadeUp} className="grid grid-cols-2 gap-3">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            className="flex items-center gap-2 p-3 border border-mana/20 bg-mana/5 hover:border-mana/40 transition-colors"
          >
            <span className="text-lg">{l.icon}</span>
            <div>
              <p className="text-foreground text-[10px] font-display tracking-wider">{l.label}</p>
              <p className="text-muted-foreground text-[9px] font-data">{l.value}</p>
            </div>
          </a>
        ))}
      </motion.div>

      <motion.div variants={fadeUp}>
        <h4 className="font-display text-gold text-[11px] tracking-wider mb-3">◈ SEND A SCROLL</h4>
        {sent ? (
          <div className="text-center py-6">
            <p className="text-gold font-display text-sm">✦ MESSAGE SENT ✦</p>
            <p className="text-muted-foreground text-xs mt-2">Your scroll has been dispatched via raven.</p>
          </div>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="space-y-3"
          >
            <input
              type="text"
              placeholder="Your Name"
              required
              className="w-full bg-muted/50 border border-mana/20 px-3 py-2 text-xs font-data text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-mana/60 focus:shadow-[0_0_10px_hsl(var(--mana)/0.2)] transition-all"
            />
            <input
              type="email"
              placeholder="Your Email"
              required
              className="w-full bg-muted/50 border border-mana/20 px-3 py-2 text-xs font-data text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-mana/60 focus:shadow-[0_0_10px_hsl(var(--mana)/0.2)] transition-all"
            />
            <textarea
              placeholder="Your Message..."
              rows={4}
              required
              className="w-full bg-muted/50 border border-mana/20 px-3 py-2 text-xs font-data text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-mana/60 focus:shadow-[0_0_10px_hsl(var(--mana)/0.2)] transition-all resize-none"
            />
            <Button variant="cast" size="lg" type="submit" className="w-full">
              ⚡ CAST MESSAGE
            </Button>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}
