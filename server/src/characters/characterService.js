const { randomUUID } = require('node:crypto');

function createCharacterService() {
  const charactersByAccountId = new Map();

  function getOrCreateDefaultCharacter(account) {
    const existingCharacter = charactersByAccountId.get(account.id);

    if (existingCharacter) {
      return existingCharacter;
    }

    const character = {
      id: randomUUID(),
      accountId: account.id,
      name: account.displayName,
      race: 'human',
      class: 'warrior',
      background: 'generic',
    };

    charactersByAccountId.set(account.id, character);

    console.log(`Default character ready: ${character.id} (${character.name})`);

    return character;
  }

  return {
    getOrCreateDefaultCharacter,
  };
}

module.exports = {
  createCharacterService,
};
