const clientEvents = Object.freeze({
  enterAsGuest: 'ENTER_AS_GUEST',
  joinDungeon: 'JOIN_DUNGEON',
  playerInput: 'PLAYER_INPUT',
});

const serverEvents = Object.freeze({
  sessionCreated: 'SESSION_CREATED',
  guestReady: 'GUEST_READY',
  characterReady: 'CHARACTER_READY',
  dungeonJoined: 'DUNGEON_JOINED',
  worldSnapshot: 'WORLD_SNAPSHOT',
});

module.exports = {
  clientEvents,
  serverEvents,
};
