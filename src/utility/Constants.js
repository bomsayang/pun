class Constants {
  constructor() {
    this.AUTO_SPAM = {
      COOLDOWN: 1000,
      SIMILARITY: 0.90,
      MESSAGES_REQUIRED: 5,
      MUTE_LENGTH: 1800000
    };

    this.DEFAULT_PREFIX = 'p!';

    this.DISABLED_EVENTS = [
      'CHANNELS_PIN_UPDATE',
      'MESSAGE_DELETE_BULK',
      'MESSAGE_REACTION_ADD',
      'MESSAGE_REACTION_REMOVE',
      'MESSAGE_REACTION_REMOVE_ALL',
      'MESSAGE_UPDATE',
      'RELATIONSHIP_ADD',
      'RELATIONSHIP_REMOVE',
      'RESUMED',
      'TYPING_START',
      'USER_NOTE_UPDATE',
      'VOICE_SERVER_UPDATE',
      'VOICE_STATE_UPDATE'
    ];

    this.EMBED_COLORS = {
      ERROR: [255, 0, 0],
      DEFAULTS: [
        [255, 38, 154],
        [255, 190, 17],
        [255, 28, 142],
        [255, 105, 180],
        [255, 131, 250],
        [252, 184, 41],
        [242, 38, 255],
        [168, 237, 0],
        [160, 36, 237],
        [147, 112, 219],
        [104, 255, 34],
        [41, 84, 255],
        [8, 248, 255],
        [0, 255, 0],
        [0, 232, 255],
        [0, 245, 255],
        [0, 255, 127]
      ],
      BAN: [255, 0, 0],
      CLEAR: [0, 29, 255],
      MUTE: [255, 114, 14],
      UNBAN: [19, 255, 25],
      KICK: [255, 160, 36],
      WARN: [249, 222, 69],
      UNMUTE: [109, 237, 94],
      AUTO_MUTE: [152, 25, 232]
    };

    this.REGEXES = {
      CAPITALIZE: /\w\S*/g,
      PREFIX: prefix => new RegExp('^' + this.REGEXES.ESCAPE_REGEX(prefix)),
      ESCAPE_REGEX: str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    };

    this.GUILD_SETTINGS = {
      PREFIX_LENGTH: 5
    };

    this.INTERVALS = {
      AUTO_UNMUTE: 30000,
      AUTO_REMOVE_POLL: 30000
    };

    this.LEADERBOARD_CAP = 10;

    this.POLLS = {
      ELDER_TIME_REQUIRED: 172800000,
      MAX_ANSWERS: 6,
      MAX_ANSWER_CHAR: 20,
      MAX_CHAR: 40
    };

    this.MAX_GAME_LENGTH = 128;

    this.XP = {
      MESSAGE_COOLDOWN: 15000,
      MIN_CHAR_LENGTH: 5,
      XP_PER_MESSAGE: 3,
      GLOBAL_MESSAGE_COOLDOWN: 15000,
      GLOBAL_MIN_CHAR_LENGTH: 10,
      GLOBAL_XP_PER_MESSAGE: 1
    };

    this.SKILLS = [
      'magic',
      'damage',
      'healing',
      'craftmanship',
      'intelligence',
      'haste'
    ];

    this.LEVELS = [
      {
        LEVEL: 1,
        XP_REQUIRED: 20
      },
      {
        LEVEL: 2,
        XP_REQUIRED: 60
      },
      {
        LEVEL: 3,
        XP_REQUIRED: 140
      },
      {
        LEVEL: 4,
        XP_REQUIRED: 190
      },
      {
        LEVEL: 5,
        XP_REQUIRED: 237
      },
      {
        LEVEL: 6,
        XP_REQUIRED: 291
      },
      {
        LEVEL: 7,
        XP_REQUIRED: 371
      },
      {
        LEVEL: 8,
        XP_REQUIRED: 452
      },
      {
        LEVEL: 9,
        XP_REQUIRED: 500
      },
      {
        LEVEL: 10,
        XP_REQUIRED: 571
      },
      {
        LEVEL: 11,
        XP_REQUIRED: 624
      },
      {
        LEVEL: 12,
        XP_REQUIRED: 691
      },
      {
        LEVEL: 13,
        XP_REQUIRED: 742
      },
      {
        LEVEL: 14,
        XP_REQUIRED: 783
      },
      {
        LEVEL: 15,
        XP_REQUIRED: 824
      },
      {
        LEVEL: 16,
        XP_REQUIRED: 853
      },
      {
        LEVEL: 17,
        XP_REQUIRED: 912
      },
      {
        LEVEL: 18,
        XP_REQUIRED: 984
      },
      {
        LEVEL: 19,
        XP_REQUIRED: 1114
      },
      {
        LEVEL: 20,
        XP_REQUIRED: 1432
      },
      {
        LEVEL: 21,
        XP_REQUIRED: 1754
      },
      {
        LEVEL: 22,
        XP_REQUIRED: 2100
      },
      {
        LEVEL: 23,
        XP_REQUIRED: 2490
      },
      {
        LEVEL: 24,
        XP_REQUIRED: 2813
      },
      {
        LEVEL: 25,
        XP_REQUIRED: 3256
      },
      {
        LEVEL: 26,
        XP_REQUIRED: 3679
      },
      {
        LEVEL: 27,
        XP_REQUIRED: 4096
      },
      {
        LEVEL: 28,
        XP_REQUIRED: 4486
      },
      {
        LEVEL: 29,
        XP_REQUIRED: 5009
      },
      {
        LEVEL: 30,
        XP_REQUIRED: 5526
      }
    ];
  }
}

module.exports = new Constants();