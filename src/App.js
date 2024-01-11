import { useState } from "react";
import Form from "./components/Form";
import WinRate from "./components/WinRate";
import GetPositionEvaluation from "./components/GetPositionEvaluation";

function App() {
  const [username, setUsername] = useState("");
  const [gameData, setGameData] = useState("");
  console.log(gameData);
  return (
    <div className="App">
      <Form
        gameData={gameData}
        setGameData={setGameData}
        username={username}
        setUsername={setUsername}
      />
      <WinRate gameData={gameData} username={username} />
      <GetPositionEvaluation gameData={gameData} />
    </div>
  );
}

export default App;
