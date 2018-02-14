const { Command, Argument } = require('patron.js');
const utility = require('../../utility');
const client = require('../../structures/Client.js');

class Game extends Command {
  constructor() {
    super({
      names: ['game', 'setgame', 'gameset'],
      groupName: 'botowner',
      description: 'Changes the bot\'s game.',
      guildOnly: false,
      args: [
        new Argument({
          key: 'game',
          name: 'game',
          type: 'string',
          example: 'with dank memes.',
          preconditions: [{ name: 'characterlimit', options: { limit: utility.Constants.setgame.maxLength } }],
          remainder: true
        })
      ]
    });
  }

  async run(msg, args, text) {
    await msg.client.user.setActivity(args.game, {url: 'https://twitch.tv/lumitedubbz', type: 'STREAMING'});
    
    let prefix = '';

    if (msg.guild !== null) {
      msg.dbGuild = await client.db.guildRepo.getGuild(msg.guild.id);
      msg.dbUser = await client.db.userRepo.getUser(msg.author.id, msg.guild.id);
      msg.globalDbUser = await client.db.globalUserRepo.getUser(msg.author.id);
  
      prefix = msg.dbGuild.settings.prefix;
    } else {
      prefix = Constants.defaultPrefix;
    }

    return text.reply('successfully set my game to ' + args.game + '! To change it again, run the `' + prefix + 'game` command.');  
  }
}

module.exports = new Game();
