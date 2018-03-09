const Number = require('./Number.js');
/* eslint-disable no-console */

class Logger {
  static format(type, msg) {
    return Number.formattedDate(new Date()) + ' [' + type + '] ' + msg;
  }

  static log(msg) {
    const format = Logger.format('\u001b[36mINFO\u001b[39m', '| ' + msg);

    return console.log(format);
  }

  static error(err) {
    const format = Logger.format('\u001b[31mERROR\u001b[39m', err instanceof Error ? err.stack : err);

    return console.log(format);
  }
}

module.exports = Logger;