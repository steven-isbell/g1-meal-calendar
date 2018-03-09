const { Pool } = require("pg");
const moment = require("moment");

const pool =
  process.env.NODE_ENV === "development"
    ? new Pool({ connectionString: process.env.CONNECTION_STRING })
    : new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: true
      });

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
  const { start, end, title, meal_desc } = req.body;
  const formattedTitle = title.toLowerCase().startsWith("the ")
    ? title.replace(/the\s/gi, "")
    : title;
  const client = await pool.connect();
  try {
    await client.query(
      "INSERT INTO events (start_time, end_time, title, meal_desc, allday) VALUES ($1, $2, $3, $4, true)",
      [start, end, formattedTitle, meal_desc]
    );
    getEvents(req, res);
  } catch (e) {
    res.status(500).json(e);
  } finally {
    client.release();
  }
};

const deleteEvent = async (req, res) => {
  const { id } = req.params;
  const client = await pool.connect();

  try {
    await client.query("DELETE FROM events WHERE id = $1;", [id]);
    getEvents(req, res);
  } catch (e) {
    res.status(500).json(e);
  } finally {
    client.release();
  }
};

const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { meal_desc, title } = req.body;
  const client = await pool.connect();

  try {
    await client.query(
      "UPDATE events SET title = $1, meal_desc = $2 WHERE id = $3;",
      [title, meal_desc, id]
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
  addEvent,
  deleteEvent,
  updateEvent
};
