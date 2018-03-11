const { Text, Constants: { LEVELS, XP } } = require('../utility');
const { Collection } = require('discord.js');

class XPService {
  constructor() {
    this.messages = new Collection();
  }

  async giveXP(msg, global = true) {
    const user = global === true ? msg.globalDbUser : msg.dbUser;
    const nextLevel = this.getNextLevel(user);

    if (nextLevel === null) {
      return;
    }

    const key = msg.author.id + '-' + (global === true ? 'global' : 'local');
    const lastMessage = this.messages.get(key);
    const isMessageCooldownOver = lastMessage === undefined || Date.now() - lastMessage > XP[global === true ? 'GLOBAL_MESSAGE_COOLDOWN' : 'MESSAGE_COOLDOWN'];
    const isLongEnough = msg.content.length >= XP[global === true ? 'GLOBAL_MIN_CHAR_LENGTH' : 'MIN_CHAR_LENGTH'];

    if (isMessageCooldownOver && isLongEnough) {
      const xpAmount = global === true ? XP.GLOBAL_XP_PER_MESSAGE : XP.XP_PER_MESSAGE;
      this.messages.set(key, Date.now());

      if (user.xp + xpAmount >= nextLevel.xp) {
        const newDbUser = global === true ? await msg.client.db.globalUserRepo.modifyLevel(msg.member, nextLevel.level - msg.globalDbUser.level) : await msg.client.db.userRepo.modifyLevel(msg.dbGuild, msg.member, nextLevel.level - msg.dbUser.level);

        if (global === false) {
          await msg.client.db.userRepo.modifySkillPoints(msg.dbGuild, msg.member, 2);
        }

        if (msg.dbUser.dmPermission !== false) {
          await Text.createEmbed(msg.author, 'Congratulations, you\'ve ' + (newDbUser.level === LEVELS.length ? 'achieved the maximum level we currently have' : 'advanced to level ' + newDbUser.level) + (global === true ? ' globally' : '') + '!', { footer: global === true ? undefined : { text: msg.guild.name, icon: msg.guild.iconURL } });
        }
      }
      return global === true ? msg.client.db.globalUserRepo.modifyXP(msg.member, xpAmount) : msg.client.db.userRepo.modifyXP(msg.dbGuild, msg.member, xpAmount);
    }
  }

  getNextLevel(dbUser) {
    const levelInfo = LEVELS.find(x => dbUser.xp < x.XP_REQUIRED);

    if (levelInfo !== undefined) {
      return { xp: levelInfo.XP_REQUIRED, level: levelInfo.LEVEL };
    }

    return null;
  }
}

module.exports = new XPService();