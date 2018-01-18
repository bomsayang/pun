const client = require('../structures/Client.js');

client.on('ready', () => {
  console.log('I have connected: Ready to serve ' + client.guilds.size + ' servers with ' + client.users.size + ' members!');

  client.user.setActivity('on ' + client.guilds.size + ' servers', {url: 'https://twitch.tv/lumitedubbz', type: 'STREAMING'});
});
