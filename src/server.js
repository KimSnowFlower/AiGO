require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const routes = require('./routes/index.js');
const db = require('./config/database.js');

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