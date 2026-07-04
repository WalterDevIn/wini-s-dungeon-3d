import { createMenuScreen } from './screens/menuScreen.js';
import { renderScreen } from './ui/screenRouter.js';

const app = document.querySelector('#app');

renderScreen(app, createMenuScreen());
