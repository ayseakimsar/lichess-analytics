import { filterPlayerEvaluations } from "./filterPlayerEvaluations";
import { calculateEvaluationAverages } from "./calculateEvaluationAverages";

export function processEvaluations(openingEvaluationArray, username) {
  const whiteEvalArray = [];
  const blackEvalArray = [];
  const overallEvalArray = [];

  for (const evaluation of openingEvaluationArray) {
    filterPlayerEvaluations(
      evaluation,
      username,
      whiteEvalArray,
      blackEvalArray,
      overallEvalArray
    );
  }

  const { openingEvalAsWhite, openingEvalAsBlack, openingEvalOverall } =
    calculateEvaluationAverages(
      whiteEvalArray,
      blackEvalArray,
      overallEvalArray
    );

  return { openingEvalAsWhite, openingEvalAsBlack, openingEvalOverall };
}
