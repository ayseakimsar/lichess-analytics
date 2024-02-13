import { useState, useEffect } from "react";
import { fetchEvaluations } from "../utils/fetchEvaluations";
import { processEvaluations } from "../utils/processEvaluations";
import { getMostPlayedOpenings } from "../utils/getMostPlayedOpenings";
import { dummy_data } from "../dummy_data";

export default function OpeningEvaluation({ gameData, username }) {
  const [openingEvaluationArray, setOpeningEvaluationArray] = useState([]);

  useEffect(() => {
    if (!gameData) return;
    fetchEvaluations(gameData, setOpeningEvaluationArray);
  }, [gameData]);

  const { openingEvalAsWhite, openingEvalAsBlack, openingEvalOverall } =
    processEvaluations(openingEvaluationArray, username);

  const mostPlayedOpenings = getMostPlayedOpenings(openingEvaluationArray);

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
        <div>1 {mostPlayedOpenings[0]}</div>
        <div>2{mostPlayedOpenings[1]}</div>
        <div>3 {mostPlayedOpenings[2]}</div>
      </div>
    </div>
  );
}
