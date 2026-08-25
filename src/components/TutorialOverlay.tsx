import React, { useState, useEffect } from "react";

interface TutorialProps {
  activeTab: string;
  setActiveTab?: (tab: "menu" | "home" | "build" | "sea" | "leaderboard") => void;
  forceRun?: boolean;
  onTutorialEnd?: () => void;
}

const TOUR_STEPS = [
  {
    target: ".tutorial-start-voyage",
    tab: "menu",
    title: "Start Voyage",
    desc: "Tap here to begin your adventure and enter the game!",
  },
  {
    target: ".tutorial-steps-bar",
    tab: "home",
    title: "Daily Steps",
    desc: "This is your Home tab. Use it to track your real-world progress.",
  },
  {
    target: ".tutorial-quests",
    tab: "home",
    title: "Morning Stroll & Quests",
    desc: "Hit your step targets to claim XP and rewards here every day.",
  },
  {
    target: ".tutorial-build-nav",
    tab: "build",
    title: "Ship Build",
    desc: "Welcome to your shipyard. This is where you modify your flagship!",
  },
  {
    target: ".tutorial-repair",
    tab: "build",
    title: "Repair",
    desc: "Fix hull damage after battles. You cannot sail if your ship is destroyed!",
  },
  {
    target: ".tutorial-sea-nav",
    tab: "sea",
    title: "The Sea",
    desc: "Welcome to the open ocean! Explore and battle here.",
  },
  {
    target: ".tutorial-fleet-nav",
    tab: "leaderboard",
    title: "Rank",
    desc: "Compare your progress against other captains worldwide.",
  },
];

export const TutorialOverlay: React.FC<TutorialProps> = ({
  activeTab,
  setActiveTab,
  forceRun,
  onTutorialEnd,
}) => {
  const [isRunning, setIsRunning] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    const hasSeen = localStorage.getItem("seastride_tutorial_complete");
    if ((!hasSeen || hasSeen === "false") && activeTab === "menu") {
      setIsRunning(true);
      setStepIndex(0);
    } else if (forceRun) {
      setIsRunning(true);
      setStepIndex(0);
    }
  }, [forceRun]);

  const currentStep = TOUR_STEPS[stepIndex];

  useEffect(() => {
    if (!isRunning || !currentStep) return;

    if (activeTab !== currentStep.tab && setActiveTab) {
      setActiveTab(currentStep.tab as any);
      return; 
    }

    const updateRect = () => {
      const el = document.querySelector(currentStep.target);
      if (el) {
        setTargetRect(el.getBoundingClientRect());
        
        document.querySelectorAll('.tutorial-active-target').forEach(e => {
          e.classList.remove('tutorial-active-target');
          (e as HTMLElement).style.zIndex = '';
        });

        el.classList.add('tutorial-active-target');
        const compStyle = window.getComputedStyle(el);
        if (compStyle.position === 'static') {
           (el as HTMLElement).style.position = 'relative';
        }
        (el as HTMLElement).style.zIndex = '10001';
      } else {
         // Retry slightly later if not found immediately (due to animations)
         setTimeout(updateRect, 50);
      }
    };

    const timer = setTimeout(updateRect, 100);
    window.addEventListener("resize", updateRect);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateRect);
      document.querySelectorAll('.tutorial-active-target').forEach(el => {
        el.classList.remove('tutorial-active-target');
        (el as HTMLElement).style.zIndex = '';
      });
    };
  }, [isRunning, stepIndex, activeTab, currentStep, setActiveTab]);

  const handleNext = () => {
    if (stepIndex < TOUR_STEPS.length - 1) {
      setStepIndex(prev => prev + 1);
    } else {
      handleEnd();
    }
  };

  const handleBack = () => {
    if (stepIndex > 0) {
      setStepIndex(prev => prev - 1);
    }
  };

  const handleEnd = () => {
    setIsRunning(false);
    localStorage.setItem("seastride_tutorial_complete", "true");
    if (onTutorialEnd) onTutorialEnd();
    
    document.querySelectorAll('.tutorial-active-target').forEach(el => {
        el.classList.remove('tutorial-active-target');
        (el as HTMLElement).style.zIndex = '';
    });
  };

  if (!isRunning || !currentStep) return null;

  return (
    <div className="fixed inset-0 z-[10000] pointer-events-auto flex items-center justify-center">
      {/* Dark backdrop overlay */}
      <div className="absolute inset-0 bg-black/60 transition-opacity" />

      {/* Visual Cue - Bouncing Arrow */}
      {targetRect && (
        <div 
          className="absolute pointer-events-none"
          style={{
            top: targetRect.top,
            left: targetRect.left,
            width: targetRect.width,
            height: targetRect.height,
          }}
        >
          {/* Animated bouncing arrow pointing down at the target */}
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center">
             <div className="text-[#facc15] font-black text-[10px] sm:text-xs uppercase mb-1 drop-shadow-md whitespace-nowrap">Look Here</div>
             <div className="w-0 h-0 border-l-[12px] border-l-transparent border-t-[16px] border-t-[#facc15] border-r-[12px] border-r-transparent filter drop-shadow-md" />
          </div>
        </div>
      )}

      {/* Pop-up Box */}
      {targetRect && (
        <div 
          className="absolute bg-[#f0dec1] border-4 border-[#8b5a33] rounded-2xl shadow-[0_8px_0_#4a2c17] p-4 sm:p-5 w-72 sm:w-80 max-w-[90vw] z-[10002] flex flex-col transition-all duration-300 ease-out"
          style={{
            top: (targetRect.bottom + 20 + 200 > window.innerHeight) 
                  ? Math.max(20, targetRect.top - 220) 
                  : targetRect.bottom + 30,
            left: Math.max(10, Math.min(targetRect.left + (targetRect.width/2) - 144, window.innerWidth - 290))
          }}
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg sm:text-xl font-black text-[#4a2c17] uppercase font-serif">
              {currentStep.title}
            </h3>
            <span className="text-[#8b5a33] font-bold text-xs opacity-70">
              {stepIndex + 1}/{TOUR_STEPS.length}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#8b5a33] font-bold font-serif mb-5 leading-relaxed">
            {currentStep.desc}
          </p>

          <div className="flex justify-between items-center mt-auto font-serif">
            <button 
              onClick={handleEnd}
              className="text-[#d75448] font-bold text-[10px] sm:text-xs uppercase hover:opacity-80 active:scale-95 transition-transform"
            >
              Skip Tutorial
            </button>
            <div className="flex gap-2">
              {stepIndex > 0 && (
                <button 
                  onClick={handleBack}
                  className="text-[#8b5a33] font-bold text-xs sm:text-sm hover:opacity-80 active:scale-95 transition-transform px-2"
                >
                  Back
                </button>
              )}
              <button 
                onClick={handleNext}
                className="bg-[#93bb44] font-black text-white rounded-xl px-4 py-2 border-b-4 border-[#658627] active:border-b-0 active:translate-y-1 hover:brightness-110 transition-all text-xs sm:text-sm uppercase"
              >
                {stepIndex === TOUR_STEPS.length - 1 ? "Finish" : "Next"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

