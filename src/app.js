const { RequireAll } = require('patron.js');
const { join } = require('path');
const Logger = require('./utility/Logger.js');
const client = require('./structures/Client.js');
const registry = require('./structures/Registry.js');
const credentials = require('./../credentials.json');

client.registry = registry;
RequireAll(join(__dirname, 'events'));
RequireAll(join(__dirname, 'intervals'));

client.db.init(credentials.mongoConnectionURL);
client.init();

process.on('unhandledRejection', err => Logger.error('Unhandled Rejection:\n' + err.stack));
process.on('uncaughtException', err => Logger.error('Uncaught Exception:\n' + err.stack));
process.on('exit', code => Logger.error('Exited with code: ' + code));
process.on('warning', warning => Logger.error('Warning:\n' + warning.stack));