const client = require('../structures/Client.js');
const constants = require('../utility/Constants.js');
const logger = require('cus-log');

client.on('ready', () => {
  client.user.setActivity(`on ${client.guilds.size} guilds | ${constants.defaultPrefix}help`, {url: 'https://twitch.tv/lumitedubbz', type: 'STREAMING'});
  logger.log(1, '__________.__              .__   ')
  logger.log(1, '\______   \__|__  ___ ____ |  |  ')
  logger.log(1, ' |     ___/  \  \/  // __ \|  |  ')
  logger.log(1, ' |    |   |  |>    <\  ___/|  |__')
  logger.log(1, ' |____|   |__/__/\_ \\___  >____/')
  logger.log(1, '                   \/    \/      ')
  logger.log(1, '\n')
  logger.log(1, '${client.user.name} is ready to be used in ${client.guilds.size}!')
});
