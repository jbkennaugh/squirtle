import { useState } from "react";
import { stageImages } from "./stages";

const StageBanner = ({ gameNumber, stages, setSelectedStage }) => {
  const [bannedStages, setBannedStages] = useState([]);
  const [isGentleman, setGentleman] = useState(false);

  const handleStageSelection = (stage) => {
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

  const getHeadingText = (gameNumber) => {
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
            {stages.legal.starters.map((stage) => {
              let isBanned = bannedStages.includes(stage);
              let divClasses = isBanned
                ? " bg-red-500"
                : " bg-mpprimary hover:cursor-pointer";
              divClasses += isGentleman
                ? " hover:border-green-500 hover:border-4"
                : " hover:border-mpprimarydark";
              let imgClasses = isBanned ? " opacity-50" : "";
              return (
                <div
                  className={`text-lg m-3 w-1/4 text-center flex flex-col justify-end rounded-md border-2 border-transparent ${divClasses}`}
                  onClick={() => handleStageSelection(stage)}
                  key={stage}
                >
                  <img
                    className={`rounded-sm text-center ${imgClasses}`}
                    src={stageImages[stage]}
                    alt={`${stage}`}
                  ></img>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default StageBanner;
