import "./style.css";
import counterpicks from "../../data/counterpicks.json";
import backArrow from "./images/back-arrow.png";

import CharacterSelect from "../CharacterSelect/CharacterSelect";
import { useState, useEffect } from "react";
import StageBanner from "../StageBanner/StageBanner";

const Counterpick = ({ set, setActiveDiv }) => {
  const [character1, setCharacter1] = useState();
  const [character2, setCharacter2] = useState();
  const [gameNumber, setGameNumber] = useState(1);
  const [allCharacters] = useState(Object.keys(counterpicks.characters).sort());
  const [stages] = useState(counterpicks.stages);
  const [charactersChosen, setCharChosen] = useState(false);
  const [characters, setCharacters] = useState({
    player1: [],
    player2: [],
  });

  const [player1Name] = useState(set.slots[0].entrant.participants[0].gamerTag);
  const [player2Name] = useState(set.slots[1].entrant.participants[0].gamerTag);

  useEffect(() => {
    if (character1) {
      console.log(
        "Setting player-1 character to %d for game %d",
        character1,
        gameNumber
      );
      let tempChars = characters;
      tempChars.player1[gameNumber - 1] = character1;
      setCharacters(tempChars);
    }
    if (character2) {
      console.log(
        "Setting player-2 character to %d for game %d",
        character2,
        gameNumber
      );
      let tempChars = characters;
      characters.player2[gameNumber - 1] = character2;
      setCharacters(tempChars);
    }
    // prettier-ignore
    if (
      (characters.player1[gameNumber - 1] && characters.player2[gameNumber - 1])
    ) {
      setCharChosen(true);
    }
  }, [characters, character1, character2, gameNumber]);

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
        {!charactersChosen ? (
          <div className="character-select flex items-start">
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
        ) : (
          <StageBanner
            gameNumber={gameNumber}
            setGameNumber={setGameNumber}
            stages={stages}
          ></StageBanner>
        )}
      </div>
    </div>
  );
};

export default Counterpick;
