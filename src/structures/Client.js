const { Client: DiscordJSClient } = require('discord.js');
const Constants = require('../utility/Constants.js');
const Logger = require('../utility/Logger.js');
const Database = require('../database/Database.js');
const credentials = require('./../../credentials.json');

class Client extends DiscordJSClient {
  constructor(config) {
    super({
      fetchAllMembers: true,
      disableEveryone: true,
      messageCacheMaxSize: 5,
      messageCacheLifetime: 10,
      messageSweepInterval: 1800,
      disabledEvents: Constants.DISABLED_EVENTS
    });

    this.config = config;
    this.db = new Database();
  }

  init() {
    return this.login(this.config.token).catch(err => Logger.error(err));
  }
}

module.exports = new Client(credentials);