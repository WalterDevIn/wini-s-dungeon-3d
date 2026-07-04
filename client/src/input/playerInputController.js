const inputIntervalMs = 50;

const keyBindings = Object.freeze({
  KeyW: 'forward',
  KeyS: 'back',
  KeyA: 'left',
  KeyD: 'right',
});

function createEmptyInput() {
  return {
    forward: false,
    back: false,
    left: false,
    right: false,
    cameraYaw: 0,
  };
}

export function createPlayerInputController({ getCameraYaw, onInput } = {}) {
  const movementState = createEmptyInput();
  let intervalId = null;

  function emitInput() {
    onInput?.({
      forward: movementState.forward,
      back: movementState.back,
      left: movementState.left,
      right: movementState.right,
      cameraYaw: getCameraYaw?.() || 0,
    });
  }

  function handleKeyDown(event) {
    const inputName = keyBindings[event.code];

    if (!inputName) {
      return;
    }

    event.preventDefault();
    movementState[inputName] = true;
    emitInput();
  }

  function handleKeyUp(event) {
    const inputName = keyBindings[event.code];

    if (!inputName) {
      return;
    }

    event.preventDefault();
    movementState[inputName] = false;
    emitInput();
  }

  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('keyup', handleKeyUp);

  intervalId = window.setInterval(emitInput, inputIntervalMs);

  return {
    dispose() {
      window.clearInterval(intervalId);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    },
  };
}
