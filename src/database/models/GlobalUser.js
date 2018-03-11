class GlobalUser {
  constructor(userId) {
    this.userId = userId;
    this.level = 0;
    this.xp = 0;
    this.dmPermission = false;
  };
}

module.exports = GlobalUser;