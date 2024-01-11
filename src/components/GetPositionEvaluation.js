import { useEffect } from "react";
import { Chess } from "chess.js";

export default function GetPositionEvaluation({ gameData }) {
  let fenPosition;

  // gets the first 15 moves, return it as a pgn
  function getFirst15Moves(pgn) {
    if (gameData) {
      const splitted = pgn.split(" ");
      let first45Elements = splitted.slice(0, 45);
      return first45Elements.join(" ");
    }
  }

  // changes pgn to a fen notation
  if (gameData) {
    const chess = new Chess();
    chess.loadPgn(getFirst15Moves(gameData[7].pgn));
    fenPosition = chess.fen();
    console.log(fenPosition);
  }

  //get the evaluation based on the provided fen position
  useEffect(() => {
    async function getPositionEval() {
      let response = await fetch(
        `https://stockfish.online/api/stockfish.php?fen=${fenPosition}&depth=13&mode=eval`
      );

      let data = await response.json();
      let pattern = /[-+]?\d*\.\d+|\d+/;
      let gameEvaluation = parseFloat(data.data.match(pattern)[0]);
    }
    getPositionEval();
  }, [gameData]);

  return <div></div>;
}
