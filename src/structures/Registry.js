const { Registry, RequireAll } = require('patron.js');
const { join } = require('path');
const registry = new Registry({ caseSensitive: false, library: 'discord.js' });

registry.registerArgumentPreconditions(RequireAll(join(__dirname, '/../preconditions/argument')))
  .registerPreconditions(RequireAll(join(__dirname, '/../preconditions/command')))
  .registerGlobalTypeReaders()
  .registerLibraryTypeReaders()
  .registerTypeReaders(RequireAll(join(__dirname, '../readers')))
  .registerGroups(RequireAll(join(__dirname, '/../groups')))
  .registerCommands(RequireAll(join(__dirname, '/../commands')));

module.exports = registry;