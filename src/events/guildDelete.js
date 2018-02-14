const client = require('../structures/Client.js');

client.on('guildDelete', guild => {
  client.user.setActivity('on ' + client.guilds.size + ' guilds', {url: 'https://twitch.tv/lumitedubbz', type: 'STREAMING'});
});