require('dotenv').config();
const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID || 'default-sid';
const authToken = process.env.TWILIO_AUTH_TOKEN || 'default-token';

const twilioClient = twilio(accountSid, authToken);

module.exports = twilioClient;