import { Chess } from "chess.js";
import { useState, useEffect } from "react";

export default function OpeningEvaluation({
  gameData,
  setOpeningEvaluationArray,
  openingEvaluationArray,
  username,
}) {
  function extractFirst15MovesFromPGN(pgn) {
    const movesArray = pgn.split(" ");
    const first15Moves = movesArray.slice(0, 45); // it takes first 45 elements, since every move consist of 3 elements "1." "e4" "e5"
    return first15Moves.join(" ");
  }

  function convertPGNtoFen(pgn) {
    const chess = new Chess();
    chess.loadPgn(pgn);
    return chess.fen();
  }

  async function fetchPositionEvaluationByFEN(fen) {
    let response = await fetch(
      `https://stockfish.online/api/stockfish.php?fen=${fen}&depth=13&mode=eval`
    );
    let data = await response.json();
    let pattern = /[-+]?\d*\.\d+|\d+/;
    let match = data.data.match(pattern);
    let gameEvaluation = match ? parseFloat(match[0]) : 0;
    return gameEvaluation;
  }

  useEffect(() => {
    let results = [];
    const fetchEvaluations = async () => {
      if (gameData) {
        for (const game of gameData) {
          const PGNofFirst15Moves = extractFirst15MovesFromPGN(game.pgn);
          const FENOfFirst15Moves = convertPGNtoFen(PGNofFirst15Moves);
          const evaluation = await fetchPositionEvaluationByFEN(
            FENOfFirst15Moves
          );
          results.push({
            whitePlayer: game.whitePlayer,
            eco: game.eco,
            opening: game.opening,
            openingEval: evaluation,
            result: game.result,
          });
        }

        setOpeningEvaluationArray(results);
      }
    };

    fetchEvaluations();
  }, [gameData]);

  let openingEvalOfGamesPlayedAsWhite = [];
  let openingEvalOfGamesPlayedAsBlack = [];
  let openingEvalOverall = [];
  openingEvaluationArray.map((openingObject) => {
    if (openingObject.whitePlayer == username) {
      if (openingObject.openingEval !== 0) {
        openingEvalOfGamesPlayedAsWhite.push(openingObject.openingEval);
        openingEvalOverall.push(openingObject.openingEval);
      }
    } else {
      if (openingObject.openingEval !== 0) {
        openingEvalOfGamesPlayedAsBlack.push(openingObject.openingEval);
        openingEvalOverall.push(openingObject.openingEval);
      }
    }
  });
  console.log("white", openingEvalOfGamesPlayedAsWhite);
  console.log("black", openingEvalOfGamesPlayedAsBlack);
  const sumOfEvalsOfWhite = openingEvalOfGamesPlayedAsWhite.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  const sumOfEvalsOfBlack = openingEvalOfGamesPlayedAsBlack.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  const sumOfEvals = openingEvalOverall.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  console.log("overall eval", sumOfEvals / openingEvalOverall.length);

  console.log(
    sumOfEvalsOfWhite / openingEvalOfGamesPlayedAsWhite.length,
    sumOfEvalsOfBlack / openingEvalOfGamesPlayedAsBlack.length
  );

  return <div></div>;
}
