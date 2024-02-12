import { useState, useEffect } from "react";
import { fetchEvaluations } from "../utils/fetchEvaluations";
import { processEvaluations } from "../utils/processEvaluations";

export default function OpeningEvaluation({ gameData, username }) {
  const [openingEvaluationArray, setOpeningEvaluationArray] = useState([]);

  useEffect(() => {
    if (!gameData) return;
    fetchEvaluations(gameData, setOpeningEvaluationArray);
  }, [gameData]);

  const { openingEvalAsWhite, openingEvalAsBlack, openingEvalOverall } =
    processEvaluations(openingEvaluationArray, username);

  return (
    <div>
      <p>
        Your overall average score after the first 7 moves of a game{" "}
        {openingEvalOverall}
      </p>
      <p>With the white pieces {openingEvalAsWhite}</p>
      <p>With the black pieces {openingEvalAsBlack}</p>
      <div>
        Your popular openings
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </div>
    </div>
  );
}
