# Counterpick and Bracket Updating widget

An app that allows players to select their characters and stage counterpicks, i.e. when playing their stream match, and using start.gg API it will update their set in the bracket with the selected characters, stages and scores.

# How set data is stored

Information pushed to setData should be an object with all the data about a set, in the format:

```json
    {
     setId: someInt,
     winnerId: "setWinningPlayerId",
     // ordered array from game 1 onwards with info of each game
     "gameData": [
        {
          "winnerId": "setWinnersID",
          "gameNum": 1,
          "stageId": 3,
          "selections": [
            {
              "entrantId": player1ID,
              "characterId": player2CharacterIDGame1
            },
            {
              "entrantId": player2ID,
              "characterId": player2CharacterIDGame1
            }
          ]
        },
        {
          "winnerId": 14259653,
          "gameNum": 2,
          "entrant1Score": 0,
          "entrant2Score": 3,
          "selections": [
            {
              "entrantId": player1ID,
              "characterId": player2CharacterIDGame2
            },
            {
              "entrantId": player2ID,
              "characterId": player2CharacterIDGame2
            }
          ]
        }
      ],
    }
```

tap characters and it picks them
