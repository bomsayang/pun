const { Command, Argument, Context } = require('patron.js');
const Constants = require('../../utility/Constants.js');

class Game extends Command {
  constructor() {
    super({
      names: ['game', 'setgame', 'gameset'],
      groupName: 'botowner',
      description: 'Changes the bot\'s game.',
      usableContexts: [Context.Guild, Context.DM],
      args: [
        new Argument({
          key: 'game',
          name: 'game',
          type: 'string',
          example: 'with dank memes.',
          preconditions: [{ name: 'characterlimit', options: { limit: Constants.MAX_GAME_LENGTH } }],
          remainder: true
        })
      ]
    });
  }

  async run(msg, args, text) {
    await msg.client.user.setActivity(args.game, { url: 'https://twitch.tv/lumitedubbz', type: 'STREAMING' });

    return text.reply('Successfully set my game to ' + args.game + '! To change it again, run the `' + (msg.guild !== null ? msg.dbGuild.settings.prefix : Constants.DEFAULT_PREFIX) + 'game` command.');
  }
}

module.exports = new Game();