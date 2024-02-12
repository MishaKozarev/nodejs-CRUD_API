import http, { Server } from 'http';
import * as dotenv from 'dotenv';
import { handleRequest } from './request/request'

const server: Server = http.createServer(handleRequest);

dotenv.config();
const port = process.env.NODE_PORT || 4000;

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});