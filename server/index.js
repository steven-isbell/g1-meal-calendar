require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const path = require("path");

const {
  getEvents,
  addEvent
} = require(`${__dirname}/controllers/calendarCtrl`);

const port = process.env.PORT || 3001;

const app = express();

// app.use(express.static(`${__dirname}/../build/index.html`));

app.use(cors());
app.use(json());

app.use((req, res, next) => {
  console.log("ENTER");
  next();
});
app.get("/api/getEvents", getEvents);
app.post("/api/addEvent", addEvent);

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../build/index.html"));
// });

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
