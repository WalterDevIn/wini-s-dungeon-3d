const { randomUUID } = require('node:crypto');
const { Server } = require('socket.io');
const { serverEvents } = require('./protocol');

function attachSocketServer(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (socket) => {
    const sessionId = randomUUID();

    console.log(`Client connected: ${sessionId}`);

    socket.emit(serverEvents.sessionCreated, { sessionId });
  });

  return io;
}

module.exports = {
  attachSocketServer,
};
