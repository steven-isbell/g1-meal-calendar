const nodemailer = require("nodemailer");
const moment = require("moment");

const { GMAIL_USER, GMAIL_PASS, MISSIONARY_EMAIL } = process.env;

const sendMail = config => {
  // let mailOptions = {
  //   from: "Steven Isbell <steven.isbell18@gmail.com>",
  //   to: "steven.isbell18@gmail.com",
  //   subject: "Meal Signup",
  //   text: "Test",
  //   html: "<b>Sign Up Test</b>"
  // };
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_PASS
    }
  });
  return new Promise((resolve, reject) => {
    transporter.sendMail(config, (error, info) => {
      if (error) reject({ error });
      else resolve({ message: "Success!" });
    });
  });
};

const formatEmail = async (req, res) => {
  const { title, meal_desc, start } = req.body;
  const config = {
    from: "Steven Isbell <steven.isbell18@gmail.com>",
    to: "steven.isbell18@gmail.com",
    subject:
      req.originalUrl === "/api/events" ? "New Meal Signup" : "Meal Reminder",
    text:
      req.originalUrl === "/api/events"
        ? `${title} signed up to feed you on ${moment(start).format(
            "MM-DD-YYYY"
          )} with these instructions: ${
            meal_desc ? meal_desc : "no instructions left"
          }`
        : "Here's your meal reminder"
  };
  try {
    const email = await sendMail(config);
    if (email.message) return email.message;
    else return console.log(email.error);
  } catch (e) {
    console.log(e);
  }
};

module.exports = { formatEmail, sendMail };
