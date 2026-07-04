export function createMenuScreen({ onEnterAsGuest } = {}) {
  const screen = document.createElement('section');
  screen.style.display = 'grid';
  screen.style.gap = '12px';
  screen.style.maxWidth = '360px';
  screen.style.margin = '48px auto';
  screen.style.fontFamily = 'system-ui, sans-serif';

  const title = document.createElement('h1');
  title.textContent = 'Wini-s-dungeon-3d vPreliminar';
  title.style.margin = '0';

  const connectionStatus = document.createElement('p');
  connectionStatus.textContent = 'Conectando con servidor...';
  connectionStatus.setAttribute('aria-live', 'polite');
  connectionStatus.style.margin = '0';

  const label = document.createElement('label');
  label.textContent = 'Nombre:';
  label.style.display = 'grid';
  label.style.gap = '6px';

  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.autocomplete = 'off';
  nameInput.placeholder = 'Walter';

  label.append(nameInput);

  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = 'Entrar como guest';

  const message = document.createElement('p');
  message.setAttribute('aria-live', 'polite');
  message.style.minHeight = '1.5em';
  message.style.margin = '0';

  button.addEventListener('click', () => {
    message.textContent = 'Entrando como guest...';
    onEnterAsGuest?.(nameInput.value);
  });

  screen.append(title, connectionStatus, label, button, message);

  return {
    element: screen,
    setConnectedSession(sessionId) {
      connectionStatus.textContent = `Conectado como sesión ${sessionId}`;
    },
    setDisconnected() {
      connectionStatus.textContent = 'Desconectado del servidor';
    },
  };
}
