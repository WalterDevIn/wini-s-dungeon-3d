const { randomUUID } = require('node:crypto');

function normalizeDisplayName(displayName) {
  const normalized = String(displayName ?? '').trim();

  return normalized || 'Guest';
}

function createAccountService() {
  const accountsById = new Map();

  function createGuestAccount(displayName) {
    const account = {
      id: randomUUID(),
      type: 'guest',
      displayName: normalizeDisplayName(displayName),
    };

    accountsById.set(account.id, account);

    console.log(`Guest account created: ${account.id} (${account.displayName})`);

    return account;
  }

  return {
    createGuestAccount,
  };
}

module.exports = {
  createAccountService,
};
