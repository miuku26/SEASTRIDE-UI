import React, { useState, useEffect } from "react";
import { Joyride, STATUS, Step } from "react-joyride";

interface TutorialProps {
  activeTab: string;
  forceRun?: boolean;
  onTutorialEnd?: () => void;
}

export const TutorialOverlay: React.FC<TutorialProps> = ({
  activeTab,
  forceRun,
  onTutorialEnd,
}) => {
  const [run, setRun] = useState(false);
  const [steps, setSteps] = useState<Step[]>([]);

  useEffect(() => {
    setRun(false);

    if (activeTab === "menu") {
      const hasSeen = localStorage.getItem("seastride_tut_menu_v4");
      if (!hasSeen || forceRun) {
        setSteps([
          {
            target: "body",
            placement: "center",
            content: (
              <div className="font-serif">
                <h2 className="text-xl font-black text-[#4a2c17] mb-2 uppercase">
                  Welcome to SeaStride!
                </h2>
                <p className="text-sm text-[#8b5a33] font-bold">
                  Every real-world step you take powers your pirate fleet. Let's
                  get started!
                </p>
              </div>
            ),
            
          },
          {
            target: ".tutorial-start-voyage",
            content: (
              <div className="font-serif">
                <h3 className="text-lg font-black text-[#4a2c17] mb-1">
                  Start Voyage
                </h3>
                <p className="text-sm text-[#8b5a33] font-bold">
                  Tap here to begin your adventure and enter the game!
                </p>
              </div>
            ),
            
          },
        ]);
        setTimeout(() => setRun(true), 800);
      }
    } else if (activeTab === "home") {
      const hasSeen = localStorage.getItem("seastride_tut_home_v4");
      if (!hasSeen || forceRun) {
        setSteps([
          {
            target: ".tutorial-steps-bar",
            content: (
              <div className="font-serif">
                <h3 className="text-lg font-black text-[#4a2c17] mb-1">
                  Daily Steps
                </h3>
                <p className="text-sm text-[#8b5a33] font-bold">
                  This is your Home tab. Use it to track your real-world
                  progress.
                </p>
              </div>
            ),
            
          },
          {
            target: ".tutorial-level",
            content: (
              <div className="font-serif">
                <h3 className="text-lg font-black text-[#4a2c17] mb-1">
                  Level & XP
                </h3>
                <p className="text-sm text-[#8b5a33] font-bold">
                  Complete quests and walk to earn XP. Leveling up unlocks
                  stronger ships!
                </p>
              </div>
            ),
            
          },
          {
            target: ".tutorial-stats",
            content: (
              <div className="font-serif">
                <h3 className="text-lg font-black text-[#4a2c17] mb-1">
                  Daily Stats
                </h3>
                <p className="text-sm text-[#8b5a33] font-bold">
                  Monitor your distance, calories burned, and active time.
                </p>
              </div>
            ),
            
          },
          {
            target: ".tutorial-quests",
            content: (
              <div className="font-serif">
                <h3 className="text-lg font-black text-[#4a2c17] mb-1">
                  Daily Quests
                </h3>
                <p className="text-sm text-[#8b5a33] font-bold">
                  Hit your step targets to claim XP and rewards here every day.
                </p>
              </div>
            ),
            
          },
        ]);
        setTimeout(() => setRun(true), 800);
      }
    } else if (activeTab === "build") {
      const hasSeen = localStorage.getItem("seastride_tut_build_v4");
      if (!hasSeen || forceRun) {
        setSteps([
          {
            target: ".tutorial-build-nav",
            content: (
              <div className="font-serif">
                <h3 className="text-lg font-black text-[#4a2c17] mb-1">
                  Ship Build
                </h3>
                <p className="text-sm text-[#8b5a33] font-bold">
                  Welcome to your shipyard. This is where you modify your
                  flagship!
                </p>
              </div>
            ),
            
          },
          {
            target: ".tutorial-energy-bar",
            content: (
              <div className="font-serif">
                <h3 className="text-lg font-black text-[#4a2c17] mb-1">
                  Energy
                </h3>
                <p className="text-sm text-[#8b5a33] font-bold">
                  Walking generates Energy. Use it to sail, explore, and battle.
                </p>
              </div>
            ),
            
          },
          {
            target: ".tutorial-currency",
            content: (
              <div className="font-serif">
                <h3 className="text-lg font-black text-[#4a2c17] mb-1">Loot</h3>
                <p className="text-sm text-[#8b5a33] font-bold">
                  Gold Coins and Gems you've collected. Use them to upgrade your
                  fleet.
                </p>
              </div>
            ),
            
          },
          {
            target: ".tutorial-repair",
            content: (
              <div className="font-serif">
                <h3 className="text-lg font-black text-[#4a2c17] mb-1">
                  Repair
                </h3>
                <p className="text-sm text-[#8b5a33] font-bold">
                  Fix hull damage after battles. You cannot sail if your ship is
                  destroyed!
                </p>
              </div>
            ),
            
          },
          {
            target: ".tutorial-upgrades",
            content: (
              <div className="font-serif">
                <h3 className="text-lg font-black text-[#4a2c17] mb-1">
                  Upgrades
                </h3>
                <p className="text-sm text-[#8b5a33] font-bold">
                  Improve your ship's cannons, hull, and sails here.
                </p>
              </div>
            ),
            
          },
          {
            target: ".tutorial-shop",
            content: (
              <div className="font-serif">
                <h3 className="text-lg font-black text-[#4a2c17] mb-1">Shop</h3>
                <p className="text-sm text-[#8b5a33] font-bold">
                  Buy supplies, gems, and special items with your hard-earned
                  gold.
                </p>
              </div>
            ),
            
          },
        ]);
        setTimeout(() => setRun(true), 1200);
      }
    } else if (activeTab === "sea") {
      const hasSeen = localStorage.getItem("seastride_tut_sea_v4");
      if (!hasSeen || forceRun) {
        setSteps([
          {
            target: ".tutorial-sea-nav",
            content: (
              <div className="font-serif">
                <h3 className="text-lg font-black text-[#4a2c17] mb-1">
                  The Sea
                </h3>
                <p className="text-sm text-[#8b5a33] font-bold">
                  Welcome to the open ocean! Explore and battle here.
                </p>
              </div>
            ),
            
          },
          {
            target: ".tutorial-sea-view-area",
            content: (
              <div className="font-serif">
                <h3 className="text-lg font-black text-[#4a2c17] mb-1">
                  Exploration
                </h3>
                <p className="text-sm text-[#8b5a33] font-bold">
                  Drag to pan the camera. Tap on ships to attack them!
                </p>
              </div>
            ),
            
          },
        ]);
        setTimeout(() => setRun(true), 1200);
      }
    } else if (activeTab === "leaderboard") {
      const hasSeen = localStorage.getItem("seastride_tut_leaderboard_v4");
      if (!hasSeen || forceRun) {
        setSteps([
          {
            target: ".tutorial-fleet-nav",
            content: (
              <div className="font-serif">
                <h3 className="text-lg font-black text-[#4a2c17] mb-1">
                  Global Fleet
                </h3>
                <p className="text-sm text-[#8b5a33] font-bold">
                  Compare your progress against other captains worldwide.
                </p>
              </div>
            ),
            
          },
          {
            target: ".tutorial-leaderboard",
            content: (
              <div className="font-serif">
                <h3 className="text-lg font-black text-[#4a2c17] mb-1">Rank</h3>
                <p className="text-sm text-[#8b5a33] font-bold">
                  Check out the top rankings by Player Level and Total Coins
                  Earned.
                </p>
              </div>
            ),
            
          },
        ]);
        setTimeout(() => setRun(true), 800);
      }
    }
  }, [activeTab, forceRun]);

  const handleJoyrideCallback = (data: any) => {
    const { status, type, step } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    document.querySelectorAll('.tutorial-active-target').forEach(el => {
      el.classList.remove('tutorial-active-target');
      (el as HTMLElement).style.zIndex = '';
    });

    if (type === 'tooltip:update' || type === 'step:before') {
       const targetEl = document.querySelector(step.target as string);
       if (targetEl && step.target !== 'body') {
         targetEl.classList.add('tutorial-active-target');
         (targetEl as HTMLElement).style.zIndex = '10001';
         if (window.getComputedStyle(targetEl).position === 'static') {
            (targetEl as HTMLElement).style.position = 'relative';
         }
       }
    }

    if (finishedStatuses.includes(status)) {
      setRun(false);
      localStorage.setItem(`seastride_tut_${activeTab}_v4`, "true");
      if (onTutorialEnd) onTutorialEnd();
    }
  };

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous={true}
      onEvent={handleJoyrideCallback}
      styles={( {
        options: {
          arrowColor: "#f0dec1",
          backgroundColor: "#f0dec1",
          overlayColor: "rgba(0, 0, 0, 0.85)",
          primaryColor: "#8b5a33",
          textColor: "#4a2c17",
          zIndex: 10000,
        },
        buttonClose: {
          display: "none",
        },
        buttonNext: {
          backgroundColor: "#93bb44",
          fontWeight: "900",
          borderRadius: "12px",
          padding: "10px 20px",
          borderBottom: "4px solid #658627",
        },
        buttonBack: {
          color: "#8b5a33",
          fontWeight: "bold",
        },
        buttonSkip: {
          color: "#d75448",
          fontWeight: "bold",
        },
        tooltip: {
          borderRadius: "16px",
          border: "4px solid #8b5a33",
          boxShadow: "0 8px 0 #4a2c17",
        },
        tooltipContainer: {
          textAlign: "left",
        },
      } as any)}
    />
  );
};
