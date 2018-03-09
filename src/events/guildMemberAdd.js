const client = require('../structures/Client.js');
const Text = require('../utility/Text.js');

client.on('guildMemberAdd', async member => {
  const dbGuild = await client.db.guildRepo.getGuild(member.guild.id);

  if (dbGuild.settings.welcomeMessage !== null) {
    const text = new Text();

    await text.tryDM(member.user, dbGuild.settings.welcomeMessage);
  }

  if (dbGuild.roles.auto !== null) {
    return member.addRole(dbGuild.roles.auto);
  }
});