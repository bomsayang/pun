const { Constants, String } = require('../utility/');
const { Collection } = require('discord.js');
const ModerationService = require('./ModerationService.js');

class SpamService {
  constructor() {
    this.messages = new Collection();
    this.data = { count: 1, timestamp: null, lastMessage: null };
  }

  _shouldHandle(msg) {
    const mutedRole = msg.dbGuild.roles.muted;

    if (mutedRole === null || msg.member.roles.has(mutedRole) === true || msg.guild.roles.get(mutedRole) === undefined) {
      return false;
    }

    return true;
  }

  async handle(msg) {
    if (this._shouldHandle(msg) === false) {
      return;
    }

    const key = msg.author.id + '-' + msg.guild.id;
    const value = this.messages.get(key);
    const count = value !== undefined ? value.count : 1;

    if (value !== undefined && String.getSimiliarity(value.lastMessage.content, msg.content) < Constants.AUTO_SPAM.SIMILARITY) {
      this.data.count = 1;
      this.data.lastMessage = msg;

      return this.messages.set(key, this.data);
    }

    this.data.count = count;

    if (this.data.timestamp !== null) {
      this.data.timestamp = Date.now() - this.data.timestamp;
    }

    this.messages.set(key, this.data);

    const cooldown = this.messages.get(key).timestamp === null || this.messages.get(key).timestamp < Constants.AUTO_SPAM.COOLDOWN;

    if (cooldown) {
      this.data.count++;
      this.data.lastMessage = msg;
      this.data.timestamp = Date.now();
      this.messages.set(key, this.data);

      if (this.messages.get(key).count > Constants.AUTO_SPAM.MESSAGES_REQUIRED) {
        this.data.count = 1;
        const mutedRole = msg.dbGuild.roles.muted;

        if (msg.guild.roles.get(mutedRole) === undefined) {
          return;
        }

        await msg.member.addRole(mutedRole);
        await ModerationService.tryInformUser(msg.guild, msg.client.user, 'automatically muted', msg.member.user, 'for sending multiple similar messages in rapid succession');
        await ModerationService.tryModLog(msg.dbGuild, msg.guild, 'Automatic Mute', Constants.EMBED_COLORS.AUTO_MUTE, 'Sending multiple similar messages in rapid succession.', msg.client.user, msg.member.user, 'Length', Number.parseFloat(Constants.AUTO_SPAM.MUTE_LENGTH / (1000 * 60 * 60) % 24) + ' hours');

        return msg.client.db.muteRepo.insertMute(msg.member.id, msg.guild.id, Constants.AUTO_SPAM.MUTE_LENGTH);
      }
    } else {
      this.data.count = 1;
      this.data.timestamp = Date.now();
    }
  }
}

module.exports = new SpamService();