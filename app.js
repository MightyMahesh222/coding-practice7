const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const app = express();
const dbPath = path.join(__dirname, "cricketMatchDetails.db");
app.use(express.json());

let db = null;

const initializeDbAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server running");
    });
  } catch (e) {
    console.log(`DB Error:${e.message}`);
    process.exit(1);
  }
};
initializeDbAndServer();

/*Get Players*/

const toCamelCase = (normalCase) => {
  return {
    playerId: normalCase.player_id,
    playerName: normalCase.player_name,
  };
};

app.get("/players/", async (request, response) => {
  const playerQuery = `select * from player`;
  const data = await db.all(playerQuery);
  response.send(data);
  console.log(data);
});
