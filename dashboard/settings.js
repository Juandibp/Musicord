const dotenv = require("../config")

const settings = {
  "website" : {
    "support": "https://discord.gg/UbSUnhHBdC",
    "domain": "https://musicord-live-backup.glitch.me/"
  },
  "config": {
      "http": {
        "port": 3000
      },
      "https": {
          "paths": {
              "privkey": "/etc/letsencrypt/live/musicord.live/privkey.pem",
              "fullchain": "/etc/letsencrypt/live/musicord.live/fullchain.pem",
              "chain": "/etc/letsencrypt/live/musicord.live/chain.pem"
          },
          "enabled": false,
          "port": 443
      },
      "callback": "https://musicord-live-backup.glitch.me/callback",
      "clientID": dotenv.DISCORD_CLIENT_ID,
      "secret": dotenv.DISCORD_SECRET
  }
}

module.exports = settings;