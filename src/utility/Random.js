class Random {
  static nextInt(min, max) {
    return Math.floor(Math.random() * (max - min) + 1) + min;
  }

  static arrayElement(array) {
    return array[Random.nextInt(0, array.length)];
  }
}

module.exports = Random;