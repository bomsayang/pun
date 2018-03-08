const { Command, Context } = require('patron.js');

class Reply extends Command {
  constructor() {
    super({
      names: ['reply'],
      groupName: 'member',
      description: 'Replies with a Message.',
      usableContexts: [Context.Guild, Context.DM]
    });
  }

  run(msg, args, text) {
    return text.send('Hi, I\'m awake!');
  }
}

module.exports = new Reply();