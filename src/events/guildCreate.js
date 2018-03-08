const client = require('../structures/Client.js');
const Text = require('../utility/Text.js');

client.on('guildCreate', async guild => {
  client.user.setActivity('on ' + client.guilds.size + ' guild' + (client.guilds.size > 1 ? 's' : ''), { url: 'https://twitch.tv/lumitedubbz', type: 'STREAMING' });

  if (guild.systemChannel !== undefined) {
    return Text.createEmbed(guild.systemChannel, 'Hey there, I\'m Pixel. You can view all of my available commands by typing `' + (await client.db.guildRepo.getGuild(guild.id)).settings.prefix + 'help`.\nShould you need support, you can join **the official support server:** https://discord.me/pixelsupport\n**Report any issues here:** https://github.com/lumitedubbz/pixel/issues');
  }
});