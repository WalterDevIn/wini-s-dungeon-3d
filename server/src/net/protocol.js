const clientEvents = Object.freeze({
  enterAsGuest: 'ENTER_AS_GUEST',
});

const serverEvents = Object.freeze({
  sessionCreated: 'SESSION_CREATED',
  guestReady: 'GUEST_READY',
  characterReady: 'CHARACTER_READY',
});

module.exports = {
  clientEvents,
  serverEvents,
};
