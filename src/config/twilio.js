require('dotenv').config();
const twilio = require('twilio');

// Twilio 계정 SID
const acccountSid = process.env.TWILIO_ACCOUNT_SID;

// Twilio 인증 토큰
const authToken = process.env.TWILIO_AUTH_TOKEN; 

const twilio_client = twilio(acccountSid, authToken);

module.exports = twilio_client;