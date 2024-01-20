import { convertPGNtoFEN } from "./convertPGNtoFEN";

describe("convertPGNtoFEN", () => {
  it("should convert a PGN to FEN", () => {
    const pgn =
      "1. d4 d5 2. Nf3 Nf6 3. Bf4 c6 4. Bg3 g6 5. c3 Bg7 6. e3 O-O 7. h4 Nbd7";
    const expectedFEN =
      "r1bq1rk1/pp1nppbp/2p2np1/3p4/3P3P/2P1PNB1/PP3PP1/RN1QKB1R w KQ - 1 8";

    const result = convertPGNtoFEN(pgn);

    expect(result).toEqual(expectedFEN);
  });

  it("should handle an empty PGN", () => {
    const pgn = "";

    const result = convertPGNtoFEN(pgn);

    expect(result).toBeUndefined();
  });
});
