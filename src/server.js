import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import http from 'http';
import routes from './routes/index.js';
import db from './config/database.js';

console.log(db);

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 8080;

(async () => {
  try {
    await db.getConnection();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
  }
})();

app.use(cors());
app.use(bodyParser.json());
app.use('/api', routes);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});