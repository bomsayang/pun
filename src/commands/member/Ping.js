const { Command, Context } = require('patron.js');
const { RichEmbed } = require('discord.js');
const { Constants, Random } = require('../../utility');

class Ping extends Command {
  constructor() {
    super({
      names: ['ping', 'latency'],
      groupName: 'member',
      description: 'Shows the heartbeat ping and message ping',
      usableContexts: [Context.Guild, Context.DM]
    });
  }

  async run(msg, args, text) {
    const sent = await text.send('Pinging...');
    const embed = new RichEmbed()
      .setColor(Random.arrayElement(Constants.EMBED_COLORS.DEFAULTS))
      .setTitle('Ping')
      .setTimestamp()
      .setDescription('**Heartbeat**: ' + Math.round(msg.client.ping) + ' ms.\n**Message Ping**: ' + Math.round(sent.createdTimestamp - msg.createdTimestamp) + ' ms.');

    return sent.edit({ embed });
  }
}

module.exports = new Ping();