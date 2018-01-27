const client = require('../structures/Client.js');
const constants = require('../utility/Constants.js');

client.on('ready', () => {
  console.log('I have connected: Ready to serve ' + client.guilds.size + ' servers with ' + client.users.size + ' members!');

  client.user.setActivity(`on ${client.guilds.size} guilds | ${constants.defaultPrefix}help`, {url: 'https://twitch.tv/lumitedubbz', type: 'STREAMING'});
});