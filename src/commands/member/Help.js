const { Command, Argument, Context } = require('patron.js');
const { Constants, String } = require('../../utility');

class Help extends Command {
  constructor() {
    super({
      names: ['help', 'command'],
      groupName: 'member',
      description: 'Shows information on a command',
      usableContexts: [Context.Guild, Context.DM],
      args: [
        new Argument({
          key: 'command',
          name: 'command',
          type: 'string',
          example: 'help',
          defaultValue: ''
        })
      ]
    });
  }

  run(msg, args, text) {
    if (String.isNullOrWhiteSpace(args.command)) {
      const groups = msg.client.registry.groups;
      let allCommands = 'Here\'s all of the commands available:\n';

      for (let i = 0; i < groups.length; i++) {
        const groupCommands = groups[i].commands;
        allCommands += String.boldify(String.upperFirstChar(groups[i].name)) + ': ';

        for (let k = 0; k < groupCommands.length; k++) {
          allCommands += String.upperFirstChar(groupCommands[k].names[0]) + ', ';
        }

        allCommands = allCommands.substring(0, allCommands.length - 2) + '\n';
      }

      const prefix = msg.guild !== null ? msg.dbGuild.settings.prefix : Constants.DEFAULT_PREFIX;

      return text.send(allCommands + '\n\nThe command prefix ' + (msg.guild !== null ? 'for this guild' : '') + ' is ' + prefix + '.\n\nUse `' + prefix + 'help <command>` to view a command\'s details.');
    }

    const lowerInput = args.command.toLowerCase();
    const command = msg.client.registry.commands.find(c => c.names.some(x => x.toLowerCase() === lowerInput));

    if (command === undefined) {
      return text.sendError('This command doesn\'t exist.');
    }

    const aliases = String.list(command.names.map(i => String.upperFirstChar(i)), '`', '`');
    const commandInfo = (aliases.length === 1 ? '' : '\n**Aliases**: ' + aliases) + '\n**Description**: `' + command.description + '`\n**Usage**: `' + (msg.guild !== null ? msg.dbGuild.settings.prefix : Constants.DEFAULT_PREFIX) + command.getUsage() + '`\n**Example**: `' + (msg.guild !== null ? msg.dbGuild.settings.prefix : Constants.DEFAULT_PREFIX) + command.getExample() + '`';

    return text.send(commandInfo, { title: String.upperFirstChar(command.names[0]) + ' - ' + String.upperFirstChar(command.group.name) });
  }
}

module.exports = new Help();