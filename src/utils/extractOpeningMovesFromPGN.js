export function extractOpeningMovesFromPGN(PGN, numberOfMoves) {
  if (!PGN) return;
  const movesArray = PGN.split(" ");
  const movesInPGN = movesArray.slice(0, numberOfMoves * 3); // it takes first *3 elements, since every move consist of 3 elements "1." "e4" "e5"
  return movesInPGN.join(" ");
}
