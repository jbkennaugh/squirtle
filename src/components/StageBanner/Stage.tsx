import React, { useState } from "react";
import { stageImages } from "./stages";

const Stage = ({
  bannedStages,
  handleStageSelection,
  isGentleman,
  stage,
}: {
  bannedStages: string[];
  handleStageSelection: Function;
  isGentleman: boolean;
  stage: string;
}) => {
  let [isLoading, setLoading] = useState<boolean>(true);
  let isBanned = bannedStages.includes(stage);
  let divClasses = isBanned
    ? " bg-red-500"
    : " bg-mpprimary hover:cursor-pointer";
  divClasses += isGentleman
    ? " hover:border-green-500 hover:border-4"
    : " hover:border-mpprimarydark";
  divClasses += isLoading ? " animate-pulse bg-slate-500" : null;
  let imgClasses = isLoading ? " hidden" : isBanned ? " opacity-50" : "";
  return (
    <div
      className={`text-lg m-3 w-1/4 text-center flex flex-col justify-end rounded-md border-2 border-transparent${divClasses}`}
      onClick={() => handleStageSelection(stage)}
      key={stage}
    >
      <img
        className={`rounded-sm text-center${imgClasses}`}
        src={stageImages[stage as keyof typeof stageImages]}
        onLoad={() => setLoading(false)}
        alt={`${stage}`}
      ></img>
    </div>
  );
};

export default Stage;
