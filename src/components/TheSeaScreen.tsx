import React from "react";
import { TheSeaView } from "./TheSeaView";
import { Player } from "../types";
import { ASSETS } from "../assets";
import { Globe, Lock } from "lucide-react";
import { useGame } from "../context/GameContext";

interface TheSeaScreenProps {
  onSwitchToBuild: () => void;
  openModal: (modal: "attack" | "server") => void;
  onSelectTargetForAttack?: (player: Player) => void;
}

export const TheSeaScreen: React.FC<TheSeaScreenProps> = ({
  openModal,
  onSelectTargetForAttack,
  onSwitchToBuild,
}) => {
  const { currentServer } = useGame();

  return (
    <div className="relative h-full w-full flex flex-col overflow-hidden select-none pb-[env(safe-area-inset-bottom)]">
      <div className="absolute inset-0 z-0">
        <img
          src={ASSETS.topdownOcean}
          alt="Backdrop"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover filter brightness-95 saturate-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1c0a02]/80 via-transparent to-[#1c0a02]/30" />
      </div>
      
      <div className="relative z-10 w-full h-full flex flex-col pointer-events-none">
        
        {/* Top Floating HUD Overlay */}
        <div className="w-full flex justify-center pt-3 px-2 pointer-events-auto shrink-0 z-30">
          <div className="w-full max-w-sm bg-[#1a2938]/90 border border-[#38bdf8]/50 rounded-full p-1 text-amber-100 shadow-[0_4px_12px_rgba(56,189,248,0.2)] backdrop-blur-md flex items-center justify-between">
            <div className="flex items-center gap-2 pl-1">
              {currentServer.type === "global" ? (
                <div className="p-1 bg-[#0ea5e9]/20 rounded-full text-sky-400">
                  <Globe className="w-3.5 h-3.5" />
                </div>
              ) : (
                <div className="p-1 bg-[#fbbf24]/20 rounded-full text-[#facc15]">
                  <Lock className="w-3.5 h-3.5" />
                </div>
              )}
              <div className="flex flex-col">
                <span className="text-[9px] sm:text-[10px] font-bold text-sky-100 uppercase tracking-wider leading-none mb-0.5">
                  {currentServer.name}
                </span>
                <span className="text-[8px] sm:text-[9px] text-sky-300/80 font-mono leading-none">
                  {currentServer.playerCount} Ships
                </span>
              </div>
            </div>
            <button
              onClick={() => openModal("server")}
              className="bg-sky-500 hover:bg-sky-400 active:scale-95 border-b-2 border-sky-700 text-white px-3 py-1 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-wider shadow-md transition-all mr-0.5"
            >
              Switch
            </button>
          </div>
        </div>

        {/* Full Screen Ocean Viewport (Pointer events auto to interact with ships) */}
        <div className="flex-1 w-full animate-fade-in tutorial-sea-view-area pointer-events-auto relative mt-2 pb-0 sm:pb-2">
          <TheSeaView
            onOpenAttackModal={() => openModal("attack")}
            onSelectTargetForAttack={onSelectTargetForAttack}
            onSwitchToBuild={onSwitchToBuild}
          />
        </div>
      </div>
    </div>
  );
};
