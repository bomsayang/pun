const client = require('../structures/Client.js');
const logger = require('cus-log');

client.on('disconnect', () => {
  logger.log(2, 'Pixel has disconnected.');
});