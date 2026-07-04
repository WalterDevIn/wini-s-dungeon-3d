const { createEcsWorld } = require('./ecsWorld');
const { buildWorldSnapshot } = require('./systems/snapshotSystem');

function createWorldInstanceService() {
  const world = createEcsWorld();

  function joinDungeon(character) {
    const entity = world.getOrCreateEntityForCharacter(character.id);

    return {
      world,
      entity,
      snapshot: buildWorldSnapshot(world),
    };
  }

  function createSnapshot() {
    return buildWorldSnapshot(world);
  }

  return {
    joinDungeon,
    createSnapshot,
  };
}

module.exports = {
  createWorldInstanceService,
};
