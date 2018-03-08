const { Handler, CommandError, Context } = require('patron.js');
const { DiscordAPIError } = require('discord.js');
const Constants = require('../utility/Constants.js');
const Logger = require('../utility/Logger.js');
const Text = require('../utility/Text.js');
const XPService = require('../services/XPService.js');
const SpamService = require('../services/SpamService.js');
const client = require('../structures/Client.js');
const handler = new Handler({ registry: client.registry });
const contexts = {
  [Context.Guild]: 'server',
  [Context.DM]: 'DMs',
  [Context.Group]: 'group DMs'
};

client.on('message', async msg => {
  if (msg.author.bot) {
    return;
  }

  const prefix = msg.guild !== null ? (await client.db.guildRepo.getGuild(msg.guild.id)).settings.prefix : Constants.DEFAULT_PREFIX;

  if (msg.guild !== null) {
    msg.dbGuild = await client.db.guildRepo.getGuild(msg.guild.id);
    msg.dbUser = await client.db.userRepo.getUser(msg.author.id, msg.guild.id);
    msg.globalDbUser = await client.db.globalUserRepo.getUser(msg.author.id);

    if (Constants.REGEXES.PREFIX(prefix).test(msg.content) === false) {
      if (msg.dbGuild.settings.autoMod === true) {
        await SpamService.handle(msg);
      }

      await XPService.giveXP(msg);

      return XPService.giveXP(msg, false);
    }
  }

  if (msg.channel.type === 'dm' && Constants.REGEXES.PREFIX(prefix).test(msg.content) === false) {
    return;
  }

  const text = new Text(msg);
  const result = await handler.run(msg, prefix.length, text);

  if (result.success === false) {
    let message;

    switch (result.commandError) {
      case CommandError.CommandNotFound: {
        return;
      }
      case CommandError.Exception:
        if (result.error instanceof DiscordAPIError) {
          if (result.error.code === 0 || result.error.code === 404 || result.error.code === 50013) {
            message = 'I don\'t have permission to do this.';
          } else if (result.error.code === 50007) {
            message = 'I don\'t have permission to message you. Please allow DMs from server members.';
          } else if (result.error.code >= 500 && result.error.code < 600) {
            message = 'There has been a problem on Discord\'s end.';
          } else {
            message = result.errorReason;
          }
        } else {
          message = result.errorReason;

          Logger.error(result.error);
        }

        break;
      case CommandError.InvalidContext:
        message = 'This command can\'t be used in ' + (contexts[result.context] === 'server' ? 'a ' : '') + contexts[result.context];

        break;
      case CommandError.InvalidArgCount:
        message = 'You\'re incorrectly using this command.\n**Usage:** `' + prefix + result.command.getUsage() + '`\n**Example:** `' + prefix + result.command.getExample() + '`';

        break;
      default:
        message = result.errorReason;

        break;
    }

    return text.sendError(message);
  }
});