import { useState, useEffect } from "react";

export default function GetPositionEvaluation() {
  const [evaluation, setEvaluation] = useState("");
  useEffect(() => {
    async function getPositionEval() {
      let response = await fetch(
        "https://stockfish.online/api/stockfish.php?fen=r2q1r1k/pp1n1pbB/4p3/2pp3p/3P4/2P1PNB1/PPQ2PP1/2KR4 b - - 2 15&depth=13&mode=eval"
      );
      let data = await response.json();
      console.log(data.data);
    }
    getPositionEval();
  }, []);

  return <div></div>;
}
