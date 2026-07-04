function clonePosition(position) {
  return {
    x: position.x,
    y: position.y,
    z: position.z,
  };
}

function buildWorldSnapshot(world) {
  return {
    worldId: world.id,
    entities: world.getEntities().map((entity) => ({
      id: entity.id,
      characterId: entity.characterId,
      position: clonePosition(entity.position),
      rotation: entity.rotation,
    })),
  };
}

module.exports = {
  buildWorldSnapshot,
};
