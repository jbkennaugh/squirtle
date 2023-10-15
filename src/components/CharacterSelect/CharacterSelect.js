import "./style.css";

import counterpicks from "../../data/counterpicks.json";
import cross from "./images/cross.png";
import tick from "./images/tick.png";

const CharacterSelect = ({
  player,
  playerName,
  character,
  setCharacter,
  allCharacters,
}) => {
  const handleCharacterSelect = (character) => {
    console.log(`Setting player-${player} character: ${character}`);
    setCharacter(character);
  };

  return (
    <div className="entrant flex flex-col justify-around px-5">
      <div className="flex items-center">
        <p className="text-3xl">{playerName}</p>
        <img
          className={
            "ml-5 w-[50px] border" +
            (character ? " border-[rgb(0,100,0)]" : " border-[rgb(170,0,0)]")
          }
          src={character ? tick : cross}
          alt="Tick or cross if player 1's character is selected."
        ></img>
      </div>
      <div
        name={`player${player}-character`}
        id={`player${player}-character`}
        className="text-2xl mt-2 relative inline-block overflow-y-auto text-mpsecondary bg-mpprimary border-2 border-green-950 rounded-lg"
      >
        <h1 className="p-2">
          {character ? (
            <div className="flex items-center">
              <div>
                <img
                  className="w-[30px] h-[30px]"
                  src={counterpicks.characters[`${character}`].image}
                  alt={`${character} stock icon.`}
                ></img>
              </div>
              <p className="text-3xl pl-[0.625rem]">{character}</p>
            </div>
          ) : (
            "Select your character:"
          )}
        </h1>
        {allCharacters.map((character) => {
          return (
            <div
              className={`dropdown-item-${player} cursor-pointer py-1 bg-green-900 text-mpprimary hover:bg-mpprimary hover:text-mpsecondary`}
              key={character}
              value={character}
              onClick={(e) => {
                handleCharacterSelect(e.currentTarget.getAttribute("value"));
              }}
            >
              <div className="w-1/5 flex justify-end pr-[0.625rem]">
                <img
                  className="w-[30px] h-[30px]"
                  src={counterpicks.characters[`${character}`].image}
                  alt={`${character} stock icon.`}
                ></img>
              </div>
              <p className="text-3xl pl-[0.625rem]">{character}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CharacterSelect;
