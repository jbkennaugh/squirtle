import { useState, useEffect } from "react";
import counterpicks from "../../data/counterpicks.json";
import backArrow from "./back-arrow.png";

const CounterPick = ({ set }) => {
  const [character1, setCharacter1] = useState();
  const [character2, setCharacter2] = useState();
  const [charactersChosen, setChosen] = useState(false);

  const allCharacters = counterpicks.characters;

  const characterSelectDropdown = allCharacters.map((character) => {
    return (
      <option className="dropdown-item" value={character}>
        {character}
      </option>
    );
  });

  useEffect(() => {
    if (character1 && character2) {
      setChosen(true);
    }
  }, [character1, character2]);

  const handleCharacterSelect = (player, character) => {
    console.log(`Setting player-${player} character: ${character}`);
    switch (player) {
      case 1:
        setCharacter1(character);
        break;
      case 2:
        setCharacter2(character);
        break;
      default:
        console.log("Player select error.");
        break;
    }
  };

  return (
    <div>
      {charactersChosen && (
        <div
          className="back-to-char-select flex absolute items-center cursor-pointer top-7 left-5"
          onClick={() => setChosen(false)}
        >
          <img src={backArrow} alt="Back arrow." width="50px"></img>
          <h1 className="text-2xl text-[#77CA00]">Re-select</h1>
        </div>
      )}
      <div className="container w-2/3 mx-auto">
        {!charactersChosen && (
          <div className="character-select flex justify-around">
            <div className="entrant text-[#77CA00]">
              <p className="text-2xl">{set.slots[0].entrant.name}</p>
              <select
                name="player1-character"
                id="player1-character"
                className="text-black mt-2"
                onChange={(e) => {
                  handleCharacterSelect(1, e.target.value);
                }}
                defaultValue={character1}
              >
                Select your character:
                {characterSelectDropdown}
              </select>
            </div>
            <div className="entrant text-[#77CA00]">
              <p className="text-2xl">{set.slots[1].entrant?.name}</p>
              <select
                name="player1-character"
                id="player1-character"
                className="text-black mt-2"
                onChange={(e) => {
                  handleCharacterSelect(2, e.target.value);
                }}
                defaultValue={character2}
              >
                Select your character:
                {characterSelectDropdown}
              </select>
            </div>
          </div>
        )}
        {charactersChosen && (
          <div className="text-white">Characters Chosen</div>
        )}
      </div>
    </div>
  );
};

export default CounterPick;
