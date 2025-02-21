require('dotenv').config();

const OPEN_API_KEY = process.env.OPEN_API_KEY || 'default_key';

module.exports = { OPEN_API_KEY };