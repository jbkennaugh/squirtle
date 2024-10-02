import counterpicks from "../../data/counterpicks.json";
import { useState } from "react";
import ShowCharacterModal from "../../components/CharacterSelectModal/CharacterSelectModal";

import React from "react";

const CharacterSelect = ({
  player,
  playerName,
  currentCharacter,
  setCharacter,
}: {
  player: number;
  playerName: string;
  currentCharacter: string;
  setCharacter: Function;
}) => {
  const [showCharacterModal, setShowCharacterModal] = useState<boolean>(false);
  const [focusedCharacter, setFocusedCharacter] = useState<string>("");
  const handleCharacterSelect = () => {
    console.log(`Setting player-${player} character: ${focusedCharacter}`);
    setCharacter(focusedCharacter);
    setShowCharacterModal(false);
  };
  const currentCharKey =
    currentCharacter as keyof typeof counterpicks.characters;

  return (
    <div className="entrant flex flex-col justify-around px-5">
      <div className="flex items-center justify-center">
        <p className="text-4xl">{playerName}</p>
      </div>
      <div
        id={`player${player}-character`}
        className="text-2xl mt-2 relative text-mpsecondary bg-mpprimary border-2 border-mpprimarydark rounded-lg cursor-pointer h-20 flex items-center justify-center"
        onClick={() => setShowCharacterModal(true)}
      >
        <h1 className="p-2 text-center">
          {currentCharacter ? (
            <div className="flex items-center justify-center">
              <div>
                <img
                  className="w-[50px] h-[50px]"
                  src={counterpicks.characters[currentCharKey].image}
                  alt={`${currentCharacter} stock icon.`}
                ></img>
              </div>
              <p className="text-4xl pl-[0.625rem]">{currentCharacter}</p>
            </div>
          ) : (
            "Select your character"
          )}
        </h1>
      </div>
      {showCharacterModal && (
        <ShowCharacterModal
          focusedCharacter={focusedCharacter}
          setFocusedCharacter={setFocusedCharacter}
          handleCharacterSelect={handleCharacterSelect}
          setShowCharacterModal={setShowCharacterModal}
        />
      )}
    </div>
  );
};

export default CharacterSelect;
