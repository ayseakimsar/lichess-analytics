export function getMostPlayedOpenings(data) {
  const openingCounts = {};

  data.forEach((game) => {
    const opening = game.opening;
    openingCounts[opening] = (openingCounts[opening] || 0) + 1;
  });
  console.log(openingCounts);

  // Sort openings by occurrence in descending order
  const sortedOpenings = Object.entries(openingCounts).sort(
    (a, b) => b[1] - a[1]
  );

  // Get the top 3 openings
  const topOpenings = sortedOpenings.slice(0, 3).map((entry) => entry[0]);

  return topOpenings;
}
