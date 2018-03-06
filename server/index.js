const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const path = require("path");

const port = 3001;

const app = express();

app.use(cors());
app.use(json());

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
