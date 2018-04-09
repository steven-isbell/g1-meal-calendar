const { CronJob } = require("cron");

new CronJob(
  "* * * * * *",
  function() {
    console.log("You will see this message every second");
  },
  null,
  true,
  "America/Los_Angeles"
);
