const { Command, Context } = require('patron.js');
const Logger = require('../../utility/Logger.js');

class Kill extends Command {
  constructor() {
    super({
      names: ['kill', 'killbot', 'end'],
      groupName: 'botowner',
      description: 'Kills the Node process.',
      usableContexts: [Context.Guild, Context.DM]
    });
  }

  async run(msg, args, text) {
    await text.reply('Say "yes" to confirm you want to kill the Node process.');

    const result = await msg.channel.awaitMessages((x) => x.content.toLowerCase() === 'yes' && x.author.id === msg.author.id, { max: 1, time: 30000 });

    if (result.size === 1) {
      await text.reply('Killing application...');
      Logger.log('Process is exiting. Executed by: ' + msg.author.tag + '.');

      return process.exit();
    }

    return text.reply('The command has been cancelled.');
  }
}

module.exports = new Kill();