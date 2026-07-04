import { mountThreeRenderer } from '../render/threeRenderer.js';

export function createGameScreen() {
  const screen = document.createElement('section');
  screen.style.display = 'grid';
  screen.style.gridTemplateRows = 'auto 1fr';
  screen.style.gap = '12px';
  screen.style.height = '100vh';
  screen.style.padding = '16px';
  screen.style.boxSizing = 'border-box';
  screen.style.fontFamily = 'system-ui, sans-serif';

  const instructions = document.createElement('p');
  instructions.textContent = 'Sala 3D local. Arrastrá el mouse sobre la escena para rotar la cámara.';
  instructions.style.margin = '0';

  const viewport = document.createElement('div');
  viewport.style.minHeight = '360px';
  viewport.style.border = '1px solid #2f3542';
  viewport.style.borderRadius = '8px';
  viewport.style.overflow = 'hidden';

  screen.append(instructions, viewport);

  let rendererHandle = null;

  window.requestAnimationFrame(() => {
    rendererHandle = mountThreeRenderer(viewport);
  });

  return {
    element: screen,
    dispose() {
      rendererHandle?.dispose();
    },
  };
}
