const client = require('../structures/Client.js');
const logger = require('cus-log');

client.on('error', err => {
  client.channels.get('385529629626335234').send('An error occured! ' + err);
  logger.log(3, 'Error! ' + err + '.');
});