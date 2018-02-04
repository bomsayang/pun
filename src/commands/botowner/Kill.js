const { Command, Argument } = require('patron.js');
const { inspect } = require('util');
const logger = require('cus-log');

class Kill extends Command {
    constructor() {
        super({
            names: ['kill', 'killbot', 'end'],
            groupName: 'botowner',
            description: 'Kills the Node process.',
            guildOnly: false
        });
    }

    async run(msg, text) {
        const channel = msg.channel
        text.send('Say "yes" to confirm you want to kill the Node process.');
        const result = await channel.awaitMessages((x) => x.content.toLowerCase() === 'yes' && x.author.id === msg.author.id, { max: 1, time: 30000 });
        if (result.size === 1) {
            await text.reply('Killing Node application...');
            await logger.log(2, `Process is exiting. Command executed by ${msg.author}.`);
            process.exit();
        }
    }
}

module.exports = new Kill();