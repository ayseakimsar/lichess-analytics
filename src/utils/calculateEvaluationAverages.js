export function calculateEvaluationAverages(
  whiteEvalArray,
  blackEvalArray,
  overallEvalArray
) {
  const sumWhiteEval = whiteEvalArray.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);
  const openingEvaluationAverageAsWhite = parseFloat(
    (sumWhiteEval / whiteEvalArray.length).toFixed(2)
  );
  const sumBlackEval = blackEvalArray.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);
  const openingEvaluationAverageAsBlack = parseFloat(
    (sumBlackEval / blackEvalArray.length).toFixed(2)
  );

  const sumOverallEval = overallEvalArray.reduce(
    (accumulator, currentValue) => {
      return accumulator + currentValue;
    },
    0
  );
  const openingEvaluationAverageInOverall = parseFloat(
    (sumOverallEval / overallEvalArray.length).toFixed(2)
  );
  return {
    openingEvalAsWhite: openingEvaluationAverageAsWhite,
    openingEvalAsBlack: openingEvaluationAverageAsBlack,
    openingEvalOverall: openingEvaluationAverageInOverall,
  };
}
