export async function fetchPositionEvaluationByFEN(fen) {
  let response = await fetch(`https://lichess.org/api/cloud-eval?fen=${fen}`);
  console.log(response);
  if (response.status === 429) throw new Error("Too many requests");

  if (response.ok) {
    const data = await response.json();
    console.log(data);
    return data;
  }
}
