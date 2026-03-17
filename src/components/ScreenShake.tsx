import { motion, useAnimationControls } from "framer-motion";
import { useEffect, forwardRef, useImperativeHandle, ReactNode } from "react";

export interface ScreenShakeRef {
  shake: () => void;
}

interface ScreenShakeProps {
  children: ReactNode;
  trigger?: number; // increment to trigger shake
}

const ScreenShake = forwardRef<ScreenShakeRef, ScreenShakeProps>(({ children, trigger }, ref) => {
  const controls = useAnimationControls();

  const shake = async () => {
    await controls.start({
      x: [0, -4, 4, -3, 3, -1, 0],
      y: [0, 2, -2, 1, -1, 0],
      transition: { duration: 0.4, ease: "easeInOut" },
    });
  };

  useImperativeHandle(ref, () => ({ shake }));

  useEffect(() => {
    if (trigger && trigger > 0) shake();
  }, [trigger]);

  return (
    <motion.div animate={controls} className="w-full h-full">
      {children}
    </motion.div>
  );
});

ScreenShake.displayName = "ScreenShake";
export default ScreenShake;
