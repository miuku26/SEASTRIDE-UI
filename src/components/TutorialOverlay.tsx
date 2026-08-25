import React, { useState, useEffect } from 'react';
import { Joyride, Step, CallBackProps, STATUS } from 'react-joyride';

interface TutorialProps {
  activeTab: 'menu' | 'home' | 'game' | 'leaderboard';
}

export const TutorialOverlay: React.FC<TutorialProps> = ({ activeTab }) => {
  const [run, setRun] = useState(false);
  const [steps, setSteps] = useState<Step[]>([]);

  useEffect(() => {
    // Reset the run state when tab changes
    setRun(false);

    if (activeTab === 'menu') {
      const hasSeen = localStorage.getItem('seastride_tut_menu_v3');
      if (!hasSeen) {
        setSteps([
          {
            target: 'body',
            placement: 'center',
            content: (
              <div className="font-serif">
                <h2 className="text-xl font-black text-[#4a2c17] mb-2 uppercase">Welcome to SeaStride!</h2>
                <p className="text-sm text-[#8b5a33] font-bold">Every real-world step you take powers your pirate fleet. Let's get started!</p>
              </div>
            ),
            disableBeacon: true,
          },
          {
            target: '.tutorial-start-voyage',
            content: (
              <div className="font-serif">
                <h3 className="text-lg font-black text-[#4a2c17] mb-1">Start Voyage</h3>
                <p className="text-sm text-[#8b5a33] font-bold">Tap here to begin your adventure and enter the game!</p>
              </div>
            ),
            disableBeacon: true,
          }
        ]);
        setTimeout(() => setRun(true), 800);
      }
    } else if (activeTab === 'home') {
      const hasSeen = localStorage.getItem('seastride_tut_home_v3');
      if (!hasSeen) {
        setSteps([
          {
            target: '.tutorial-steps-bar',
            content: (
              <div className="font-serif">
                <h3 className="text-lg font-black text-[#4a2c17] mb-1">Step Dashboard</h3>
                <p className="text-sm text-[#8b5a33] font-bold">This is your Home tab. Use it to track your real-world progress.</p>
              </div>
            ),
            disableBeacon: true,
          },
          {
            target: '.tutorial-level',
            content: (
              <div className="font-serif">
                <h3 className="text-lg font-black text-[#4a2c17] mb-1">Level & XP</h3>
                <p className="text-sm text-[#8b5a33] font-bold">Complete quests and walk to earn XP. Leveling up unlocks stronger ships!</p>
              </div>
            ),
            disableBeacon: true,
          },
          {
            target: '.tutorial-stats',
            content: (
              <div className="font-serif">
                <h3 className="text-lg font-black text-[#4a2c17] mb-1">Daily Stats</h3>
                <p className="text-sm text-[#8b5a33] font-bold">Monitor your distance, calories burned, and active time.</p>
              </div>
            ),
            disableBeacon: true,
          },
          {
            target: '.tutorial-quests',
            content: (
              <div className="font-serif">
                <h3 className="text-lg font-black text-[#4a2c17] mb-1">Daily Quests</h3>
                <p className="text-sm text-[#8b5a33] font-bold">Hit your step targets to claim XP and rewards here every day.</p>
              </div>
            ),
            disableBeacon: true,
          }
        ]);
        setTimeout(() => setRun(true), 800);
      }
    } else if (activeTab === 'game') {
      const hasSeen = localStorage.getItem('seastride_tut_game_v3');
      if (!hasSeen) {
        setSteps([
          {
            target: '.tutorial-game-nav',
            content: (
              <div className="font-serif">
                <h3 className="text-lg font-black text-[#4a2c17] mb-1">The Game</h3>
                <p className="text-sm text-[#8b5a33] font-bold">Welcome to your shipyard. This is where the action happens!</p>
              </div>
            ),
            disableBeacon: true,
          },
          {
            target: '.tutorial-energy-bar',
            content: (
              <div className="font-serif">
                <h3 className="text-lg font-black text-[#4a2c17] mb-1">Energy</h3>
                <p className="text-sm text-[#8b5a33] font-bold">Walking generates Energy. Use it to sail, explore, and battle.</p>
              </div>
            ),
            disableBeacon: true,
          },
          {
            target: '.tutorial-currency',
            content: (
              <div className="font-serif">
                <h3 className="text-lg font-black text-[#4a2c17] mb-1">Loot</h3>
                <p className="text-sm text-[#8b5a33] font-bold">Gold Coins and Gems you've collected. Use them to upgrade your fleet.</p>
              </div>
            ),
            disableBeacon: true,
          },
          {
            target: '.tutorial-sea-switch',
            content: (
              <div className="font-serif">
                <h3 className="text-lg font-black text-[#4a2c17] mb-1">The Sea vs Shipyard</h3>
                <p className="text-sm text-[#8b5a33] font-bold">Toggle between building your ship and exploring the open sea.</p>
              </div>
            ),
            disableBeacon: true,
          },
          {
            target: '.tutorial-upgrades',
            content: (
              <div className="font-serif">
                <h3 className="text-lg font-black text-[#4a2c17] mb-1">Upgrades</h3>
                <p className="text-sm text-[#8b5a33] font-bold">Improve your ship's cannons, hull, and sails here.</p>
              </div>
            ),
            disableBeacon: true,
          },
          {
            target: '.tutorial-shop',
            content: (
              <div className="font-serif">
                <h3 className="text-lg font-black text-[#4a2c17] mb-1">Shop</h3>
                <p className="text-sm text-[#8b5a33] font-bold">Buy supplies, gems, and special items with your hard-earned gold.</p>
              </div>
            ),
            disableBeacon: true,
          }
        ]);
        setTimeout(() => setRun(true), 1200);
      }
    } else if (activeTab === 'leaderboard') {
      const hasSeen = localStorage.getItem('seastride_tut_leaderboard_v3');
      if (!hasSeen) {
        setSteps([
          {
            target: '.tutorial-fleet-nav',
            content: (
              <div className="font-serif">
                <h3 className="text-lg font-black text-[#4a2c17] mb-1">Global Fleet</h3>
                <p className="text-sm text-[#8b5a33] font-bold">Compare your progress against other captains worldwide.</p>
              </div>
            ),
            disableBeacon: true,
          },
          {
            target: '.tutorial-leaderboard',
            content: (
              <div className="font-serif">
                <h3 className="text-lg font-black text-[#4a2c17] mb-1">Leaderboards</h3>
                <p className="text-sm text-[#8b5a33] font-bold">Check out the top rankings by Player Level and Total Coins Earned.</p>
              </div>
            ),
            disableBeacon: true,
          }
        ]);
        setTimeout(() => setRun(true), 800);
      }
    }
  }, [activeTab]);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];
    
    if (finishedStatuses.includes(status)) {
      setRun(false);
      localStorage.setItem(`seastride_tut_${activeTab}_v3`, 'true');
    }
  };

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous={true}
      showProgress={true}
      showSkipButton={true}
      spotlightClicks={true}
      disableOverlayClose={false}
      callback={handleJoyrideCallback}
      styles={{
        options: {
          arrowColor: '#f0dec1',
          backgroundColor: '#f0dec1',
          overlayColor: 'rgba(0, 0, 0, 0.85)',
          primaryColor: '#8b5a33',
          textColor: '#4a2c17',
          zIndex: 10000,
        },
        buttonClose: {
          display: 'none',
        },
        buttonNext: {
          backgroundColor: '#93bb44',
          fontWeight: '900',
          borderRadius: '12px',
          padding: '10px 20px',
          borderBottom: '4px solid #658627',
        },
        buttonBack: {
          color: '#8b5a33',
          fontWeight: 'bold',
        },
        buttonSkip: {
          color: '#d75448',
          fontWeight: 'bold',
        },
        tooltip: {
          borderRadius: '16px',
          border: '4px solid #8b5a33',
          boxShadow: '0 8px 0 #4a2c17',
        },
        tooltipContainer: {
          textAlign: 'left',
        }
      }}
    />
  );
};
