import { io } from 'socket.io-client';

const clientEvents = Object.freeze({
  enterAsGuest: 'ENTER_AS_GUEST',
});

const serverEvents = Object.freeze({
  sessionCreated: 'SESSION_CREATED',
  guestReady: 'GUEST_READY',
  characterReady: 'CHARACTER_READY',
});

function getServerUrl() {
  return import.meta.env.VITE_SERVER_URL || 'http://localhost:3000';
}

export function connectToServer({
  onConnect,
  onSessionCreated,
  onGuestReady,
  onCharacterReady,
  onDisconnect,
} = {}) {
  const socket = io(getServerUrl());

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

  socket.on('disconnect', () => {
    onDisconnect?.();
  });

  return {
    enterAsGuest(displayName) {
      socket.emit(clientEvents.enterAsGuest, { displayName });
    },
  };
}
