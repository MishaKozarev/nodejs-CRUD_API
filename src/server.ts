import http, { Server } from 'http';

const server: Server = http.createServer((req, res) => {
  console.log('Server start');
});

const port = 4000;

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});