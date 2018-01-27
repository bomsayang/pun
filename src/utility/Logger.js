const colors = require('colors');

class Logger {
    constructor(logSeverity, content) {
        function log() {
            colors.setTheme({
                debug: 'blue',
                warn: 'yellow',
                error: 'red'
            });

            if (logSeverity == 1) {
                console.log('[Severity: DEBUG] ', content.debug)
            }

            if (logSeverity == 2) {
                return console.log('[Severity: WARN] ', content.warn)
            }

            if (logSeverity == 3) {
                return console.log('[Severity: ERROR] ', content.error)
            }

            else {
                return console.log('Error: You must specify a correct logSeverity level (1, 2 or 3).'.error)
            }
        }
    }
}