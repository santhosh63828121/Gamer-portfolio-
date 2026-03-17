import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Coin {
  id: number;
  x: number;
  y: number;
}

const TARGET = 10;

interface CoinCollectGameProps {
  onComplete: () => void;
}

export default function CoinCollectGame({ onComplete }: CoinCollectGameProps) {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [collected, setCollected] = useState(0);
  const [nextId, setNextId] = useState(0);

  const spawnCoin = useCallback(() => {
    setNextId((id) => {
      const newCoin: Coin = {
        id: id + 1,
        x: 10 + Math.random() * 80,
        y: 10 + Math.random() * 70,
      };
      setCoins((prev) => [...prev.slice(-5), newCoin]);
      return id + 1;
    });
  }, []);

  useEffect(() => {
    if (collected >= TARGET) return;
    spawnCoin();
    const interval = setInterval(spawnCoin, 1200);
    return () => clearInterval(interval);
  }, [spawnCoin, collected]);

  // Remove coins that aren't clicked after 2.5s
  useEffect(() => {
    if (collected >= TARGET) return;
    const timer = setInterval(() => {
      setCoins((prev) => prev.slice(-4));
    }, 2500);
    return () => clearInterval(timer);
  }, [collected]);

  const handleCollect = (id: number) => {
    setCoins((prev) => prev.filter((c) => c.id !== id));
    const next = collected + 1;
    setCollected(next);
    if (next >= TARGET) {
      setTimeout(onComplete, 600);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <span className="font-data text-mana text-[10px]">COLLECT THE COINS!</span>
        <span className="font-data text-gold text-[10px]">
          {collected}/{TARGET} 🪙
        </span>
      </div>

      <div className="relative w-full h-48 border border-muted-foreground/20 bg-muted/30 overflow-hidden">
        <AnimatePresence>
          {coins.map((coin) => (
            <motion.button
              key={coin.id}
              className="absolute cursor-pointer"
              style={{ left: `${coin.x}%`, top: `${coin.y}%`, transform: "translate(-50%, -50%)" }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.5 }}
              onClick={() => handleCollect(coin.id)}
            >
              <span className="text-2xl drop-shadow-[0_0_6px_hsl(var(--gold)/0.6)]">🪙</span>
            </motion.button>
          ))}
        </AnimatePresence>

        {collected >= TARGET && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <p className="font-display text-gold text-sm">ALL COINS COLLECTED!</p>
          </motion.div>
        )}
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-muted overflow-hidden">
        <motion.div
          className="h-full bg-gold"
          animate={{ width: `${(collected / TARGET) * 100}%` }}
          transition={{ type: "spring", damping: 15 }}
        />
      </div>
    </div>
  );
}
