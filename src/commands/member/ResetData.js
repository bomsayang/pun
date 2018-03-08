const { Command } = require('patron.js');

class ResetData extends Command {
  constructor() {
    super({
      names: ['resetdata', 'resetxp', 'resetlevel', 'resetskills'],
      groupName: 'member',
      description: 'Resets your XP, level and skill points in the current server'
    });
  }

  async run(msg, args, text) {
    await msg.client.db.userRepo.modifyXP(msg.dbGuild, msg.member, -msg.dbUser.xp);
    await msg.client.db.userRepo.modifySkillPoints(msg.dbGuild, msg.member, -msg.dbUser.skillPoints);
    await msg.client.db.userRepo.modifyLevel(msg.dbGuild, msg.member, -msg.dbUser.level);

    return text.reply('You\'ve successfully reset your data.');
  }
}

module.exports = new ResetData();