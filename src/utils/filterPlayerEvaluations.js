export function filterPlayerEvaluations(
  openingEvaluationObject,
  username,
  whiteEvalArray,
  blackEvalArray,
  overallEvalArray
) {
  const { whitePlayer, openingEval } = openingEvaluationObject;

  if (whitePlayer === username) {
    whiteEvalArray.push(openingEval);
    overallEvalArray.push(openingEval);
  } else {
    blackEvalArray.push(openingEval * -1);
    overallEvalArray.push(openingEval * -1);
  }
}
