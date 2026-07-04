const movementStep = 0.12;
const roomLimit = 4.35;

function clampToRoom(value) {
  return Math.max(-roomLimit, Math.min(roomLimit, value));
}

function normalizeVector(vector) {
  const length = Math.hypot(vector.x, vector.z);

  if (length === 0) {
    return { x: 0, z: 0 };
  }

  return {
    x: vector.x / length,
    z: vector.z / length,
  };
}

function getMoveVector(input) {
  const forwardX = Math.sin(input.cameraYaw);
  const forwardZ = Math.cos(input.cameraYaw);
  const rightX = Math.cos(input.cameraYaw);
  const rightZ = -Math.sin(input.cameraYaw);

  const vector = { x: 0, z: 0 };

  if (input.forward) {
    vector.x += forwardX;
    vector.z += forwardZ;
  }

  if (input.back) {
    vector.x -= forwardX;
    vector.z -= forwardZ;
  }

  if (input.right) {
    vector.x += rightX;
    vector.z += rightZ;
  }

  if (input.left) {
    vector.x -= rightX;
    vector.z -= rightZ;
  }

  return normalizeVector(vector);
}

function moveEntityWithInput(entity, input) {
  const moveVector = getMoveVector(input);

  entity.position.x = clampToRoom(entity.position.x + moveVector.x * movementStep);
  entity.position.z = clampToRoom(entity.position.z + moveVector.z * movementStep);
  entity.rotation = input.cameraYaw;

  return entity;
}

module.exports = {
  moveEntityWithInput,
};
