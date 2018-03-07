require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const path = require("path");

const { getEvents } = require(`${__dirname}/controllers/calendarCtrl`);

const port = process.env.PORT || 3001;

const app = express();

app.use(express.static(`${__dirname}/../build/index.html`));

app.use(cors());
app.use(json());

app.get("/api/getEvents", getEvents);

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../build/index.html"));
// });

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
