const { Command, Context } = require('patron.js');
const Number = require('../../utility/Number.js');

class Statistics extends Command {
  constructor() {
    super({
      names: ['statistics', 'stats'],
      groupName: 'member',
      description: 'Statistics about the Pixel bot.',
      usableContexts: [Context.Guild, Context.DM]
    });
  }

  async run(msg, args, text) {
    const uptime = Number.msToTime(msg.client.uptime);

    await text.dmFields([
      'Authors', '`Lumite#1234\nAssley#0911\nLuner#0059`',
      'Framework', 'patron.js',
      'Memory', (process.memoryUsage().rss / 2 ** 20).toFixed(2) + ' MB',
      'Servers', msg.client.guilds.size.toLocaleString(),
      'Users', msg.client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString(),
      'Uptime', 'Days: ' + uptime.days + '\nHours: ' + uptime.hours + '\nMinutes: ' + uptime.minutes
    ], { inline: true });

    if (msg.channel.type !== 'dm') {
      return text.reply('You have been DMed with all Pixel statistics!');
    }
  }
}

module.exports = new Statistics();