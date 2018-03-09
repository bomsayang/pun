const { Command, Argument, Context } = require('patron.js');
const String = require('../../utility/String.js');

class Groups extends Command {
  constructor() {
    super({
      names: ['groups', 'group', 'modules', 'module', 'categories', 'category'],
      groupName: 'member',
      description: 'All of the current command groups',
      usableContexts: [Context.Guild, Context.DM],
      args: [
        new Argument({
          key: 'group',
          name: 'group',
          type: 'string',
          example: 'member',
          defaultValue: '',
          remainder: true
        })
      ]
    });
  }

  run(msg, args, text) {
    const groups = msg.client.registry.groups;
    let groupInfo = '';

    if (String.isNullOrWhiteSpace(args.group)) {
      for (let i = 0; i < groups.length; i++) {
        groupInfo += String.upperFirstChar(groups[i].name) + ', ';
      }

      return text.send(groupInfo.substring(0, groupInfo.length - 2), { title: 'The Current Groups:' });
    }

    const lowerInput = args.group.toLowerCase();
    const group = groups.find(g => g.name === lowerInput);

    if (group === undefined) {
      return text.sendError('This group doesn\'t exist.');
    }

    for (let i = 0; i < group.commands.length; i++) {
      groupInfo += String.upperFirstChar(group.commands[i].names[0]) + ', ';
    }

    return text.send(groupInfo.substring(0, groupInfo.length - 2), { title: String.upperFirstChar(group.name) + '\'s Commands:' });
  }
}

module.exports = new Groups();