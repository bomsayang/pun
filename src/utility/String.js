const Constants = require('./Constants.js');

class String {
  boldify(string) {
    return '**' + string.replace(/(\*|~|`|_)+/g, '') + '**';
  }

  isNullOrWhiteSpace(input) {
    return typeof input !== 'string' || input.trim().length === 0;
  }

  capitializeWords(str) {
    return str.replace('_', ' ').replace(Constants.REGEXES.CAPITALIZE, (x) => x.charAt(0).toUpperCase() + x.substr(1));
  }

  upperFirstChar(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  list(array, beginning = '', end = '') {
    let string = '';

    for (let i = 0; i < array.length; i++) {
      string += beginning + array[i] + end;

      if (i !== array.length - 1) {
        string += ', ';
      }
    }

    return string;
  }

  getSimiliarity(msg, secondMsg) {
    const shorter = msg.length > secondMsg.length ? secondMsg : msg;
    const longer = msg.length < secondMsg.length ? secondMsg : msg;

    if (longer.length === 0) {
      return 1;
    }

    return (longer.length - this.editDistance(longer, shorter)) / Number.parseFloat(longer.length);
  }

  editDistance(msg, secondMsg) {
    const lowerMsg = msg.toLowerCase();
    const lowerSecondMsg = secondMsg.toLowerCase();
    const costs = [];

    for (let i = 0; i <= lowerMsg.length; i++) {
      let lastValue = i;

      for (let j = 0; j <= lowerSecondMsg.length; j++) {
        if (i === 0) {
          costs[j] = j;
        } else if (j > 0) {
          let newValue = costs[j - 1];

          if (lowerMsg.charAt(i - 1) !== lowerSecondMsg.charAt(j - 1)) {
            newValue = Math.min(Math.min(newValue, i), costs[j]) + 1;
          }

          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }

      if (i > 0) {
        costs[lowerSecondMsg.length] = lastValue;
      }
    }
    return costs[lowerSecondMsg.length];
  }
}

module.exports = new String();