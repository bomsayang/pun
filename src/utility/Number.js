class Number {
  isEven(input) {
    return input % 2 === 0;
  }

  daysToMs(input) {
    return input * 86400000;
  }

  msToTime(input) {
    return {
      milliseconds: parseInt(input % 1000 / 100),
      seconds: parseInt(input / 1000) % 60,
      minutes: parseInt(input / (1000 * 60) % 60),
      hours: parseInt(input / (1000 * 60 * 60) % 24),
      days: parseInt(input / (1000 * 60 * 60 * 24))
    };
  }

  hoursToMs(input) {
    return input * 3600000;
  }

  formattedDate(date) {
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true
    };

    return date.toLocaleString('en-US', options);
  }
}

module.exports = new Number();