const colors = require('colors');
const moment = require('moment');

class Logger {

    static log(logSeverity, content) {
        let completed = '';
        const date = moment().format('LTS');
        const logBuilder = (logSeverity === 1) ? (completed = (date + ': ' + content.bold.blue)) : (logSeverity === 2) ? (completed = (date + ': ' + content.bold.yellow)) : ((logSeverity === 3) ? (completed = (date + ': ' + content.bold.red)) : completed=(date + ': ' + 'Incorrect log severity level. Use 1, 2 or 3 for DEBUG, WARN or ERR respectively.'.red));

        console.log(completed);
    }
}

module.exports = Logger;