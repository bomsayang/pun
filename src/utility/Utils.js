class Utils {
  static async try(promise) {
    try {
      await promise;

      return true;
    } catch (e) {
      return false;
    }
  }
}

module.exports = Utils;