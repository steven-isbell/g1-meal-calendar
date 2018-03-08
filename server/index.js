require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const path = require("path");

const {
  getEvents,
  addEvent,
  deleteEvent
} = require(`${__dirname}/controllers/calendarCtrl`);

const port = process.env.PORT || 3001;

const app = express();

// app.use(express.static(`${__dirname}/../build/index.html`));

app.use(cors());
app.use(json());

app.get("/api/events", getEvents);
app.post("/api/events", addEvent);
app.delete("/api/event/:id", deleteEvent);

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../build/index.html"));
// });

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
