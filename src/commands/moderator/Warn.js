const { Command, Argument } = require('patron.js');
const Constants = require('../../utility/Constants.js');
const ModerationService = require('../../services/ModerationService');

class Warn extends Command {
  constructor() {
    super({
      names: ['warn'],
      groupName: 'moderator',
      description: 'Warn any member!',
      botPermissions: ['MANAGE_ROLES'],
      args: [
        new Argument({
          name: 'member',
          key: 'member',
          type: 'member',
          preconditions: ['nomoderator'],
          example: '"Jack Kannoff#0711"'
        }),
        new Argument({
          name: 'warning',
          key: 'warning',
          type: 'string',
          example: 'having a small willy',
          remainder: true
        })
      ]
    });
  }

  async run(msg, args, text) {
    await text.reply('You have successfully warned ' + args.member.user.tag + ' for `' + args.warning + '`.');
    await ModerationService.tryInformUser(msg.guild, msg.author, 'warned', args.member.user, args.warning);

    return ModerationService.tryModLog(msg.dbGuild, msg.guild, 'Warn', Constants.EMBED_COLORS.WARN, args.warning, msg.author, args.member.user);
  }
}

module.exports = new Warn();