const { Command, Argument } = require('patron.js');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);
const String = require('../../utility/String.js');

class Exec extends Command {
  constructor() {
    super({
      names: ['exec'],
      groupName: 'botowner',
      description: 'Executes batch commands',
      args: [
        new Argument({
          key: 'command',
          name: 'command',
          type: 'string',
          example: 'cd',
          remainder: true
        })
      ]
    });
  }

  run(msg, args, text) {
    /* eslint-disable arrow-body-style */
    return exec(args.command).then(({ stdout, stderr }) => {
      return text.send('**Successfully Executed**```bat\n' + args.command + '```' + (String.isNullOrWhiteSpace(stderr) ? String.isNullOrWhiteSpace(stdout) ? '' : '**Output**' + (stdout.length > 2048 ? '\nOutput is too long to show.' : '```bat\n' + stdout.replace(process.env.USERNAME, 'USER') + '```') : stderr));
    }).catch(e => {
      return text.sendError('```bat\n' + e + '```', false);
    });
  }
}

module.exports = new Exec();