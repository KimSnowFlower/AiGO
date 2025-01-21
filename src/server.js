import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import http from 'http';
import routes from './routes/index.js'; // 확장자 `.js` 명시 필요
import db from './config/database.js'; // 확장자 `.js` 명시 필요

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
