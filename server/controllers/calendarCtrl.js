const { Pool } = require("pg");
const moment = require("moment");

const pool = new Pool({ connectionString: process.env.CONNECTION_STRING });

pool.on("error", (err, client) => {
  console.error("Error in Client: ", err);
  process.exit(-1);
});

const getEvents = async (req, res) => {
  const client = await pool.connect();
  try {
    const response = await client.query("SELECT * FROM events");
    const formattedData = response.rows.map(val => ({
      id: val.id,
      title: val.title,
      start: val.start_time,
      end: val.end_time,
      desc: val.meal_desc,
      allDay: val.allday
    }));
    res.status(200).json(formattedData);
  } catch (e) {
    console.error(e);
  } finally {
    client.release();
  }
};

const addEvent = async (req, res) => {
  console.log("BODY: ", req.body);
  const { start, end, title, meal_desc } = req.body;
  // const formattedStart = moment.format(start_time);
  // const formattedEnd = moment.format(end_time);
  const client = await pool.connect();
  try {
    await client.query(
      "INSERT INTO events (start_time, end_time, title, meal_desc, allday) VALUES ($1, $2, $3, $4, true)",
      [start, end, title, meal_desc]
    );
    getEvents(req, res);
  } catch (e) {
    res.status(500).json(e);
  } finally {
    client.release();
  }
};

module.exports = {
  getEvents,
  addEvent
};
