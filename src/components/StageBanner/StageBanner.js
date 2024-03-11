import { useState } from "react";
import { stageImages } from "./stages";

const StageBanner = ({ gameNumber, stages, setSelectedStage }) => {
  const [bannedStages, setBannedStages] = useState([]);

  const handleStageSelection = (stage) => {
    const newBannedStages = [...bannedStages, stage];
    if (gameNumber === 1) {
      if (bannedStages.length < 7) {
        setBannedStages(newBannedStages);
      } else {
        setSelectedStage(stage);
      }
    } else {
      if (bannedStages.length <= 2) {
        setBannedStages(newBannedStages);
      } else {
        setSelectedStage(stage);
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
          <button
            className="mb-4 mx-5 p-4 hover:text-mpsecondary border border-mpprimary hover:bg-mpprimary rounded-lg py-2.5 text-center text-2xl w-1/2"
            onClick={handleResetBans}
          >
            Reset bans
          </button>
          <div className="stage-list flex flex-wrap justify-center  text-mpsecondary">
            {stages.legal.starters.map((stage) => {
              return !bannedStages.includes(stage) ? (
                <div
                  className={
                    "text-lg m-3 w-1/4 text-center flex flex-col justify-end rounded-md border-2 border-transparent bg-mpprimary hover:border-mpprimarydark hover:cursor-pointer"
                  }
                  onClick={() => handleStageSelection(stage)}
                  key={stage}
                >
                  <img
                    className="rounded-sm text-center"
                    src={stageImages[stage]}
                    alt={`${stage}`}
                  ></img>
                </div>
              ) : (
                <div
                  className={
                    "text-lg m-3 w-1/4 text-center flex flex-col justify-end rounded-md border-2 border-transparent bg-gray-500"
                  }
                  key={stage}
                >
                  <div className="bg-red-500">
                    <img
                      className="rounded-sm opacity-50"
                      src={stageImages[stage]}
                      alt={`${stage} stage.`}
                    ></img>
                  </div>
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
