const moment = require("moment");

const db = require(`${__dirname}/../db/database`);

const getEvents = async (req, res) => {
  try {
    const response = await db.query("SELECT * FROM events");
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
  }
};

const addEvent = async (req, res, next) => {
  const { start, end, title, meal_desc } = req.body;
  const formattedTitle = title.toLowerCase().startsWith("the ")
    ? title.replace(/the\s/gi, "")
    : title;
  // days being rendered incorrectly on calendar, figure out why, but in the meantime, make sure to subtract 24 hrs if exporting data.
  const formattedStart = moment(start).add(1, "d");
  const formattedEnd = moment(end).add(1, "d");
  try {
    await db.query(
      "INSERT INTO events (start_time, end_time, title, meal_desc, allday) VALUES ($1, $2, $3, $4, true)",
      [formattedStart, formattedEnd, formattedTitle, meal_desc]
    );

    getEvents(req, res);
  } catch (e) {
    res.status(500).json(e);
  } finally {
    next();
  }
};

const deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM events WHERE id = $1;", [id]);
    getEvents(req, res);
  } catch (e) {
    res.status(500).json(e);
  }
};

const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { meal_desc, title } = req.body;

  try {
    await db.query(
      "UPDATE events SET title = $1, meal_desc = $2 WHERE id = $3;",
      [title, meal_desc, id]
    );
    getEvents(req, res);
  } catch (e) {
    res.status(500).json(e);
  }
};

module.exports = {
  getEvents,
  addEvent,
  deleteEvent,
  updateEvent
};
