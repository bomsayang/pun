const client = require('../structures/Client.js');
const { Text, String, Constants, Random, Utils } = require('../utility');

class ModerationService {
  getPermLevel(dbGuild, member) {
    if (member.guild.ownerID === member.id) {
      return 3;
    }

    let permLevel = 0;

    for (const modRole of dbGuild.roles.mod.sort((a, b) => a.permissionLevel - b.permissionLevel)) {
      if (member.guild.roles.has(modRole.id) && member.roles.has(modRole.id)) {
        permLevel = modRole.permissionLevel;
      }
    }

    return member.hasPermission('ADMINISTRATOR') === true && permLevel < 2 ? 2 : permLevel;
  }

  tryInformUser(guild, author, action, user, reason = '') {
    return Utils.try(Text.createEmbed(user, String.boldify(author.tag) + ' has ' + action + ' you' + (String.isNullOrWhiteSpace(reason) ? '.' : ' for the following reason: ' + reason + '.'), { footer: { text: guild.name, icon: guild.iconURL } }));
  }

  async tryModLog(dbGuild, guild, action, color = null, reason = '', moderator = null, user = null, extraInfoType = '', extraInfo = '') {
    if (dbGuild.channels.modLog === null) {
      return false;
    }

    const channel = guild.channels.get(dbGuild.channels.modLog);

    if (channel === undefined) {
      return false;
    }

    const options = {
      color: color !== null ? color : Random.arrayElement(Constants.EMBED_COLORS.DEFAULTS),
      footer: {
        text: 'Case #' + dbGuild.misc.caseNumber,
        icon: 'https://i.imgur.com/va0CJr2.png'
      },
      timestamp: true,
      title: 'New moderator action.'
    };

    if (moderator !== null) {
      options.author = {
        name: moderator.tag,
        icon: moderator.displayAvatarURL
      };
    }

    let description = '**Action:** ' + action + '\n';

    if (String.isNullOrWhiteSpace(extraInfoType) === false) {
      description += '**' + extraInfoType + ':** ' + extraInfo + '\n';
    }

    if (user !== null) {
      description += '**User:** ' + user.tag + ' (' + user.id + ')\n';
    }

    if (String.isNullOrWhiteSpace(reason) === false) {
      description += '**Reason:** ' + reason + '\n';
    }

    await client.db.guildRepo.upsertGuild(dbGuild.guildId, { $inc: { 'misc.caseNumber': 1 } });

    return Text.createEmbed(channel, description, options);
  }
}

module.exports = new ModerationService();