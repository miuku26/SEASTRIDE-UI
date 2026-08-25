import React from "react";
import { useGame } from "../context/GameContext";
import { ShipDisplay } from "./ShipDisplay";
import { ASSETS } from "../assets";
import { Player } from "../types";
import {
  Shield,
  Wrench,
  ShoppingBag,
  Globe,
  Lock,
  History,
} from "lucide-react";

interface ShipBuildScreenProps {
  openModal: (
    modal:
      | "upgrades"
      | "shop"
      | "server"
      | "repair"
      | "raids"
      | "attack"
      | "shipInspect",
  ) => void;
  onSelectTargetForAttack?: (player: Player) => void;
}

export const ShipBuildScreen: React.FC<ShipBuildScreenProps> = ({
  openModal,
}) => {
  const { currentServer, shipCondition, raidLogs } = useGame();

  return (
    <div className="relative h-full flex-1 p-2 sm:p-3 flex flex-col justify-between overflow-y-auto overflow-x-hidden select-none pb-24 sm:pb-32">
      {/* Dynamic Background: Cartoon Beach Landscape for Ship Build */}
      <div className="absolute inset-0 z-0">
        <img
          src={ASSETS.beachBg}
          alt="Backdrop"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover filter brightness-95 saturate-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1c0a02]/80 via-transparent to-[#1c0a02]/30" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-w-5xl mx-auto w-full flex flex-col space-y-3 my-auto">
        <div className="flex flex-col items-center justify-center space-y-4 animate-fade-in w-full">
          {/* Top Server Quick Info Bar */}
          <div className="w-full max-w-md bg-[#4a2c17]/90 border-4 border-[#2b1d19] rounded-2xl p-2.5 text-amber-100 shadow-xl backdrop-blur-sm flex items-center justify-between">
            <div className="flex items-center gap-2">
              {currentServer.type === "global" ? (
                <div className="p-1.5 bg-[#1e1b4b] border border-[#4338ca] rounded-lg text-sky-400">
                  <Globe className="w-4 h-4" />
                </div>
              ) : (
                <div className="p-1.5 bg-[#2b1d19] border border-[#b45309] rounded-lg text-[#facc15]">
                  <Lock className="w-4 h-4" />
                </div>
              )}
              <div>
                <div className="text-[10px] font-bold text-[#fde68a] uppercase font-serif">
                  {currentServer.name}
                </div>
                <div className="text-[10px] text-[#fbbf24] font-mono">
                  Code: {currentServer.code} • {currentServer.playerCount} Ships
                </div>
              </div>
            </div>
            <button
              onClick={() => openModal("server")}
              className="bg-[#1d4ed8] hover:bg-[#2563eb] border-b-2 border-[#1e3a8a] text-white px-2.5 py-1 rounded-lg text-[10px] font-black uppercase italic shadow"
            >
              Change Server
            </button>
          </div>

          {/* GIANT SHIP BUILD CANVAS */}
          <ShipDisplay
            onInspectShip={() => openModal("shipInspect")}
            isHugeBuildMode={true}
          />

          {/* SHIP BUILDING CONTROL HUB */}
          <div className="tutorial-ship-actions w-full max-w-md space-y-2">
            {shipCondition <= 50 && (
              <div className="text-[11px] font-bold text-center text-red-200 bg-red-950/90 border border-red-700 p-2 rounded-xl shadow-lg">
                ⚠️ Hull damaged ({shipCondition}%). Use Repair in the Shipyard
                below before setting sail!
              </div>
            )}

            {/* Grid of Shipyard Features */}
            <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
              <button
                onClick={() => openModal("upgrades")}
                className="tutorial-upgrades bg-[#b45309] hover:bg-[#d97706] active:translate-y-0.5 border-b-2 sm:border-b-4 border-r-2 border-[#2b1d19] py-2 sm:py-2.5 px-1 sm:px-2 rounded-xl text-center flex flex-col items-center justify-center gap-1 text-white shadow-xl italic font-black uppercase"
              >
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-[#facc15]" />
                <span className="text-[9px] sm:text-[10px] truncate w-full">
                  Upgrades
                </span>
              </button>

              <button
                onClick={() => openModal("repair")}
                className="tutorial-repair bg-[#93bb44] border-b-4 border-[#658627] text-white shadow-sm hover:brightness-110 active:border-b-0 active:translate-y-0.5 border-r-2 border-[#064e3b] py-2 sm:py-2.5 px-1 sm:px-2 rounded-xl text-center flex flex-col items-center justify-center gap-1 text-white shadow-xl italic font-black uppercase"
              >
                <Wrench className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                <span className="text-[9px] sm:text-[10px] truncate w-full">
                  Repair
                </span>
              </button>

              <button
                onClick={() => openModal("shop")}
                className="tutorial-shop bg-[#1d4ed8] hover:bg-[#2563eb] active:translate-y-0.5 border-b-2 sm:border-b-4 border-r-2 border-[#1e3a8a] py-2 sm:py-2.5 px-1 sm:px-2 rounded-xl text-center flex flex-col items-center justify-center gap-1 text-white shadow-xl italic font-black uppercase"
              >
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-sky-300" />
                <span className="text-[9px] sm:text-[10px] truncate w-full">
                  Shop
                </span>
              </button>

              <button
                onClick={() => openModal("raids")}
                className="tutorial-raids bg-[#2b1d19] hover:bg-[#4a2c17] active:translate-y-0.5 border-b-2 sm:border-b-4 border-r-2 border-[#1a0f0d] py-2 sm:py-2.5 px-1 sm:px-2 rounded-xl text-center flex flex-col items-center justify-center gap-1 text-[#fde68a] shadow-xl relative italic font-black uppercase"
              >
                <History className="w-4 h-4 sm:w-5 sm:h-5 text-[#facc15]" />
                <span className="text-[9px] sm:text-[10px] truncate w-full">
                  Raid Log
                </span>
                {raidLogs.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[8px] sm:text-[9px] font-black w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center border border-white">
                    {raidLogs.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
