const { Command, Argument } = require('patron.js');
const { Number, Constants } = require('../../utility/');
const ModerationService = require('../../services/ModerationService.js');

class Vote extends Command {
  constructor() {
    super({
      names: ['vote'],
      groupName: 'member',
      description: 'Vote on a poll.',
      args: [
        new Argument({
          name: 'poll',
          key: 'poll',
          type: 'poll',
          example: '2'
        }),
        new Argument({
          name: 'choice',
          key: 'choice',
          type: 'choice',
          example: '1',
          remainder: true
        })
      ]
    });
  }

  async run(msg, args, text) {
    const elderDays = Number.msToTime(Constants.POLLS.ELDER_TIME_REQUIRED).days;

    if (args.poll.elderOnly === true && msg.member.joinedAt - Date.now() > Constants.POLLS.ELDER_TIME_REQUIRED) {
      return text.sendError('You may not vote on this poll until you\'ve been in this server for ' + elderDays + ' days.');
    } else if (args.poll.modOnly === true && ModerationService.getPermLevel(msg.dbGuild, msg.guild.member(msg.author)) === 0) {
      return text.sendError('You may only vote on this poll if you\'re a moderator.');
    } else if (args.poll.voters.includes(msg.author.id)) {
      return text.sendError('You\'ve already voted on this poll.');
    }

    const votedChoice = 'choices.' + args.choice;

    await msg.client.db.pollRepo.updatePoll(args.poll.name, args.poll.creatorId, msg.guild.id, { $inc: { [votedChoice]: 1 } });
    await msg.client.db.pollRepo.updatePoll(args.poll.name, args.poll.creatorId, msg.guild.id, { $push: { voters: msg.author.id } });

    return text.reply('You\'ve successfully voted `' + args.choice + '` on poll: `' + args.poll.name + '`.');
  }
}

module.exports = new Vote();
