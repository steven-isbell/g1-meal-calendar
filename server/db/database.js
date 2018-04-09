const { Pool } = require("pg");

const pool = new Pool({ connectionString: process.env.CONNECTION_STRING });

pool.on("error", err => {
  console.error("Error in Client: ", err);
  process.exit(-1);
});

module.exports = {
  query: async (text, params) => {
    const client = await pool.connect();
    try {
      return await pool.query(text, params);
    } catch (e) {
      console.log(e);
      return true;
    } finally {
      client.release();
    }
  }
};
