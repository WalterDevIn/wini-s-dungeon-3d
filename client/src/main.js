import { connectToServer } from './net/socketClient.js';
import { createGameScreen } from './screens/gameScreen.js';
import { createCharacterSelectScreen } from './screens/characterSelectScreen.js';
import { createMenuScreen } from './screens/menuScreen.js';
import { renderScreen } from './ui/screenRouter.js';

const app = document.querySelector('#app');
let socketClient = null;
let activeScreen = null;

function mountScreen(screen) {
  activeScreen?.dispose?.();
  activeScreen = screen;
  renderScreen(app, screen.element || screen);
}

const menuScreen = createMenuScreen({
  onEnterAsGuest(displayName) {
    socketClient?.enterAsGuest(displayName);
  },
});

mountScreen(menuScreen);

socketClient = connectToServer({
  onSessionCreated(sessionId) {
    menuScreen.setConnectedSession(sessionId);
  },
  onCharacterReady(character) {
    mountScreen(createCharacterSelectScreen(character, {
      onEnterDungeon() {
        mountScreen(createGameScreen());
      },
    }));
  },
  onDisconnect() {
    menuScreen.setDisconnected();
  },
});
