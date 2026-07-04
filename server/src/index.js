const http = require('node:http');
const { attachSocketServer } = require('./net/socketServer');

const port = Number(process.env.PORT) || 3000;

const server = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  response.end('Wini-s-dungeon-3d server running');
});

attachSocketServer(server);

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
