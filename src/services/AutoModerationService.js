const Constants = require('../utility/Constants.js');
const Discord = require('discord.js');
const Logger = require('cus-log');

class AutoModerationService {
  constructor() {
    this.messages = new Map();
  }

  async muteForSpam(msg) {
    const role = msg.guild.roles.get(msg.dbGuild.roles.muted);
    const lastMessage = this.messages.get(msg.author.id);
    const isMessageCooldownOver = lastMessage === undefined || Date.now() - lastMessage > Constants.moderation.defaultMessageCooldown;

    if (isMessageCooldownOver) {
      await msg.author.addRole(role);
      return Logger.log(1, `${msg.author.username} spammed.`);
    }
  }
}

module.exports = new AutoModerationService();