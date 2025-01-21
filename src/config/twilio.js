import 'dotenv/config';
import twilio from 'twilio';

// Twilio 계정 SID
const accountSid = process.env.TWILIO_ACCOUNT_SID;

// Twilio 인증 토큰
const authToken = process.env.TWILIO_AUTH_TOKEN;

const twilioClient = twilio(accountSid, authToken);

export default twilioClient;
