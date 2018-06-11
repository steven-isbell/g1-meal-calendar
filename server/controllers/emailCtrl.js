const sgMail = require('@sendgrid/mail');
const moment = require('moment');

const { GMAIL_USER, GMAIL_PASS, MISSIONARY_EMAIL, SEND_GRID_KEY } = process.env;

sgMail.setApiKey(process.env.SENDGRID_KEY);

const sendMail = async config => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_PASS
    }
  });
  return await sgMail.send(config);
};

const formatEmail = async (req, res) => {
  const { title, meal_desc, start } = req.body;
  const config = {
    from: 'Steven Isbell <steven.isbell18@gmail.com>',
    to: MISSIONARY_EMAIL,
    subject:
      req.originalUrl === '/api/events' ? 'New Meal Signup' : 'Meal Reminder',
    text:
      req.originalUrl === '/api/events'
        ? `${title} signed up to feed you on ${moment(start).format(
            'MM-DD-YYYY'
          )} with these instructions: ${
            meal_desc ? meal_desc : 'no instructions left'
          }`
        : "Here's your meal reminder"
  };
  try {
    const email = await sendMail(config);
    if (email.message) console.log(email.error);
    else return;
  } catch (e) {
    console.log(e);
  }
};

module.exports = { formatEmail, sendMail };
