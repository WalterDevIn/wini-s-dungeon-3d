const { randomUUID } = require('node:crypto');
const { Server } = require('socket.io');
const { createAccountService } = require('../auth/accountService');
const { createSessionService } = require('../auth/sessionService');
const { createCharacterService } = require('../characters/characterService');
const { createWorldInstanceService } = require('../world/worldInstanceService');
const { clientEvents, serverEvents } = require('./protocol');

const accountService = createAccountService();
const characterService = createCharacterService();
const sessionService = createSessionService();
const worldInstanceService = createWorldInstanceService();

const snapshotIntervalMs = 250;

function attachSocketServer(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (socket) => {
    const sessionId = randomUUID();
    let activeCharacter = null;
    let snapshotInterval = null;

    sessionService.createSession({ sessionId, socketId: socket.id });

    console.log(`Client connected: ${sessionId}`);

    socket.emit(serverEvents.sessionCreated, { sessionId });

    socket.on(clientEvents.enterAsGuest, ({ displayName } = {}) => {
      console.log(`ENTER_AS_GUEST received: ${sessionId}`);

      const account = accountService.createGuestAccount(displayName);
      sessionService.attachGuestAccount(sessionId, account);

      const character = characterService.getOrCreateDefaultCharacter(account);
      activeCharacter = character;

      socket.emit(serverEvents.guestReady, { account });
      socket.emit(serverEvents.characterReady, { character });
    });

    socket.on(clientEvents.joinDungeon, () => {
      if (!activeCharacter) {
        return;
      }

      console.log(`JOIN_DUNGEON received: ${sessionId}`);

      const { world, entity, snapshot } = worldInstanceService.joinDungeon(activeCharacter);

      socket.emit(serverEvents.dungeonJoined, {
        worldId: world.id,
        entityId: entity.id,
        characterId: activeCharacter.id,
      });
      socket.emit(serverEvents.worldSnapshot, snapshot);

      if (snapshotInterval) {
        clearInterval(snapshotInterval);
      }

      snapshotInterval = setInterval(() => {
        socket.emit(serverEvents.worldSnapshot, worldInstanceService.createSnapshot());
      }, snapshotIntervalMs);
    });

    socket.on('disconnect', () => {
      if (snapshotInterval) {
        clearInterval(snapshotInterval);
      }

      sessionService.removeSession(sessionId);
    });
  });

  return io;
}

module.exports = {
  attachSocketServer,
};
