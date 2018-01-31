const client = require('../structures/Client.js');
const Logger = require('./../utility/Logger.js');

client.on('error', err => {
  client.channels.get('385529629626335234').send('An error occured! ' + err);
  Logger.log(3, 'Error! ' + err + '.');
});