import React from 'react';
import { useGame } from '../context/GameContext';
import { Volume2, VolumeX, Shield, Zap, Globe, Lock } from 'lucide-react';
import { BackToSeaStride } from './BackToSeaStride';
import { CurrencyDisplay } from './CurrencyDisplay';

interface HeaderHUDProps {
  activeTab: 'home' | 'game';
  setActiveTab: (tab: 'home' | 'game') => void;
  openModal: (modal: 'upgrades' | 'shop' | 'server' | 'repair' | 'raids' | 'profile') => void;
  onBackToMenu: () => void;
}

export const HeaderHUD: React.FC<HeaderHUDProps> = ({ activeTab, setActiveTab, openModal, onBackToMenu }) => {
  const { coins, gems, energy, maxEnergy, currentServer, isMuted, toggleMute, shipCondition, profile } = useGame();

  return (
    <header className="sticky top-0 z-40 bg-[#2b1d19] border-b-4 sm:border-b-8 border-[#4a2c17] shadow-2xl text-amber-100 select-none" style={{ paddingTop: "max(4px, env(safe-area-inset-top))" }}>
      {/* Top Resource Bar - Centered on Mobile */}
      <div className="px-2 sm:px-3 py-1.5 flex items-center justify-center sm:justify-between gap-1.5 max-w-4xl mx-auto flex-wrap">
        {/* Logo / Badge & Currencies */}
        <div className="flex items-center justify-center gap-1.5 flex-wrap">
          <BackToSeaStride onClick={onBackToMenu} />
          {/* Captain Emblem Profile Circle Button */}
          <button
            onClick={() => openModal('profile')}
            className="tutorial-profile w-8 h-8 sm:w-10 sm:h-10 bg-[#f0c242] border-4 border-[#be9325] shadow-[0_4px_0_#be9325] rounded-full flex items-center justify-center shadow-md overflow-hidden flex-shrink-0 hover:scale-105 active:scale-95 transition-transform"
            title="My Captain Profile"
          >
            {profile?.avatarUrl ? (
              <img
                src={profile.avatarUrl}
                alt={profile.username}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <span className="text-base sm:text-xl">☠️</span>
            )}
          </button>

          <CurrencyDisplay />
        </div>

        {/* Energy Bar */}
        <div className="flex items-center bg-[#4a2c17] border-4 border-[#2b1d19] rounded-xl shadow-[0_4px_0_#2b1d19] px-2 sm:px-3 py-0.5 sm:py-1 shadow-md tutorial-energy-bar">
          <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#93bb44] fill-[#93bb44] mr-1 animate-bounce" />
          <div className="flex flex-col">
            <div className="flex items-center justify-between text-[9px] sm:text-[10px] text-[#f0dec1] font-black uppercase tracking-wider">
              <span>Energy</span>
              <span className="ml-1.5 text-white font-black">{energy}/{maxEnergy}</span>
            </div>
            <div className="flex gap-0.5 sm:gap-1 mt-0.5">
              {Array.from({ length: maxEnergy }).map((_, i) => (
                <div
                  key={i}
                  className={`w-2.5 sm:w-3.5 h-1.5 sm:h-2 rounded-sm border border-[#4a2c17] ${
                    i < energy
                      ? 'bg-[#93bb44] border border-[#658627] shadow-inner'
                      : 'bg-[#1e1108]'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Server & Mute Control */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => openModal('server')}
            className="flex items-center gap-1 bg-[#34aab2] border-b-4 border-[#1e7880] text-white rounded-xl px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-xs font-bold text-white active:scale-95 transition-transform"
          >
            {currentServer.type === 'global' ? (
              <Globe className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-sky-400" />
            ) : (
              <Lock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
            )}
            <span className="truncate max-w-[60px] sm:max-w-[120px]">{currentServer.code}</span>
          </button>

          <button
            onClick={toggleMute}
            className="p-1 sm:p-1.5 bg-[#d75448] border-b-4 border-[#9b3026] text-white rounded-xl text-white active:scale-90"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-400" /> : <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />}
          </button>
        </div>
      </div>

      {/* Quick Ship Repair Alert Button if damaged */}
      {shipCondition <= 50 && (
        <div className="bg-[#1a0f0d] border-t border-[#4a2c17] px-3 py-1.5 flex justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              openModal('repair');
            }}
            className="bg-[#93bb44] border-b-4 border-[#658627] text-white shadow-sm hover:brightness-110 active:border-b-0 active:translate-y-1 text-white font-black text-xs px-4 py-1 rounded-lg border border-[#064e3b] animate-bounce flex items-center gap-1 shadow-md"
          >
            <Shield className="w-4 h-4" />
            <span>CRITICAL: REPAIR SHIP</span>
          </button>
        </div>
      )}
    </header>
  );
};
