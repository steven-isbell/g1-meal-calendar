const sgMail = require('@sendgrid/mail');
const moment = require('moment');

const { GMAIL_USER, GMAIL_PASS, MISSIONARY_EMAIL, SENDGRID_KEY } = process.env;

sgMail.setApiKey(SENDGRID_KEY);

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
    await sgMail.send(config);
  } catch (e) {
    console.error(e);
  }
};

module.exports = { formatEmail };
