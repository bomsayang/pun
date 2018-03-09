const client = require('../structures/Client.js');
const Logger = require('../utility/Logger.js');

client.on('error', err => {
  const bugsChannel = client.channels.get('385529629626335234');

  if (bugsChannel !== undefined) {
    bugsChannel.send('An error occured! ' + err);
  }

  Logger.log('Error emitted from client:\n' + err);
});