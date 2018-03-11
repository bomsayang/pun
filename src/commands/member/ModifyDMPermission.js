const { Command, Argument, ArgumentDefault } = require('patron.js');
const String = require('../../utility/String.js');
const Logger = require('./../../utility/Logger.js');

class ModifyDMPermissions extends Command {
    constructor() {
        super({
            names: ['modifydms', 'modifydmperms'],
            groupName: 'member',
            description: 'Enable DMs when you level up.'
        });
    }

    async run(msg, args, text) {
        const value = msg.globalDbUser.dmPermission === true ? false : true;
        const newDbUser = await msg.client.db.globalUserRepo.findUserAndUpsert(msg.author.id, { $set: { dmPermission: value}});
        return text.reply('Success. Your new value is: `' + value + '`.');
    }
}

module.exports = new ModifyDMPermissions();