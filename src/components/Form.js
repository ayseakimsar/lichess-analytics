import { useState } from "react";

export default function Form() {
  const [username, setUsername] = useState("");
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
        `https://lichess.org/api/games/user/${username}?accuracy=true&max=3`
      );

      // Check if the request was successful (status code 200)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Get a readable stream reader
      const reader = response.body.getReader();
      const textDecoder = new TextDecoder();

      // Read the stream in chunks
      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          console.log("Stream is done");
          break;
        }
        // Convert the binary data to a string

        const chunkText = textDecoder.decode(value);
        // Process the chunk of data (in this case, log it to the console)
        console.log("Received chunk of data:", typeof chunkText, chunkText);

        const pattern = /\[Event "(.+?)"\][\s\S]+?\[Result "(.+?)"\]/g;

        let matches;
        while ((matches = pattern.exec(chunkText)) !== null) {
          const event = matches[1].trim();
          const result = matches[2].trim();
          console.log(`Event: ${event}, Result: ${result}`);
        }
      }
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
