import { extractOpeningMovesFromPGN } from "./extractOpeningMovesFromPGN";
import { convertPGNtoFEN } from "./convertPGNtoFEN";
import { fetchPositionEvaluationByFEN } from "./fetchPositionEvaluationByFEN";

export async function fetchEvaluations(gameData, setOpeningEvaluationArray) {
  const results = [];
  try {
    for (const game of gameData) {
      const PGNofFirst7Moves = extractOpeningMovesFromPGN(game.pgn, 7);
      const FENOfFirst7Moves = convertPGNtoFEN(PGNofFirst7Moves);
      const evaluation = await fetchPositionEvaluationByFEN(FENOfFirst7Moves);

      if (evaluation !== undefined) {
        results.push({
          whitePlayer: game.whitePlayer,
          eco: game.eco,
          opening: game.opening,
          openingEval: evaluation.pvs[0].cp / 100,
          result: game.result,
          fen: FENOfFirst7Moves,
        });
      }
    }
    setOpeningEvaluationArray(results);
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}
