import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, ReactNode } from "react";

interface ParallaxMapProps {
  children: ReactNode;
}

export default function ParallaxMap({ children }: ParallaxMapProps) {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 30 });
  const x = useTransform(springX, [0, 1], [8, -8]);
  const y = useTransform(springY, [0, 1], [5, -5]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <motion.div style={{ x, y }} className="absolute inset-[-20px]">
      {children}
    </motion.div>
  );
}
