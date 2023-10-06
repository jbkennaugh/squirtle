import { useState } from "react";
import counterpicks from "../../data/counterpicks.json";

const CounterPick = ({ set }) => {
  const [character1, setCharacter1] = useState();
  const [character2, setCharacter2] = useState();
  const [charactersChosen, setChosen] = useState(false);

  const allCharacters = counterpicks.characters;

  const characterSelectDropdown = (player) => {
    return allCharacters.map((character) => {
      return (
        <li
          className="dropdown-item"
          onClick={() => handleCharacterSelect(player, character)}
        >
          {character}
        </li>
      );
    });
  };

  const handleCharacterSelect = (player, character) => {
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
    <div className="container w-2/3 mx-auto">
      {!charactersChosen && (
        <div className="character-select flex justify-around">
          <div className="entrant text-[#77CA00]">
            <p className="text-2xl">{set.slots[0].entrant.name}</p>
            <ul>
              Select your character:
              {characterSelectDropdown(1)}
            </ul>
          </div>
          <div className="entrant text-[#77CA00]">
            <p className="text-2xl">{set.slots[1].entrant?.name}</p>
            <ul>
              Select your character:
              {characterSelectDropdown(2)}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default CounterPick;
