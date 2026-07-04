import { io } from 'socket.io-client';

const serverEvents = Object.freeze({
  sessionCreated: 'SESSION_CREATED',
});

function getServerUrl() {
  return import.meta.env.VITE_SERVER_URL || 'http://localhost:3000';
}

export function connectToServer({ onConnect, onSessionCreated, onDisconnect } = {}) {
  const socket = io(getServerUrl());

  socket.on('connect', () => {
    onConnect?.();
  });

  socket.on(serverEvents.sessionCreated, ({ sessionId }) => {
    onSessionCreated?.(sessionId);
  });

  socket.on('disconnect', () => {
    onDisconnect?.();
  });

  return socket;
}
