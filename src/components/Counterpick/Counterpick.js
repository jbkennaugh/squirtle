import counterpicks from "../../data/counterpicks.json";
import backArrow from "../../media/back-arrow.png";

import CharacterSelect from "../CharacterSelect/CharacterSelect";
import { useState, useEffect } from "react";
import StageBanner from "../StageBanner/StageBanner";

const Counterpick = ({
  set,
  gameNumber,
  setActiveDiv,
  setCounterpickDone,
  selectedStage,
  setSelectedStage,
  characters,
  setCharacters,
  previousGameData,
  setPreviousGameData,
}) => {
  const [character1, setCharacter1] = useState();
  const [character2, setCharacter2] = useState();
  const [allCharacters] = useState(Object.keys(counterpicks.characters).sort());
  const [stages] = useState(counterpicks.stages);
  const [charactersChosen, setCharChosen] = useState(false);
  const [player1Name] = useState(set.slots[0].entrant.participants[0].gamerTag);
  const [player2Name] = useState(set.slots[1].entrant.participants[0].gamerTag);

  // prettier-ignore
  useEffect(() => {
    if (character1 && (character1 !== characters.player1[gameNumber - 1])) {
      let tempChars = characters;
      tempChars.player1[gameNumber - 1] = character1;
      setCharacters(tempChars);
    }
    if (character2 && (character2 !== characters.player2[gameNumber - 1])) {
      let tempChars = characters;
      characters.player2[gameNumber - 1] = character2;
      setCharacters(tempChars);
    }
    if (
      (characters.player1[gameNumber - 1] && characters.player2[gameNumber - 1])
    ) {
      setCharChosen(true);
    }
  }, [characters, character1, character2, gameNumber]);

  useEffect(() => {
    if (selectedStage) {
      setPreviousGameData({
        ...previousGameData,
        character1: character1,
        character2: character2,
        stage: selectedStage,
      });
    }
  }, [selectedStage]);

  useEffect(() => {
    if (previousGameData) {
      console.log("previous", previousGameData);
    }
  }, [previousGameData]);

  useEffect(() => {
    if (character1 && character2 && selectedStage) {
      setCounterpickDone(true);
    }
  }, [character1, character2, selectedStage, setCounterpickDone]);

  const handleRunback = () => {
    setCharacter1(previousGameData.character1);
    setCharacter2(previousGameData.character2);
    setSelectedStage(previousGameData.stage);
  };

  return (
    <div>
      <div
        className="back-to-char-select flex absolute items-center cursor-pointer top-7 left-5"
        onClick={
          charactersChosen
            ? () => setCharChosen(false)
            : () => setActiveDiv("streamQueue")
        }
      >
        <img src={backArrow} alt="Back arrow." width="50px"></img>
        <h1 className="text-2xl">Re-select</h1>
      </div>
      <h1 className="text-6xl py-5 mb-2 text-center">{`Game ${gameNumber}`}</h1>
      <div className="container w-4/5 mx-auto">
        {!charactersChosen && (
          <div className="flex flex-col">
            {gameNumber > 1 && (
              <button
                className="mb-4 mx-5 p-4 hover:text-mpsecondary border border-mpprimary hover:bg-mpprimary rounded-lg py-2.5 text-center text-2xl mr-2"
                onClick={handleRunback}
              >
                Run it back?
              </button>
            )}
            <div className="character-select flex flex-wrap items-start">
              <CharacterSelect
                player={1}
                playerName={player1Name}
                character={character1}
                setCharacter={setCharacter1}
                allCharacters={allCharacters}
              ></CharacterSelect>
              <CharacterSelect
                player={2}
                playerName={player2Name}
                character={character2}
                setCharacter={setCharacter2}
                allCharacters={allCharacters}
              ></CharacterSelect>
            </div>
          </div>
        )}
        {charactersChosen &&
          (selectedStage ? (
            <div></div>
          ) : (
            <StageBanner
              gameNumber={gameNumber}
              stages={stages}
              setSelectedStage={setSelectedStage}
            ></StageBanner>
          ))}
      </div>
    </div>
  );
};

export default Counterpick;
