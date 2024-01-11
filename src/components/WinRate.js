import React, { useState, useEffect } from "react";

export default function WinRate({ username, gameData }) {
  const [numberOfGamesPlayedAsWhite, setNumberOfGamesPlayedAsWhite] =
    useState(0);
  const [numberOfGamesPlayedAsBlack, setNumberOfGamesPlayedAsBlack] =
    useState(0);
  const [numberOfGamesWinAsWhite, setNumberOfGamesWinAsWhite] = useState(0);
  const [numberOfGamesWinAsBlack, setNumberOfGamesWinAsBlack] = useState(0);

  useEffect(() => {
    if (!gameData) return;

    let whiteGamesPlayed = 0;
    let blackGamesPlayed = 0;
    let whiteWins = 0;
    let blackWins = 0;

    for (const game of gameData) {
      if (game.whitePlayer === username) {
        whiteGamesPlayed += 1;
        if (game.result === "1-0") {
          whiteWins += 1;
        }
      }
      if (game.blackPlayer === username) {
        blackGamesPlayed += 1;
        if (game.result === "0-1") {
          blackWins += 1;
        }
      }
    }

    setNumberOfGamesPlayedAsWhite(whiteGamesPlayed);
    setNumberOfGamesPlayedAsBlack(blackGamesPlayed);
    setNumberOfGamesWinAsWhite(whiteWins);
    setNumberOfGamesWinAsBlack(blackWins);

    console.log(gameData);
  }, [gameData]);

  console.log(
    numberOfGamesPlayedAsWhite,
    numberOfGamesWinAsWhite,
    numberOfGamesPlayedAsBlack,
    numberOfGamesWinAsBlack
  );

  return (
    <div>
      <p>
        Overall win rate:{" "}
        {Math.round(
          ((numberOfGamesWinAsWhite + numberOfGamesWinAsBlack) /
            (numberOfGamesPlayedAsWhite + numberOfGamesPlayedAsBlack)) *
            100
        )}
        %
      </p>
      <p>
        Win rate as white:{" "}
        {Math.round(
          (numberOfGamesWinAsWhite / numberOfGamesPlayedAsWhite) * 100
        )}
        %
      </p>
      <p>
        Win rate as black:{" "}
        {Math.round(
          (numberOfGamesWinAsBlack / numberOfGamesPlayedAsBlack) * 100
        )}
        %
      </p>
    </div>
  );
}
