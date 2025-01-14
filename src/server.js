require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const routes = require('./routes');
const db = require('./config/database'); // db.js에서 연결을 가져옴

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 8080;

// 데이터베이스 연결 확인
(async () => {
  try {
    await db.getConnection();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
  }
})();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', routes);

// Server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
