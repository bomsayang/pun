const { Command, Argument } = require('patron.js');

class SetAutoMod extends Command {
  constructor() {
    super({
      names: ['setautomod', 'setauto', 'automod', 'automute'],
      groupName: 'administration',
      description: 'Enables or disables the auto mod feature',
      preconditions: ['mutedroleexists'],
      args: [
        new Argument({
          name: 'value',
          key: 'value',
          type: 'bool',
          example: 'true'
        })
      ]
    });
  }

  async run(msg, args, text) {
    await msg.client.db.guildRepo.upsertGuild(msg.guild.id, { $set: { 'settings.autoMod': args.value } });

    return text.reply('You\'ve successfully ' + (args.value === false ? 'disabled' : 'enabled') + ' the auto mod feature.');
  }
}

module.exports = new SetAutoMod();