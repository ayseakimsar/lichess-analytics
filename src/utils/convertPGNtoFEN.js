import { Chess } from "chess.js";

export function convertPGNtoFEN(pgn) {
  if (!pgn) return;
  const chess = new Chess();
  chess.loadPgn(pgn);
  return chess.fen();
}
