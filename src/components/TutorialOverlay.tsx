import React, { useState, useEffect } from "react";
import { Joyride, STATUS, Step, EVENTS, ACTIONS } from "react-joyride";

interface TutorialProps {
  activeTab: string;
  setActiveTab: (tab: "menu" | "home" | "build" | "sea" | "leaderboard") => void;
  forceRunTargetStep?: number | null;
  onTutorialEnd?: () => void;
}

const GLOBAL_STEPS: (Step & { _tab: string })[] = [
  // Menu
  {
    target: "body",
    placement: "center",
    _tab: "menu",
    content: (
      <div className="font-serif">
        <h2 className="text-[clamp(1.15rem,4vw,1.5rem)] font-black text-[#4a2c17] mb-2 uppercase">
          Welcome to SeaStride!
        </h2>
        <p className="text-[clamp(0.75rem,2.5vw,0.9rem)] text-[#8b5a33] font-bold">
          Every real-world step you take powers your pirate fleet. Let's
          get started!
        </p>
      </div>
    ),
  },
  {
    target: ".tutorial-start-voyage",
    _tab: "menu",
    content: (
      <div className="font-serif">
        <h3 className="text-[clamp(1rem,3.5vw,1.25rem)] font-black text-[#4a2c17] mb-1">
          Start Voyage
        </h3>
        <p className="text-[clamp(0.75rem,2.5vw,0.9rem)] text-[#8b5a33] font-bold">
          Tap here to begin your adventure and enter the game!
        </p>
      </div>
    ),
  },
  // Home
  {
    target: ".tutorial-steps-bar",
    _tab: "home",
    content: (
      <div className="font-serif">
        <h3 className="text-[clamp(1rem,3.5vw,1.25rem)] font-black text-[#4a2c17] mb-1">
          Daily Steps
        </h3>
        <p className="text-[clamp(0.75rem,2.5vw,0.9rem)] text-[#8b5a33] font-bold">
          This is your Home tab. Use it to track your real-world progress.
        </p>
      </div>
    ),
  },
  {
    target: ".tutorial-level",
    _tab: "home",
    content: (
      <div className="font-serif">
        <h3 className="text-[clamp(1rem,3.5vw,1.25rem)] font-black text-[#4a2c17] mb-1">
          Level & XP
        </h3>
        <p className="text-[clamp(0.75rem,2.5vw,0.9rem)] text-[#8b5a33] font-bold">
          Complete quests and walk to earn XP. Leveling up unlocks stronger ships!
        </p>
      </div>
    ),
  },
  {
    target: ".tutorial-stats",
    _tab: "home",
    content: (
      <div className="font-serif">
        <h3 className="text-[clamp(1rem,3.5vw,1.25rem)] font-black text-[#4a2c17] mb-1">
          Daily Stats
        </h3>
        <p className="text-[clamp(0.75rem,2.5vw,0.9rem)] text-[#8b5a33] font-bold">
          Monitor your distance, calories burned, and active time.
        </p>
      </div>
    ),
  },
  {
    target: ".tutorial-booty-safety",
    _tab: "home",
    content: (
      <div className="font-serif">
        <h3 className="text-[clamp(1rem,3.5vw,1.25rem)] font-black text-[#4a2c17] mb-1">
          Today's Booty & Safety
        </h3>
        <p className="text-[clamp(0.75rem,2.5vw,0.9rem)] text-[#8b5a33] font-bold">
          Check your daily gold earnings and step goals here. Keep your shield active!
        </p>
      </div>
    ),
  },
  {
    target: ".tutorial-quests",
    _tab: "home",
    content: (
      <div className="font-serif">
        <h3 className="text-[clamp(1rem,3.5vw,1.25rem)] font-black text-[#4a2c17] mb-1">
          Daily Quests
        </h3>
        <p className="text-[clamp(0.75rem,2.5vw,0.9rem)] text-[#8b5a33] font-bold">
          Hit your step targets to claim XP and rewards here every day.
        </p>
      </div>
    ),
  },
  // Build
  {
    target: ".tutorial-build-nav",
    _tab: "build",
    content: (
      <div className="font-serif">
        <h3 className="text-[clamp(1rem,3.5vw,1.25rem)] font-black text-[#4a2c17] mb-1">
          Ship Build
        </h3>
        <p className="text-[clamp(0.75rem,2.5vw,0.9rem)] text-[#8b5a33] font-bold">
          Welcome to your shipyard. This is where you modify your flagship!
        </p>
      </div>
    ),
  },
  {
    target: ".tutorial-energy-bar",
    _tab: "build",
    content: (
      <div className="font-serif">
        <h3 className="text-[clamp(1rem,3.5vw,1.25rem)] font-black text-[#4a2c17] mb-1">
          Energy
        </h3>
        <p className="text-[clamp(0.75rem,2.5vw,0.9rem)] text-[#8b5a33] font-bold">
          Walking generates Energy. Use it to sail, explore, and battle.
        </p>
      </div>
    ),
  },
  {
    target: ".tutorial-currency",
    _tab: "build",
    content: (
      <div className="font-serif">
        <h3 className="text-[clamp(1rem,3.5vw,1.25rem)] font-black text-[#4a2c17] mb-1">Loot</h3>
        <p className="text-[clamp(0.75rem,2.5vw,0.9rem)] text-[#8b5a33] font-bold">
          Gold Coins and Gems you've collected. Use them to upgrade your fleet.
        </p>
      </div>
    ),
  },
  {
    target: ".tutorial-shop",
    _tab: "build",
    content: (
      <div className="font-serif">
        <h3 className="text-[clamp(1rem,3.5vw,1.25rem)] font-black text-[#4a2c17] mb-1">Shop</h3>
        <p className="text-[clamp(0.75rem,2.5vw,0.9rem)] text-[#8b5a33] font-bold">
          Buy supplies, gems, and special items with your hard-earned gold.
        </p>
      </div>
    ),
  },
  {
    target: ".tutorial-upgrades",
    _tab: "build",
    content: (
      <div className="font-serif">
        <h3 className="text-[clamp(1rem,3.5vw,1.25rem)] font-black text-[#4a2c17] mb-1">
          Upgrades
        </h3>
        <p className="text-[clamp(0.75rem,2.5vw,0.9rem)] text-[#8b5a33] font-bold">
          Improve your ship's cannons, hull, and sails here.
        </p>
      </div>
    ),
  },
  {
    target: ".tutorial-repair",
    _tab: "build",
    content: (
      <div className="font-serif">
        <h3 className="text-[clamp(1rem,3.5vw,1.25rem)] font-black text-[#4a2c17] mb-1">
          Repair
        </h3>
        <p className="text-[clamp(0.75rem,2.5vw,0.9rem)] text-[#8b5a33] font-bold">
          Fix hull damage after battles. You cannot sail if your ship is destroyed!
        </p>
      </div>
    ),
  },
  {
    target: ".tutorial-raids",
    _tab: "build",
    content: (
      <div className="font-serif">
        <h3 className="text-[clamp(1rem,3.5vw,1.25rem)] font-black text-[#4a2c17] mb-1">
          Raids
        </h3>
        <p className="text-[clamp(0.75rem,2.5vw,0.9rem)] text-[#8b5a33] font-bold">
          View your history of battles and loot from other players here.
        </p>
      </div>
    ),
  },
  // Sea
  {
    target: ".tutorial-sea-nav",
    _tab: "sea",
    content: (
      <div className="font-serif">
        <h3 className="text-[clamp(1rem,3.5vw,1.25rem)] font-black text-[#4a2c17] mb-1">
          The Sea
        </h3>
        <p className="text-[clamp(0.75rem,2.5vw,0.9rem)] text-[#8b5a33] font-bold">
          Welcome to the open ocean! Explore and battle here.
        </p>
      </div>
    ),
  },
  {
    target: ".tutorial-sea-view-area",
    _tab: "sea",
    content: (
      <div className="font-serif">
        <h3 className="text-[clamp(1rem,3.5vw,1.25rem)] font-black text-[#4a2c17] mb-1">
          Exploration
        </h3>
        <p className="text-[clamp(0.75rem,2.5vw,0.9rem)] text-[#8b5a33] font-bold">
          Drag to pan the camera. Tap on ships to attack them!
        </p>
      </div>
    ),
  },
  // Fleet
  {
    target: ".tutorial-fleet-nav",
    _tab: "leaderboard",
    content: (
      <div className="font-serif">
        <h3 className="text-[clamp(1rem,3.5vw,1.25rem)] font-black text-[#4a2c17] mb-1">
          Fleet
        </h3>
        <p className="text-[clamp(0.75rem,2.5vw,0.9rem)] text-[#8b5a33] font-bold">
          Check out the global rankings and your weekly performance.
        </p>
      </div>
    ),
  },
  {
    target: ".tutorial-fleet-tabs",
    _tab: "leaderboard",
    content: (
      <div className="font-serif">
        <h3 className="text-[clamp(1rem,3.5vw,1.25rem)] font-black text-[#4a2c17] mb-1">
          Leaderboard Tabs
        </h3>
        <p className="text-[clamp(0.75rem,2.5vw,0.9rem)] text-[#8b5a33] font-bold">
          Switch between Player Level and Coins Earned to see different rankings.
        </p>
      </div>
    ),
  },
  {
    target: ".tutorial-fleet-list",
    _tab: "leaderboard",
    content: (
      <div className="font-serif">
        <h3 className="text-[clamp(1rem,3.5vw,1.25rem)] font-black text-[#4a2c17] mb-1">
          Top Pirates
        </h3>
        <p className="text-[clamp(0.75rem,2.5vw,0.9rem)] text-[#8b5a33] font-bold">
          See who rules the seas! Compete with others to climb the ranks.
        </p>
      </div>
    ),
  },
];

