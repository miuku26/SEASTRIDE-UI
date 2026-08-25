import React from 'react';
import { CircleDollarSign, Gem } from 'lucide-react';
import { useGame } from '../context/GameContext';

export const CurrencyDisplay: React.FC = () => {
  const { coins, gems } = useGame();

  return (
    <div className="flex justify-end items-center gap-2 sm:gap-3 flex-wrap tutorial-currency">
      {/* Gold Coins - Gamified Wood Look */}
      <div className="flex items-center justify-center gap-1.5 bg-[#4a2c17] border-4 border-[#2b1d19] rounded-xl px-2.5 py-1 sm:px-4 sm:py-1.5 shadow-[0_4px_0_#2b1d19]">
        <CircleDollarSign className="w-[18px] h-[18px] sm:w-5 sm:h-5 text-[#f0c242]" />
        <span className="text-[#f0c242] font-serif font-black text-[14px] sm:text-base leading-none tracking-wide">{coins.toLocaleString()}</span>
      </div>
      {/* Gems - Gamified Blue Look */}
      <div className="flex items-center justify-center gap-1.5 bg-[#34aab2] border-4 border-[#1e7880] rounded-xl px-2.5 py-1 sm:px-4 sm:py-1.5 shadow-[0_4px_0_#1e7880]">
        <Gem className="w-[18px] h-[18px] sm:w-5 sm:h-5 text-white" />
        <span className="text-white font-serif font-black text-[14px] sm:text-base leading-none tracking-wide">{gems}</span>
      </div>
    </div>
  );
};
