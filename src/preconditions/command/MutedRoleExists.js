const { Precondition, PreconditionResult } = require('patron.js');

class MutedRoleExists extends Precondition {
  constructor() {
    super({
      name: 'mutedroleexists'
    });
  }

  run(cmd, msg) {
    if (msg.dbGuild.roles.muted === null) {
      return PreconditionResult.fromError(cmd, 'There must be a muted role set for the Auto Mod feature! Set one by using `' + msg.dbGuild.settings.prefix + 'setmutedrole <role>`.');
    } else if (msg.guild.roles.get(msg.dbGuild.roles.muted) === undefined) {
      return PreconditionResult.fromError(cmd, 'The muted role wasn\'t found. Set it again by using `' + msg.dbGuild.settings.prefix + 'setmutedrole <role>`.');
    }

    return PreconditionResult.fromSuccess();
  }
}

module.exports = new MutedRoleExists();