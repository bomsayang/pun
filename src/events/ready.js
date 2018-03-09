const client = require('../structures/Client.js');
const Logger = require('../utility/Logger.js');

client.on('ready', () => {
  client.user.setActivity('on ' + client.guilds.size + ' guild' + (client.guilds.size > 1 ? 's' : ''), { url: 'https://twitch.tv/lumitedubbz', type: 'STREAMING' });

  Logger.log(client.user.tag + ' is ready.');
});