import { io } from 'socket.io-client';

const clientEvents = Object.freeze({
  enterAsGuest: 'ENTER_AS_GUEST',
  joinDungeon: 'JOIN_DUNGEON',
  playerInput: 'PLAYER_INPUT',
});

const serverEvents = Object.freeze({
  sessionCreated: 'SESSION_CREATED',
  guestReady: 'GUEST_READY',
  characterReady: 'CHARACTER_READY',
  dungeonJoined: 'DUNGEON_JOINED',
  worldSnapshot: 'WORLD_SNAPSHOT',
});

function getCodespacesServerUrl() {
  const { protocol, hostname } = window.location;

  if (!hostname.endsWith('.github.dev')) {
    return null;
  }

  const serverHostname = hostname.replace('-5173.', '-3000.');

  if (serverHostname === hostname) {
    return null;
  }

  return `${protocol}//${serverHostname}`;
}

function getServerUrl() {
  return import.meta.env.VITE_SERVER_URL || getCodespacesServerUrl() || 'http://localhost:3000';
}

export function connectToServer({
  onConnect,
  onSessionCreated,
  onGuestReady,
  onCharacterReady,
  onDungeonJoined,
  onWorldSnapshot,
  onDisconnect,
} = {}) {
  const socket = io(getServerUrl(), {
    transports: ['websocket'],
  });

  socket.on('connect', () => {
    onConnect?.();
  });

  socket.on(serverEvents.sessionCreated, ({ sessionId }) => {
    onSessionCreated?.(sessionId);
  });

  socket.on(serverEvents.guestReady, ({ account }) => {
    onGuestReady?.(account);
  });

  socket.on(serverEvents.characterReady, ({ character }) => {
    onCharacterReady?.(character);
  });

  socket.on(serverEvents.dungeonJoined, (dungeon) => {
    onDungeonJoined?.(dungeon);
  });

  socket.on(serverEvents.worldSnapshot, (snapshot) => {
    onWorldSnapshot?.(snapshot);
  });

  socket.on('disconnect', () => {
    onDisconnect?.();
  });

  return {
    enterAsGuest(displayName) {
      socket.emit(clientEvents.enterAsGuest, { displayName });
    },
    joinDungeon() {
      socket.emit(clientEvents.joinDungeon);
    },
    sendPlayerInput(input) {
      socket.emit(clientEvents.playerInput, input);
    },
  };
}
