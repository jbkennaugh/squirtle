import { useState } from "react";
import React from "react";
import Stage from "./Stage";

const StageBanner = ({
  gameNumber,
  stages,
  setSelectedStage,
}: {
  gameNumber: number;
  stages: any;
  setSelectedStage: Function;
}) => {
  const [bannedStages, setBannedStages] = useState<string[]>([]);
  const [isGentleman, setGentleman] = useState(false);

  const handleStageSelection = (stage: string) => {
    if (bannedStages.includes(stage)) {
      console.log("Stage is already banned, no action");
    } else {
      if (isGentleman) {
        setSelectedStage(stage);
        setGentleman(false);
      } else {
        const newBannedStages = [...bannedStages, stage];
        if (gameNumber === 1) {
          if (bannedStages.length < 7) {
            setBannedStages(newBannedStages);
          } else {
            setSelectedStage(stage);
            setGentleman(false);
          }
        } else {
          if (bannedStages.length <= 2) {
            setBannedStages(newBannedStages);
          } else {
            setSelectedStage(stage);
            setGentleman(false);
          }
        }
      }
    }
  };

  const getHeadingText = (gameNumber: number) => {
    let stageBanText;
    if (gameNumber === 1) {
      if (bannedStages.length === 7) {
        stageBanText = "Finally, winner of RPS select your stage.";
      } else if (bannedStages.length >= 3) {
        stageBanText = "Now, loser of RPS ban 4 stages...";
      } else {
        stageBanText = "First, winner of RPS ban 3 stages...";
      }
    } else {
      if (bannedStages.length === 3) {
        stageBanText = "Now, loser of the last game, select your stage.";
      } else {
        stageBanText = "Winner of the last game, ban 3 stages...";
      }
    }
    return stageBanText;
  };

  const handleResetBans = () => {
    setBannedStages([]);
  };

  return (
    <div className="stage-bans">
      {stages.allowCounterpicks ? (
        <div>Some shit if counterpicks are enabled in the ruleset.</div>
      ) : (
        <div className="flex flex-col items-center">
          <h1 className="text-3xl text-white pb-5 mb-5 text-center">
            {getHeadingText(gameNumber)}
          </h1>
          <div className="flex">
            <button
              className="mb-4 mx-5 p-4 border border-mpprimary rounded-lg py-2.5 text-center text-2xl w-2/3"
              onClick={handleResetBans}
            >
              Reset bans
            </button>
            <button
              className={`mb-4 mx-5 p-4 border-4 bg-mpprimary rounded-lg py-2.5 text-center text-2xl ${
                isGentleman
                  ? "text-green-700 border-green-700"
                  : "text-red-700 border-red-700"
              }`}
              onClick={() => setGentleman(!isGentleman)}
            >
              {isGentleman ? "Gentleman On" : "Gentleman Off"}
            </button>
          </div>

          <div className="flex flex-wrap justify-center text-mpsecondary">
            {stages.legal.starters.map((stage: string) => (
              <Stage
                bannedStages={bannedStages}
                isGentleman={isGentleman}
                handleStageSelection={handleStageSelection}
                stage={stage}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StageBanner;
