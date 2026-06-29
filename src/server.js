import 'dotenv/config';
import http from 'http';
import app from './app.js';
import connectDB from './db/index.js';

const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

server.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on port http://localhost:${PORT}`);
});