export const TutorialOverlay: React.FC<TutorialProps> = ({
  activeTab,
  setActiveTab,
  forceRunTargetStep,
  onTutorialEnd,
}) => {
  const [run, setRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  // Auto-Trigger on App Load (First-Time User Only)
  useEffect(() => {
    const hasSeen = localStorage.getItem("seastride_has_seen_global_tutorial_v6");
    const isForced = forceRunTargetStep !== undefined && forceRunTargetStep !== null;

    if (!hasSeen || isForced) {
      const targetIndex = isForced ? forceRunTargetStep : 0;
      setStepIndex(targetIndex);
      
      // Ensure we are on the first tab if we are starting fresh, or the target step's tab
      const targetStep = GLOBAL_STEPS[targetIndex];
      if (targetStep && activeTab !== targetStep._tab) {
         setActiveTab(targetStep._tab as any);
      }
      
      // Auto-trigger without long delay
      const delay = isForced ? 400 : 100;
      setTimeout(() => setRun(true), delay);
    }
  }, [forceRunTargetStep]);

  const handleJoyrideCallback = (data: any) => {
    const { action, index, status, type, step } = data;

    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    // Cleanup active styles
    if (type === EVENTS.STEP_AFTER || type === EVENTS.TARGET_NOT_FOUND || finishedStatuses.includes(status as any)) {
      document.querySelectorAll('.tutorial-active-target').forEach(el => {
        el.classList.remove('tutorial-active-target');
        (el as HTMLElement).style.zIndex = '';
      });
    }

    if (type === EVENTS.TOOLTIP || type === EVENTS.STEP_BEFORE) {
       const targetEl = document.querySelector(step.target as string);
       if (targetEl && step.target !== 'body') {
         targetEl.classList.add('tutorial-active-target');
         (targetEl as HTMLElement).style.zIndex = '10001';
         
         if (window.getComputedStyle(targetEl).position === 'static') {
            (targetEl as HTMLElement).style.position = 'relative';
         }
       }
    }

    if (type === EVENTS.STEP_AFTER || type === EVENTS.TARGET_NOT_FOUND) {
      const nextIndex = index + (action === ACTIONS.PREV ? -1 : 1);
      
      if (nextIndex >= 0 && nextIndex < GLOBAL_STEPS.length) {
        const nextStep = GLOBAL_STEPS[nextIndex];
        // If the next step is on a different tab, switch tab first
        if (nextStep._tab !== activeTab) {
          setActiveTab(nextStep._tab as any);
          // Small delay to allow the new tab's DOM to render before Joyride looks for the target
          setTimeout(() => setStepIndex(nextIndex), 100);
        } else {
          setStepIndex(nextIndex);
        }
      } else {
        setStepIndex(nextIndex);
      }
    } else if (finishedStatuses.includes(status as any)) {
      setRun(false);
      localStorage.setItem("seastride_has_seen_global_tutorial_v6", "true");
      if (onTutorialEnd) onTutorialEnd();
    }
  };

  return (
    <Joyride
      steps={GLOBAL_STEPS}
      run={run}
      stepIndex={stepIndex}
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
          marginRight: "10px",
        },
        buttonSkip: {
          color: "#d75448",
          fontWeight: "bold",
        },
        tooltip: {
          width: "clamp(280px, 90vw, 400px)",
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
