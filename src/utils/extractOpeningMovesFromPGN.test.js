import { extractOpeningMovesFromPGN } from "./extractOpeningMovesFromPGN";

describe("Extract opening moves from PGN", () => {
  it("should extract the specified number of opening moves from PGN", () => {
    const PGN =
      "1. d4 d5 2. Nf3 Nf6 3. Bf4 c6 4. Bg3 g6 5. c3 Bg7 6. e3 O-O 7. h4 Nbd7 8. Bd3 Ne4 9. Bh2 Re8 10. Qc2 e5 11. dxe5 Nxe5 12. Bxe5 Bxe5 13. Nbd2 Bf5 14. Nxe4 dxe4 15. Be2 exf3 16. gxf3 0-1";
    const numberOfMoves = 7;

    const result = extractOpeningMovesFromPGN(PGN, numberOfMoves);

    expect(result).toBe(
      "1. d4 d5 2. Nf3 Nf6 3. Bf4 c6 4. Bg3 g6 5. c3 Bg7 6. e3 O-O 7. h4 Nbd7"
    );
  });

  it("should handle a PGN with fewer moves than specified", () => {
    const PGN = "1. d4 d5 2. Nf3 Nf6 3. Bf4 c6 4. Bg3 g6 5. c3 Bg7 6. e3 O-O";
    const numberOfMoves = 12;
    const result = extractOpeningMovesFromPGN(PGN, numberOfMoves);
    expect(result).toBe(
      "1. d4 d5 2. Nf3 Nf6 3. Bf4 c6 4. Bg3 g6 5. c3 Bg7 6. e3 O-O"
    );
  });

  it("should handle an empty PGN", () => {
    const PGN = "";
    const numberOfMoves = 6;
    const result = extractOpeningMovesFromPGN(PGN, numberOfMoves);
    expect(result).toBeUndefined();
  });
});
