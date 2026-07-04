const { createInputBuffer } = require('./inputBuffer');
const { createEcsWorld } = require('./ecsWorld');
const { moveEntityWithInput } = require('./systems/movementSystem');
const { buildWorldSnapshot } = require('./systems/snapshotSystem');

function createWorldInstanceService() {
  const inputBuffer = createInputBuffer();
  const world = createEcsWorld();

  function joinDungeon(character) {
    const entity = world.getOrCreateEntityForCharacter(character.id);

    return {
      world,
      entity,
      snapshot: buildWorldSnapshot(world),
    };
  }

  function applyPlayerInput(character, input) {
    const entity = world.getEntityForCharacter(character.id);

    if (!entity) {
      return null;
    }

    const playerInput = inputBuffer.setPlayerInput(character.id, input);
    moveEntityWithInput(entity, playerInput);

    return {
      entity,
      snapshot: buildWorldSnapshot(world),
    };
  }

  function leaveDungeon(character) {
    if (character) {
      inputBuffer.removePlayerInput(character.id);
    }
  }

  function createSnapshot() {
    return buildWorldSnapshot(world);
  }

  return {
    joinDungeon,
    applyPlayerInput,
    leaveDungeon,
    createSnapshot,
  };
}

module.exports = {
  createWorldInstanceService,
};
