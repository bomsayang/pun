const { Command, Argument, ArgumentDefault } = require('patron.js');
const XPService = require('../../services/XPService.js');

class GlobalInfo extends Command {
  constructor() {
    super({
      names: ['globalrank', 'globallevel', 'globalinfo', 'globalxp'],
      groupName: 'member',
      description: 'View the global info of anyone.',
      args: [
        new Argument({
          name: 'user',
          key: 'user',
          type: 'user',
          example: 'lmaoggnerds#8321',
          defaultValue: ArgumentDefault.Author,
          remainder: true
        })
      ]
    });
  }

  async run(msg, args, text) {
    const dbUser = msg.author.id === args.user.id ? msg.globalDbUser : await msg.client.db.globalUserRepo.getUser(args.user.id, msg.guild.id);
    const sortedUsers = (await msg.client.db.globalUserRepo.findMany()).sort((a, b) => b.level - a.level);
    const nextLevel = XPService.getNextLevel(dbUser);

    return text.send('**Level:** ' + dbUser.level + '\n**XP:** ' + dbUser.xp + '\n**Position:** #' + (sortedUsers.findIndex((v) => v.userId === dbUser.userId) + 1), { title: args.user.tag + '\'s Information', footer: { text: nextLevel === null ? 'You\'re max level globally!' : 'XP Required For Level ' + nextLevel.level + ': ' + nextLevel.xp } });
  }
}

module.exports = new GlobalInfo();