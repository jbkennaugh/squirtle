import counterpicks from "../../data/counterpicks.json";

import type { Character } from "../../types";
import React from "react";

const CharacterSelectModal = ({
  focusedCharacter,
  handleCharacterSelect,
  setFocusedCharacter,
  setShowCharacterModal,
}: {
  focusedCharacter: string;
  handleCharacterSelect: Function;
  setFocusedCharacter: Function;
  setShowCharacterModal: Function;
}) => {
  const allCharacters: Character[] = Object.entries(counterpicks.characters)
    .sort((a, b) => {
      return a[1].order - b[1].order;
    })
    .map((char) => {
      return {
        name: char[0],
        id: char[1].id,
        order: char[1].order,
        image: char[1].image,
      };
    });

  return (
    <>
      <div className="fixed top-0 bottom-0 right-0 left-0 z-50 flex flex-col items-center justify-center w-11/12 h-2/3 mx-auto my-auto">
        <div className="relative border-8 bg-mpprimary border-mpprimarydark rounded-lg">
          <div className="flex flex-wrap items-center justify-center flex-grow m-5 bg-mpsecondary rounded-lg">
            {allCharacters.map((character) => {
              let name: string = character.name;
              return (
                <div
                  className="cursor-pointer p-1  w-[7.69%] h-[14.29%] flex items-center justify-center"
                  key={name}
                  onClick={() => {
                    console.log(name);
                    setFocusedCharacter(name);
                  }}
                >
                  <div
                    className={
                      " rounded-lg border-2 w-full h-full" +
                      (name === focusedCharacter
                        ? " bg-mpprimarydark border-mpprimary"
                        : " hover:bg-mpprimary border-transparent")
                    }
                  >
                    <img
                      className="w-full h-full p-1"
                      src={character.image}
                      alt={`${name} stock icon.`}
                    ></img>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="z-50 flex justify-between mx-10 mb-3">
            <div
              className="text-2xl text-mpsecondary border-2 border-mpsecondary rounded-md py-1 px-4"
              onClick={() => setShowCharacterModal(false)}
            >
              Cancel
            </div>
            <div
              className="text-2xl text-mpprimary bg-mpsecondary border-2 border-mpsecondary rounded-md py-1 px-4"
              onClick={() => handleCharacterSelect()}
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
  );
};

export default CharacterSelectModal;
