const env = require("../config");

const config = {
    "token": env.BOT_TOKEN,
    "prefix": "~",
    "ksoftapi": "LyricsAPI",
    "youtubeCookie": "",
    "spotify_api":{
        "enabled": true, "_COMMENT_": "Set it to false if you want to scrape, when on true you can get spotify playlists with 100+ tracks",
        "clientSecret": env.SPOTIFY_CLIENT_SECRET,
        "clientId": env.SPOTIFY_CLIENT_ID
    },
    "loadSlashGlobal":true, "_COMMENT_": "Set it to true, when your Slash Commands are ready, false loads instant true loads slow but stable! (GLOBAL/GUILD COMMANDS, DISCORD DOCS!)"
}

module.exports = config;