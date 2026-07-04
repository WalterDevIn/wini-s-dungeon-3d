import { connectToServer } from './net/socketClient.js';
import { createMenuScreen } from './screens/menuScreen.js';
import { renderScreen } from './ui/screenRouter.js';

const app = document.querySelector('#app');
const menuScreen = createMenuScreen();

renderScreen(app, menuScreen.element);

connectToServer({
  onSessionCreated(sessionId) {
    menuScreen.setConnectedSession(sessionId);
  },
  onDisconnect() {
    menuScreen.setDisconnected();
  },
});
