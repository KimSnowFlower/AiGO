require('dotenv').config({ path: '../.env' });
const mysql = require('mysql2/promise');

// 데이터베이스 연결 설정을 환경 변수로 관리
const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

module.exports = db;