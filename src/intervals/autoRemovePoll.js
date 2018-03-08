const client = require('../structures/Client.js');
const { Constants, Text, Utils } = require('../utility/');

client.setInterval(async () => {
  const polls = await client.db.pollRepo.findMany();

  for (let i = 0; i < polls.length; i++) {
    if (Date.now() - polls[i].createdAt - polls[i].length <= 0) {
      continue;
    }

    await client.db.pollRepo.deleteById(polls[i]._id);

    const guild = client.guilds.get(polls[i].guildId);

    if (guild === undefined) {
      continue;
    }

    const creator = guild.member(polls[i].creatorId);

    if (creator === null) {
      continue;
    }

    let choices = '';

    for (const key in polls[i].choices) {
      choices += '`' + key + '` Votes: ' + polls[i].choices[key] + ', ';
    }

    return Utils.try(Text.createEmbed(creator.user, choices.substring(0, choices.length - 2), { title: 'Results of the poll ' + polls[i].name, footer: { text: guild.name, icon: guild.iconURL } }));
  }
}, Constants.INTERVALS.AUTO_REMOVE_POLL);
