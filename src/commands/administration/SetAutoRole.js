const { Command, Argument } = require('patron.js');
const utility = require('../../utility/');

class SetAutoRole extends Command {
    constructor() {
        super({
            names: ['setautorole', 'setguildautorole', 'autoroleset'],
            groupName: 'administration',
            description: 'Sets the role to be assigned to new members.',
            botPermissions: ['MANAGE_ROLES'],
            args: [
                new Argument({
                    name: 'role',
                    key: 'role',
                    type: 'role',
                    example: 'Members',
                    preconditions: ['hierarchy'],
                    remainder: true
                })
            ]
        });
    }

    async run(msg, args, text) {
        await msg.client.db.guildRepo.upsertGuild(msg.guild.id, { $set: { 'roles.auto': args.role.id } });
        return text.reply('You\'ve successfully set the guild\'s autorole to `' + args.role + '`.');
    }
}

module.exports = new SetAutoRole();
