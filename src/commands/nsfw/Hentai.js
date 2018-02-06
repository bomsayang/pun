const { Command, Argument } = require('patron.js');
const utility = require('../../utility');
const Discord = require('discord.js');
const fs = require('fs');


class RandomHentai extends Command {
  constructor() {
    super({
      names: ['randomhentai', 'ranhentai'],
      groupName: 'nsfw',
      description: 'Sends some random Hentai!',
      args: [
        new Argument({
          key: "tag",
          name: "tag",
          type: "string",
          example: "big boobs",
          remainder: true
        })
      ]
    });
  }

  async run(msg, args, text) {

    let booru = new Danbooru()
    booru.posts(args.tag).then(async posts => {
      let file = posts[0].file
      let data = await file.download()
      require('fs').writeFile(file.name, data);
  })
}

module.exports = new RandomHentai();