function createSessionService() {
  const sessionsById = new Map();

  function createSession({ sessionId, socketId }) {
    const session = {
      id: sessionId,
      socketId,
      accountId: null,
    };

    sessionsById.set(sessionId, session);

    return session;
  }

  function attachGuestAccount(sessionId, account) {
    const session = sessionsById.get(sessionId);

    if (!session) {
      return null;
    }

    session.accountId = account.id;

    return session;
  }

  function removeSession(sessionId) {
    sessionsById.delete(sessionId);
  }

  return {
    createSession,
    attachGuestAccount,
    removeSession,
  };
}

module.exports = {
  createSessionService,
};
