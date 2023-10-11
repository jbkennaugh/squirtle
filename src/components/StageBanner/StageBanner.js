import { useEffect, useState } from "react";
import { stageImages } from "./stages";

const StageBanner = ({ gameNumber, stages }) => {
  const [selectedStage, setSelectedStage] = useState();
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
      if (bannedStages.length < 2) {
        setBannedStages(newBannedStages);
      } else {
        setSelectedStage(stage);
      }
    }
    console.log("Selected stage", selectedStage);
  };

  return (
    <div className="stage-bans">
      {stages.allowCounterpicks ? (
        <div>Some shit if counterpicks are enabled in the ruleset.</div>
      ) : (
        <div>
          <h1 className="text-3xl py-5 mb-10 text-center text-[#77CA00]">
            Stages:
          </h1>
          <div className="stage-list flex flex-wrap justify-center">
            {stages.legal.starters.map((stage) => {
              return !bannedStages.includes(stage) ? (
                <div
                  className={
                    "text-lg p-2 m-3 w-1/5 text-center flex flex-col justify-end rounded-md border-2 border-transparent bg-[#77CA00] hover:border-black hover:cursor-pointer"
                  }
                  onClick={() => handleStageSelection(stage)}
                  key={stage}
                >
                  <img
                    className="rounded-sm"
                    src={stageImages[stage]}
                    alt={`${stage} stage.`}
                  ></img>
                  {stage}
                </div>
              ) : (
                <div
                  className={
                    "text-lg p-2 m-3 w-1/5 text-center flex flex-col justify-end rounded-md border-2 border-transparent bg-gray-500"
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
                  {stage}
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
