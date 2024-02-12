import { useState } from "react";
import Form from "./components/Form";
import WinRate from "./components/WinRate";
import OpeningEvaluation from "./components/OpeningEvaluation";

function App() {
  const [username, setUsername] = useState("");
  const [gameData, setGameData] = useState("");

  return (
    <div className="App">
      <Form
        setGameData={setGameData}
        username={username}
        setUsername={setUsername}
      />
      <WinRate gameData={gameData} username={username} />
      <OpeningEvaluation gameData={gameData} username={username} />
    </div>
  );
}

export default App;
