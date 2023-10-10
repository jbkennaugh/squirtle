import "./style.css";
import backArrow from "./images/back-arrow.png";

import CharacterSelect from "../CharacterSelect/CharacterSelect";
import { useState, useEffect } from "react";

const CounterPick = ({ set, setActiveDiv }) => {
  const [character1, setCharacter1] = useState();
  const [character2, setCharacter2] = useState();
  const [charactersChosen, setCharChosen] = useState(false);

  const player1Name = set.slots[0].entrant.participants[0].gamerTag;
  const player2Name = set.slots[1].entrant.participants[0].gamerTag;

  useEffect(() => {
    if (character1 && character2) {
      setCharChosen(true);
    }
  }, [character1, character2]);

  return (
    <div>
      <h1 className="text-6xl py-5 mb-10 text-center text-[#77CA00]">{`${player1Name} vs ${player2Name}`}</h1>
      <div
        className="back-to-char-select flex absolute items-center cursor-pointer top-7 left-5"
        onClick={
          charactersChosen
            ? () => setCharChosen(false)
            : () => setActiveDiv("streamQueue")
        }
      >
        <img src={backArrow} alt="Back arrow." width="50px"></img>
        <h1 className="text-2xl text-[#77CA00]">Re-select</h1>
      </div>
      <div className="container w-2/3 mx-auto">
        {charactersChosen ? (
          <div className="text-white">
            Characters Chosen logic to go here probably do stage bans next
          </div>
        ) : (
          <div className="character-select flex items-start">
            <CharacterSelect
              player={1}
              playerName={player1Name}
              character={character1}
              setCharacter={setCharacter1}
            ></CharacterSelect>
            <CharacterSelect
              player={2}
              playerName={player2Name}
              character={character2}
              setCharacter={setCharacter2}
            ></CharacterSelect>
          </div>
        )}
      </div>
    </div>
  );
};

export default CounterPick;
