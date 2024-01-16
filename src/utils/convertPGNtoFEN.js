import { Chess } from "chess.js";

export function convertPGNtoFEN(pgn) {
  const chess = new Chess();
  chess.loadPgn(pgn);
  return chess.fen();
}
