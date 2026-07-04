const { randomUUID } = require('node:crypto');
const { Server } = require('socket.io');
const { createAccountService } = require('../auth/accountService');
const { createSessionService } = require('../auth/sessionService');
const { createCharacterService } = require('../characters/characterService');
const { clientEvents, serverEvents } = require('./protocol');

const accountService = createAccountService();
const characterService = createCharacterService();
const sessionService = createSessionService();

function attachSocketServer(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (socket) => {
    const sessionId = randomUUID();

    sessionService.createSession({ sessionId, socketId: socket.id });

    console.log(`Client connected: ${sessionId}`);

    socket.emit(serverEvents.sessionCreated, { sessionId });

    socket.on(clientEvents.enterAsGuest, ({ displayName } = {}) => {
      console.log(`ENTER_AS_GUEST received: ${sessionId}`);

      const account = accountService.createGuestAccount(displayName);
      sessionService.attachGuestAccount(sessionId, account);

      const character = characterService.getOrCreateDefaultCharacter(account);

      socket.emit(serverEvents.guestReady, { account });
      socket.emit(serverEvents.characterReady, { character });
    });

    socket.on('disconnect', () => {
      sessionService.removeSession(sessionId);
    });
  });

  return io;
}

module.exports = {
  attachSocketServer,
};
