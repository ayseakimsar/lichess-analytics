import { useState } from "react";

export default function Form({ username, setUsername, gameData, setGameData }) {
  const [timeControl, setTimeControl] = useState("rapid");

  function handleUsernameChange(e) {
    e.preventDefault();
    setUsername(e.target.value);
  }

  function handleTimeControlChange(e) {
    e.preventDefault();
    setTimeControl(e.target.value);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://lichess.org/api/games/user/${username}?accuracy=true&max=40&perfType=${timeControl}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const reader = response.body.getReader();
      const textDecoder = new TextDecoder();
      let games = [];

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          console.log("Stream is done");
          break;
        }

        const chunkText = textDecoder.decode(value);
        //console.log("Received chunk of data:", typeof chunkText, chunkText);

        const pattern =
          /\[Event "(.+?)"\][\s\S]+?\[White "(.+?)"\][\s\S]+?\[Black "(.+?)"\][\s\S]+?\[Result "(.+?)"\]/g;

        let matches;

        while ((matches = pattern.exec(chunkText)) !== null) {
          const event = matches[1].trim();
          const whitePlayer = matches[2].trim();
          const blackPlayer = matches[3].trim();
          const result = matches[4].trim();
          let game = {
            event: event,
            whitePlayer: whitePlayer,
            blackPlayer: blackPlayer,
            result: result,
          };
          games.push(game);
        }
      }
      setGameData(games);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <div>
      <form>
        <label htmlFor="usernameInput">Username</label>
        <input
          type="text"
          id="usernameInput"
          value={username}
          onChange={handleUsernameChange}
          placeholder="Enter username"
          required
        />
        <label>Time Control</label>
        <select
          id="timeControlInput"
          value={timeControl}
          onChange={handleTimeControlChange}
          required
        >
          <option value="" disabled>
            Select a time control
          </option>
          <option value="ultraBullet">UltraBullet</option>
          <option value="bullet">Bullet</option>
          <option value="blitz">Blitz</option>
          <option value="rapid">Rapid</option>
          <option value="classical">Classical</option>
        </select>
        <button onClick={handleSubmit} type="submit">
          Create my report
        </button>
      </form>
    </div>
  );
}
