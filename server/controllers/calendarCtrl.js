const { Pool } = require("pg");
const pool = new Pool({ connectionString: process.env.CONNECTION_STRING });

pool.on("error", (err, client) => {
  console.error("Error in Client: ", err);
  process.exit(-1);
});

const getEvents = async (req, res) => {
  const client = await pool.connect();
  try {
    const response = await client.query("SELECT * FROM events");
    res.status(200).json(response.rows);
  } catch (e) {
    console.error(e);
  } finally {
    client.release();
  }
};

module.exports = {
  getEvents
};
