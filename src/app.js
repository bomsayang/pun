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
  logger.log(2, 'Unhandled Rejection:\n' + err.stack);
});

process.on('exit', code => {
  logger.log(2, `About to exit the application with the code "${code}`);
});

process.on('uncaughtException', err => {
  logger.log(2, 'Uncaught Exception:\n' + err.stack);
});

process.on('warning', warning => {
  logger.log(2, 'Warning:\n' + warning.stack);
});