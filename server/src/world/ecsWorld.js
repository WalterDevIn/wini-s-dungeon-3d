const { randomUUID } = require('node:crypto');

function createEcsWorld({ id = 'default-dungeon' } = {}) {
  const entitiesByCharacterId = new Map();

  function createEntity(characterId) {
    return {
      id: randomUUID(),
      characterId,
      position: { x: 0, y: 0, z: 0 },
      rotation: 0,
    };
  }

  function getEntityForCharacter(characterId) {
    return entitiesByCharacterId.get(characterId) || null;
  }

  function getOrCreateEntityForCharacter(characterId) {
    const existingEntity = getEntityForCharacter(characterId);

    if (existingEntity) {
      return existingEntity;
    }

    const entity = createEntity(characterId);
    entitiesByCharacterId.set(characterId, entity);

    return entity;
  }

  function getEntities() {
    return Array.from(entitiesByCharacterId.values());
  }

  return {
    id,
    getEntityForCharacter,
    getOrCreateEntityForCharacter,
    getEntities,
  };
}

module.exports = {
  createEcsWorld,
};
