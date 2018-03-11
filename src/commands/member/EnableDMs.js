const { Command, Argument, ArgumentDefault } = require('patron.js');
const String = require('../../utility/String.js');

class EnableDMs extends Command {
    constructor() {
        super({
            names: ['enabledms', 'enabledm'],
            groupName: 'member',
            description: 'Enable DMs when you level up.'
        });
    }

    async run(msg, args, text) {
        await msg.client.db.globalUserRepo.modifyDmPermissions(msg.author.id, true);
        return text.reply('You\'ve enabled DMs upon levelling up.');
    }
}

module.exports = new EnableDMs();