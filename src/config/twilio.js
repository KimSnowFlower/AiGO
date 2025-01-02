const twilio = require('twilio');

// Twilio 계정 SID
const acccountSid = 'ACb388d1f17d2928e0015e1b67f861d9ef';

// Twilio 인증 토큰
const authToken = 'f469fbb8b19c4b60079ccfb15b209534';

const twilio_client = twilio(acccountSid, authToken);

module.exports = twilio_client;