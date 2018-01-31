const client = require('../structures/Client.js');
const constants = require('../utility/Constants.js');
const logger = require('./../utility/Logger.js');

client.on('ready', () => {
  client.user.setActivity(`on ${client.guilds.size} guilds | ${constants.defaultPrefix}help`, {url: 'https://twitch.tv/lumitedubbz', type: 'STREAMING'});
  logger.log(1, 'Bot ready')
});