import counterpicks from "../../data/counterpicks.json";
import { useState } from "react";

const CharacterSelect = ({
  player,
  playerName,
  character,
  setCharacter,
  allCharacters,
}) => {
  const [showCharacterModal, setShowCharacterModal] = useState(false);
  const [focusedCharacter, setFocusedCharacter] = useState(null);
  const handleCharacterSelect = (character) => {
    console.log(`Setting player-${player} character: ${character}`);
    setCharacter(character);
    setShowCharacterModal(false);
  };

  return (
    <div className="entrant flex flex-col justify-around px-5">
      <div className="flex items-center justify-center">
        <p className="text-4xl">{playerName}</p>
      </div>
      <div
        name={`player${player}-character`}
        id={`player${player}-character`}
        className="text-2xl mt-2 relative text-mpsecondary bg-mpprimary border-2 border-mpprimarydark rounded-lg cursor-pointer h-20 flex items-center justify-center"
        onClick={() => setShowCharacterModal(true)}
      >
        <h1 className="p-2 text-center">
          {character ? (
            <div className="flex items-center justify-center">
              <div>
                <img
                  className="w-[50px] h-[50px]"
                  src={counterpicks.characters[`${character}`].image}
                  alt={`${character} stock icon.`}
                ></img>
              </div>
              <p className="text-4xl pl-[0.625rem]">{character}</p>
            </div>
          ) : (
            "Select your character"
          )}
        </h1>
      </div>
      {showCharacterModal ? (
        <>
          <div className="fixed top-0 bottom-0 right-0 left-0 z-50 flex flex-col items-center justify-center h-2/3 my-auto">
            <div className="relative mx-16 flex items-center justify-center flex-grow flex-wrap border-8  bg-mpsecondary border-mpprimarydark rounded-lg pb-16">
              {allCharacters.map((characterMap) => {
                let character = characterMap[0];
                return (
                  <div
                    className="cursor-pointer py-1  w-[7.69%] flex items-center justify-center"
                    key={character}
                    value={character}
                    onClick={(e) => {
                      setFocusedCharacter(
                        e.currentTarget.getAttribute("value")
                      );
                    }}
                  >
                    <div
                      className={
                        "rounded-lg p-3 border-2" +
                        (character == focusedCharacter
                          ? " bg-mpprimarydark border-mpprimary"
                          : " hover:bg-mpprimary border-transparent")
                      }
                    >
                      <img
                        className="w-12 h-12"
                        src={characterMap[1].image}
                        alt={`${character} stock icon.`}
                      ></img>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="-mt-16 z-50 flex justify-between w-3/5">
              <div
                className="text-2xl text-mpprimary border-2 border-mpprimary rounded-md py-1 px-4"
                onClick={() => setShowCharacterModal(false)}
              >
                Cancel
              </div>
              <div
                className="text-2xl text-mpsecondary bg-mpprimary border-2 border-mpprimarydark rounded-md py-1 px-4"
                onClick={() => handleCharacterSelect(focusedCharacter)}
              >
                Confirm
              </div>
            </div>
          </div>
          <div
            className="opacity-25 fixed inset-0 z-40 bg-black"
            onClick={() => setShowCharacterModal(false)}
          ></div>
        </>
      ) : null}
    </div>
  );
};

export default CharacterSelect;
