// import { useState } from "react";

// export default function MusicToggle() {
//   const [muted, setMuted] = useState(true);

//   return (
//     <button
//       onClick={() => setMuted(!muted)}
//       className="fixed top-4 right-4 z-30 w-10 h-10 flex items-center justify-center border border-mana/40 bg-card/80 backdrop-blur-sm text-mana hover:border-mana/70 hover:shadow-[0_0_12px_hsl(var(--mana)/0.3)] transition-all text-sm"
//       title={muted ? "Unmute" : "Mute"}
//     >
//       {muted ? "🔇" : "🔊"}
//     </button>
//   );
// }


import { useState, useRef, useEffect } from "react";

export default function MusicToggle() {
  const [muted, setMuted] = useState(true);
  const audioRef = useRef(null);

  // Handle toggle
  const toggleMusic = () => {
    if (muted) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
    setMuted(!muted);
  };

  // Fix autoplay restriction (VERY IMPORTANT)
  useEffect(() => {
    const enableAudio = () => {
      if (!muted) {
        audioRef.current.play().catch(() => {});
      }
      document.removeEventListener("click", enableAudio);
    };

    document.addEventListener("click", enableAudio);
  }, [muted]);

  return (
    <>
      {/* Audio Element */}
      <audio ref={audioRef} loop>
        <source src="/sounds/game-music.mp3" type="audio/mpeg" />
      </audio>

      {/* Button */}
      <button
        onClick={toggleMusic}
        className="fixed top-4 right-4 z-30 w-10 h-10 flex items-center justify-center border border-mana/40 bg-card/80 backdrop-blur-sm text-mana hover:border-mana/70 hover:shadow-[0_0_12px_hsl(var(--mana)/0.3)] transition-all text-sm"
        title={muted ? "Unmute" : "Mute"}
      >
        {muted ? "🔇" : "🔊"}
      </button>
    </>
  );
}