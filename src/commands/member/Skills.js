const { Command, Argument, ArgumentDefault } = require('patron.js');
const String = require('../../utility/String.js');

class Skills extends Command {
  constructor() {
    super({
      names: ['skills'],
      groupName: 'member',
      description: 'View the skills of anyone.',
      args: [
        new Argument({
          name: 'member',
          key: 'member',
          type: 'member',
          example: 'fagtron#1324',
          defaultValue: ArgumentDefault.Member,
          remainder: true
        })
      ]
    });
  }

  async run(msg, args, text) {
    const dbUser = await msg.client.db.userRepo.getUser(args.member.id, msg.guild.id);

    let description = '```';

    for (const key in dbUser.skills) {
      description += String.capitializeWords(key) + ': ' + dbUser.skills[key] + '\n';
    }

    return text.send(description + '```', { title: args.member.user.tag + '\'s Skills:' });
  }
}

module.exports = new Skills();