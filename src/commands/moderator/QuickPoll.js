const { Command, Argument } = require('patron.js');
const ModerationService = require('../../services/ModerationService.js');
const utility = require('../../utility/');
const Discord = require('discord.js');

class QuickPoll extends Command {
  constructor() {
    super({
      names: ['quickpoll', 'makequickpoll', 'qp'],
      groupName: 'member',
      description: 'Create a poll.'
    });
  }

  async run(msg, text) {
    await function (msg) {
      msg.react("👍"),
      msg.react("👎")
      msg.pin()
    }
    return text.reply('You\'ve made a poll!');
  }
}

module.exports = new QuickPoll();
