export function calculateEvaluationAverages(
  whiteEvalArray,
  blackEvalArray,
  overallEvalArray
) {
  const sumWhiteEval = whiteEvalArray.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);
  const openingEvaluationAverageAsWhite = sumWhiteEval / whiteEvalArray.length;
  const sumBlackEval = blackEvalArray.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);
  const openingEvaluationAverageAsBlack = sumBlackEval / blackEvalArray.length;

  const sumOverallEval = overallEvalArray.reduce(
    (accumulator, currentValue) => {
      return accumulator + currentValue;
    },
    0
  );
  const openingEvaluationAverageInOverall =
    sumOverallEval / overallEvalArray.length;
  return {
    openingEvalAsWhite: openingEvaluationAverageAsWhite,
    openingEvalAsBlack: openingEvaluationAverageAsBlack,
    openingEvalOverall: openingEvaluationAverageInOverall,
  };
}
