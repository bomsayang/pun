const { RequireAll } = require('patron.js');
const { join } = require('path');
const client = require('./structures/Client.js');
const registry = require('./structures/Registry.js');
const credentials = require('./../credentials.json');
const logger = require('./utility/Logger.js');

client.registry = registry;
RequireAll(join(__dirname, 'events'));
RequireAll(join(__dirname, 'intervals'));

client.db.init(credentials.mongoConnectionURL);
client.init();

process.on('unhandledRejection', err => {
  logger.log(1, 'Unhandled Rejection:\n' + err.stack);
});