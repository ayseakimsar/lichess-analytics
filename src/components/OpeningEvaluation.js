import { useEffect } from "react";
import { fetchEvaluations } from "../utils/fetchEvaluations";

export default function OpeningEvaluation({
  gameData,
  setOpeningEvaluationArray,
}) {
  useEffect(() => {
    if (!gameData) return;
    fetchEvaluations(gameData, setOpeningEvaluationArray);
  }, [gameData]);

  return (
    <div>
      <p>Your overall average score after the first 7 moves of a game</p>
      <p>With the white pieces</p>
      <p>With the black pieces</p>
      <div>
        Your popular openings
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </div>
    </div>
  );
}
