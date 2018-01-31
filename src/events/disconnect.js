const client = require('../structures/Client.js');
const logger = require('./../utility/Logger.js');

client.on('disconnect', () => {
  logger.log(2, 'Pixel has disconnected.');
});