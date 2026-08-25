import React from "react";
import { TheSeaView } from "./TheSeaView";
import { Player } from "../types";
import { ASSETS } from "../assets";

interface TheSeaScreenProps {
  onSwitchToBuild: () => void;
  openModal: (modal: "attack") => void;
  onSelectTargetForAttack?: (player: Player) => void;
}

export const TheSeaScreen: React.FC<TheSeaScreenProps> = ({
  openModal,
  onSelectTargetForAttack,
  onSwitchToBuild,
}) => {
  return (
    <div className="relative h-full flex-1 p-2 sm:p-3 flex flex-col justify-between overflow-y-auto overflow-x-hidden select-none pb-24 sm:pb-32">
      <div className="absolute inset-0 z-0">
        <img
          src={ASSETS.topdownOcean}
          alt="Backdrop"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover filter brightness-95 saturate-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1c0a02]/80 via-transparent to-[#1c0a02]/30" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full flex flex-col space-y-3 my-auto h-full">
        <div className="w-full h-full animate-fade-in tutorial-sea-view-area">
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
