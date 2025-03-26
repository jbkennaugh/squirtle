import { useState } from "react";
import counterpicks from "../../data/counterpicks.json";

const CharacterSelect = ({ player, playerName, character, setCharacter, allCharacters }) => {
  const [showCharacterModal, setShowCharacterModal] = useState(false);
  const [focusedCharacter, setFocusedCharacter] = useState(null);
  const handleCharacterSelect = (character) => {
    setFocusedCharacter(character);
    console.log(`Setting player-${player} character: ${character}`);
    setCharacter(character);
    setShowCharacterModal(false);
  };

  return (
    <div className="entrant flex flex-col justify-around px-5">
      <div className="flex items-center justify-center">
        <p className="lg:text-4xl sm:text-2xl">{playerName}</p>
      </div>
      <div
        name={`player${player}-character`}
        id={`player${player}-character`}
        className="lg:text-2xl sm:text-base mt-2 relative text-mpsecondary bg-mpprimary border-2 border-mpprimarydark rounded-lg cursor-pointer h-20 flex items-center justify-center"
        onClick={() => setShowCharacterModal(true)}
      >
        <h1 className="p-2 text-center w-full sm:text-xl lg:text-3xl">
          {character ? (
            <div className="flex items-center justify-center">
              <div className="lg:w-[12.5%] sm:w-1/3 sm:max-w-[40px]">
                <img src={counterpicks.characters[`${character}`].image} alt={`${character} stock icon.`}></img>
              </div>
              <p className="pl-2">{character}</p>
            </div>
          ) : (
            "Select your character"
          )}
        </h1>
      </div>
      {showCharacterModal && (
        <>
          <div className="fixed top-0 bottom-0 right-0 left-0 z-50 flex flex-col items-center justify-center w-11/12 h-2/3 mx-auto my-auto">
            <div className="relative border-4 bg-mpprimary border-mpprimarydark rounded-lg">
              <div className="flex flex-wrap items-center justify-center flex-grow m-5 bg-mpsecondary rounded-lg">
                {allCharacters.map((characterMap) => {
                  let character = characterMap[0];
                  return (
                    <div
                      className="cursor-pointer p-1  w-[7.69%] h-[14.29%] flex items-center justify-center"
                      key={character}
                      value={character}
                      onClick={(e) => handleCharacterSelect(e.currentTarget.getAttribute("value"))}
                    >
                      <div
                        className={
                          " rounded-lg border-2 w-full h-full" +
                          (character === focusedCharacter
                            ? " bg-mpprimarydark border-mpprimary"
                            : " hover:bg-mpprimary border-transparent")
                        }
                      >
                        <img
                          className="w-full h-full p-1"
                          src={characterMap[1].image}
                          alt={`${character} stock icon.`}
                        ></img>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="z-50 flex justify-end gap-4 mx-10 mb-5 sm:hidden">
                <div
                  className="text-2xl text-mpsecondary border-2 border-mpsecondary rounded-md py-1 px-4"
                  onClick={() => setShowCharacterModal(false)}
                >
                  Cancel
                </div>
                <div
                  className="text-2xl text-mpprimary bg-mpsecondary border-2 border-mpsecondary rounded-md py-1 px-4"
                  onClick={handleCharacterSelect}
                >
                  Confirm
                </div>
              </div>
            </div>
          </div>
          <div
            className="opacity-25 top-0 bottom-0 left-0 right-0 fixed z-40 bg-black"
            onClick={() => setShowCharacterModal(false)}
          ></div>
        </>
      )}
    </div>
  );
};

export default CharacterSelect;
