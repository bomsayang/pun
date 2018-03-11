const { Command, Argument, ArgumentDefault } = require('patron.js');
const String = require('../../utility/String.js');

class DisableDMs extends Command {
    constructor() {
        super({
            names: ['disabledms', 'disabledm'],
            groupName: 'member',
            description: 'Disable DMs when you level up.'
        });
    }

    async run(msg, args, text) {
        await msg.client.db.globalUserRepo.modifyDmPermissions(msg.author.id, false);
        return text.reply('You\'ve disabled DMs upon levelling up.');
    }
}

module.exports = new DisableDMs();