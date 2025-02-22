import { config } from 'dotenv';
config();

export const OPEN_API_KEY = process.env.OPEN_API_KEY || 'default_key';