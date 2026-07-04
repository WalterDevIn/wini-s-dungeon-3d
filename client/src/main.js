import { connectToServer } from './net/socketClient.js';
import { createCharacterSelectScreen } from './screens/characterSelectScreen.js';
import { createMenuScreen } from './screens/menuScreen.js';
import { renderScreen } from './ui/screenRouter.js';

const app = document.querySelector('#app');
let socketClient = null;

const menuScreen = createMenuScreen({
  onEnterAsGuest(displayName) {
    socketClient?.enterAsGuest(displayName);
  },
});

renderScreen(app, menuScreen.element);

socketClient = connectToServer({
  onSessionCreated(sessionId) {
    menuScreen.setConnectedSession(sessionId);
  },
  onCharacterReady(character) {
    renderScreen(app, createCharacterSelectScreen(character));
  },
  onDisconnect() {
    menuScreen.setDisconnected();
  },
});
