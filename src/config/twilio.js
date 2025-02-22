import dotenv from 'dotenv';
dotenv.config();
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID || 'default-sid';
const authToken = process.env.TWILIO_AUTH_TOKEN || 'default-token';

const twilioClient = twilio(accountSid, authToken);

export default twilioClient;