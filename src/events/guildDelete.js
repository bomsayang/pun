const client = require('../structures/Client.js');

client.on('guildDelete', () => client.user.setActivity('on ' + client.guilds.size + ' guild' + (client.guilds.size > 1 ? 's' : ''), { url: 'https://twitch.tv/lumitedubbz', type: 'STREAMING' }));