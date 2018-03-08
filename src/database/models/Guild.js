const Constants = require('../../utility/Constants.js');

class Guild {
  constructor(guildId) {
    this.guildId = guildId;

    this.roles = {
      mod: [],
      muted: null,
      auto: null
    };

    this.channels = {
      modLog: null
    };

    this.settings = {
      prefix: Constants.DEFAULT_PREFIX,
      autoMod: false,
      welcomeMessage: null
    };

    this.misc = {
      caseNumber: 1
    };
  }
}

module.exports = Guild;
