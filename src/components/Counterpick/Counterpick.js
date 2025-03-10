import counterpicks from "../../data/counterpicks.json";
import CharacterSelect from "../CharacterSelect/CharacterSelect";
import * as queries from "../../util/queries";
import StageBanner from "../StageBanner/StageBanner";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Counterpick = ({
  set,
  gameNumber,
  setCounterpickDone,
  selectedStage,
  setSelectedStage,
  characters,
  setCharacters,
  previousGameData,
  setPreviousGameData,
  bestOf,
  setBestOf,
}) => {
  const navigate = useNavigate();
  const [character1, setCharacter1] = useState();
  const [character2, setCharacter2] = useState();
  const [stages] = useState(counterpicks.stages);
  const [charactersChosen, setCharChosen] = useState(false);
  const [player1Name] = useState(set.slots[0].entrant.participants[0].gamerTag);
  const [player2Name] = useState(set.slots[1].entrant.participants[0].gamerTag);
  const allCharacters = Object.entries(counterpicks.characters).sort((a, b) => {
    return a[1].order - b[1].order;
  });

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

  const handleBackButton = () => {
    if (charactersChosen) {
      setCharChosen(false);
    } else {
      queries.resetSet(set.id).then((res) => console.log(res));
      navigate("/streamQueue");
    }
  };

  const handleResetCharacters = () => {
    setCharacter1(null);
    setCharacter2(null);
    let tempChars = characters;
    tempChars.player1[gameNumber - 1] = null;
    tempChars.player2[gameNumber - 1] = null;
    setCharacters(tempChars);
  };

  const handleRunback = () => {
    setCharacter1(previousGameData.character1);
    setCharacter2(previousGameData.character2);
    setSelectedStage(previousGameData.stage);
  };

  const handleSameCharacters = () => {
    setCharacter1(previousGameData.character1);
    setCharacter2(previousGameData.character2);
  };

  const handleCharacterSelect = () => {
    if (
      characters.player1[gameNumber - 1] &&
      characters.player2[gameNumber - 1]
    ) {
      setCharChosen(true);
    }
  };

  return (
    <div>
      <div
        className="flex absolute items-center cursor-pointer top-7 left-5"
        onClick={handleBackButton}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 25 25"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
      </div>
      <div className="container top-96 mx-auto">
        {!charactersChosen && (
          <>
            <h1 className="lg:text-5xl sm:text-3xl py-5 mt-20 mb-2 text-center">{`Game ${gameNumber}`}</h1>
            <div className="flex flex-col">
              {gameNumber > 1 && (
                <div className="flex justify-center">
                  <button
                    className="mb-4 mx-5 p-4 text-mpsecondary border border-mpprimary bg-mpprimary rounded-lg py-2.5 text-center lg:text-2xl sm:text-lg w-1/3"
                    onClick={handleRunback}
                  >
                    Full runback
                  </button>
                  <button
                    className="mb-4 mx-5 p-4 text-mpsecondary border border-mpprimary bg-mpprimary rounded-lg py-2.5 text-center lg:text-2xl sm:text-lg w-1/3"
                    onClick={handleSameCharacters}
                  >
                    Same Characters
                  </button>
                </div>
              )}
              <div className="flex justify-center">
                <button
                  className="mb-4 mx-5 p-4 border border-mpprimary rounded-lg py-2.5 text-center lg:text-2xl sm:text-lg w-1/3"
                  onClick={handleResetCharacters}
                >
                  Reset picks
                </button>
                <button
                  className="mb-4 mx-5 p-4 text-mpsecondary border border-mpprimary bg-mpprimary rounded-lg py-2.5 text-center lg:text-2xl sm:text-lg w-1/3"
                  onClick={handleCharacterSelect}
                >
                  Confirm
                </button>
              </div>
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
            <div className="flex flex-col absolute items-center cursor-pointer bottom-12 left-5 w-2/5 text-2xl">
              <h1 className="pb-1">Set best of:</h1>
              <div className="flex justify-around w-full">
                {[3, 5].map((bestOfOption) => {
                  return (
                    <button
                      className={`rounded-lg text-center p-2 w-2/5 ${
                        bestOf === bestOfOption
                          ? "text-mpsecondary bg-mpprimary"
                          : "text-mpprimary  border-mpprimary border"
                      }`}
                      onClick={() => setBestOf(bestOfOption)}
                    >
                      {bestOfOption}
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}
        {charactersChosen && (
          <StageBanner
            gameNumber={gameNumber}
            stages={stages}
            setSelectedStage={setSelectedStage}
          ></StageBanner>
        )}
      </div>
    </div>
  );
};

export default Counterpick;
