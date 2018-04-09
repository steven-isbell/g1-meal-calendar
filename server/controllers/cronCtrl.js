const { CronJob } = require("cron");
const moment = require("moment");

const db = require(`${__dirname}/../db/database`);
const { sendMail } = require(`${__dirname}/emailCtrl`);

const job = new CronJob({
  cronTime: "00 00 08 * * *",
  onTick: async function() {
    console.log("Starting");
    try {
      const eventDate = moment()
        .add(1, "d")
        .format("YYYY-MM-DD");
      const { rows } = await db.query(
        `SELECT * FROM events WHERE start_time = $1`,
        [eventDate]
      );
      if (rows[0]) {
        try {
          await sendMail({
            from: "Steven Isbell <steven.isbell18@gmail.com>",
            to: process.env.MISSIONARY_EMAIL,
            subject: "Meal Reminder",
            text: `Dinner tonight is with ${
              rows[0].title
            } with these instructions: ${
              rows[0].meal_desc ? rows[0].meal_desc : "no instructions left"
            }`
          });
        } catch (e) {
          throw e;
        }
      }
    } catch (e) {
      console.log(e);
    }
    return;
  },
  start: true,
  timeZone: "America/Chicago"
});

module.exports = {
  job
};
