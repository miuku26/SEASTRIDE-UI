import React from "react";
import { motion } from "motion/react";
import { Volume2, VolumeX, Anchor } from "lucide-react";
import { ASSETS } from "../assets";
import { useCutoutImage } from "../utils/imageUtils";
import { useGame } from "../context/GameContext";

interface MenuScreenProps {
  onSelectSteps: () => void;
  onSelectGame: () => void;
  onSelectLeaderboard: () => void;
}

export function MenuScreen({
  onSelectSteps,
  onSelectGame,
  onSelectLeaderboard,
}: MenuScreenProps) {
  const transparentLogo = useCutoutImage(ASSETS.logo, { mode: "edge" });
  const { isMuted, toggleMute } = useGame();

  return (
    <div className="absolute inset-0 w-full h-full z-50 flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${ASSETS.menuBg})` }}
      />
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Top Bar / Controls */}
      <div className="absolute top-0 right-0 p-4 sm:p-6 z-20">
        <button
          onClick={toggleMute}
          className="w-12 h-12 bg-[#4a2c17]/80 backdrop-blur-sm border-2 border-[#d97706] rounded-full flex items-center justify-center text-white shadow-lg active:scale-95 transition-transform"
        >
          {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </button>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center w-full px-4 pt-8 pb-16 sm:pb-24 h-full justify-between">
        {/* Logo Section - Increased Size & Responsive */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: -20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
          className="w-full flex justify-center drop-shadow-2xl flex-1 items-center"
        >
          <img
            src={transparentLogo}
            alt="SeaStride Logo"
            className="w-full max-w-[85%] sm:max-w-[90%] md:max-w-2xl h-auto object-contain max-h-[50vh]"
          />
        </motion.div>

        {/* Start Voyage Button */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-col gap-5 w-full max-w-[280px] sm:max-w-[320px] mb-8"
        >
          <button
            onClick={onSelectSteps}
            className="tutorial-start-voyage ring-4 ring-[#93bb44]/50 ring-offset-4 ring-offset-[#4a2c17] animate-[pulse_2s_ease-in-out_infinite] w-full h-24 sm:h-28 bg-[#93bb44] hover:brightness-110 border-4 border-[#658627] border-b-[12px] active:border-b-4 active:translate-y-[8px] rounded-2xl flex flex-col items-center justify-center shadow-[0_8px_16px_rgba(0,0,0,0.6)] transition-all overflow-hidden relative group"
          >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-30 mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-colors"></div>
            <div className="flex items-center justify-center gap-3 z-10">
              <Anchor className="w-8 h-8 sm:w-10 sm:h-10 text-white drop-shadow-md animate-pulse" />
              <div className="flex flex-col items-center">
                <span className="font-black text-white text-3xl sm:text-4xl tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] uppercase">
                  Start Voyage
                </span>
                <span className="text-[#e5f5c9] text-xs sm:text-sm font-bold tracking-widest uppercase mt-1 drop-shadow-md">
                  Begin Your Adventure
                </span>
              </div>
            </div>
          </button>
        </motion.div>
      </div>
    </div>
  );
}
