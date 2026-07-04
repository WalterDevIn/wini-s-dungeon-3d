function toBoolean(value) {
  return value === true;
}

function toFiniteNumber(value, fallback) {
  return Number.isFinite(value) ? value : fallback;
}

function sanitizePlayerInput(input = {}) {
  return {
    forward: toBoolean(input.forward),
    back: toBoolean(input.back),
    left: toBoolean(input.left),
    right: toBoolean(input.right),
    cameraYaw: toFiniteNumber(input.cameraYaw, 0),
  };
}

function createInputBuffer() {
  const inputsByCharacterId = new Map();

  function setPlayerInput(characterId, input) {
    const sanitizedInput = sanitizePlayerInput(input);
    inputsByCharacterId.set(characterId, sanitizedInput);

    return sanitizedInput;
  }

  function getPlayerInput(characterId) {
    return inputsByCharacterId.get(characterId) || sanitizePlayerInput();
  }

  function removePlayerInput(characterId) {
    inputsByCharacterId.delete(characterId);
  }

  return {
    setPlayerInput,
    getPlayerInput,
    removePlayerInput,
  };
}

module.exports = {
  createInputBuffer,
};
