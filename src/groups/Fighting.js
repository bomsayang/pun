const { Group } = require('patron.js');

class Fighting extends Group {
  constructor() {
    super({
      name: 'fighting',
      description: 'Fighting commands for any member to use'
    });
  }
}

module.exports = new Fighting();