const { Command, Argument } = require('patron.js');
const utility = require('../../utility/');

class DisableAutoRole extends Command {
    constructor() {
        super({
            names: ['disableautorole', 'disableguildautorole', 'autoroledisable'],
            groupName: 'administration',
            description: 'Sets the role to be assigned to new members.',
            args: [
                new Argument({
                    name: 'role',
                    key: 'role',
                    type: 'role',
                    example: '@Members'
                })
            ]
        });
    }

    async run(msg, args, text) {
        await msg.client.db.guildRepo.upsertGuild(msg.guild.id, { $set: { 'roles.auto': null } });

        return text.reply('You\'ve successfully disabled the guild\'s autorole.');
    }
}

module.exports = new DisableAutoRole();
