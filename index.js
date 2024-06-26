const Discord = require('discord.js')
const config = require('./botconfig/config.js')
const settings = require('./botconfig/settings.json')
const filters = require('./botconfig/filters.json')
const colors = require('colors')
const Enmap = require('enmap')
const libsodium = require('libsodium-wrappers')
const ffmpeg = require('ffmpeg-static')
const voice = require('@discordjs/voice')
const DisTube = require('distube').default
const https = require('https-proxy-agent')
const client = new Discord.Client({
    //fetchAllMembers: false,
    //restTimeOffset: 0,
    //restWsBridgeTimeout:100,
    shards: 'auto',
    //shardCount: 5,
    allowedMentions: {
        parse: [],
        repliedUser: false,
    },
    partials: ['CHANNEL', 'MESSAGE', 'REACTION'],
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_VOICE_STATES,
    ],
    presence: {
        activity: {
            name: `~help`,
            type: 'PLAYING',
        },
        status: 'online',
    },
})

const { SpotifyPlugin } = require('@distube/spotify')
const { SoundCloudPlugin } = require('@distube/soundcloud')
let spotifyoptions = {
    parallel: true,
    emitEventsAfterFetching: true,
}
if (config.spotify_api.enabled) {
    spotifyoptions.api = {
        clientId: config.spotify_api.clientId,
        clientSecret: config.spotify_api.clientSecret,
    }
}
client.distube = new DisTube(client, {
    emitNewSongOnly: true,
    leaveOnEmpty: true,
    leaveOnFinish: true,
    leaveOnStop: true,
    savePreviousSongs: true,
    emitAddSongWhenCreatingQueue: false,
    //emitAddListWhenCreatingQueue: false,
    searchSongs: 0,
    youtubeCookie: config.youtubeCookie,
    nsfw: true,
    emptyCooldown: 25,
    ytdlOptions: {
        //requestOptions:{
        //    agent //Mejor no tocar
        //}
        highWaterMark: 1024 * 1024 * 64,
        quality: 'highestaudio',
        format: 'audioonly',
        liveBuffer: 60000,
        dlChunkSize: 1024 * 1024 * 64,
        username: 'juandibpcr@gmail.com',
        password: 'Metal1416',
    },
    youtubeDL: true,
    updateYouTubeDL: true,
    customFilters: filters,
    plugins: [new SpotifyPlugin(spotifyoptions), new SoundCloudPlugin()],
})

//Define global Collecions
client.commands = new Discord.Collection()
client.cooldowns = new Discord.Collection()
client.slashCommands = new Discord.Collection()
client.aliases = new Discord.Collection()
client.categories = require('fs').readdirSync('./commands')
client.allEmojis = require('./botconfig/emojis.json')

client.setMaxListeners(100)
require('events').defaultMaxListeners = 100

client.settings = new Enmap({
    name: 'settings',
    dataDir: './databases/settings',
})
client.infos = new Enmap({ name: 'infos', dataDir: './databases/infos' })

//Require Handlers + Anticrashers
;[
    'events',
    'commands',
    'slashCommands',
    settings.antiCrash ? 'antiCrash' : null,
    'distubeEvent',
]
    .filter(Boolean)
    .forEach((h) => {
        require(`./handlers/${h}`)(client)
    })

//start the bot
client.login(config.token)

//load dashboard
client.on('ready', () => {
    client.user.setActivity('you type commands uwu', { type: 'WATCHING' })
    console.log(`${client.user.username} is fully active.`)
    let guilds = client.guilds.cache.map((guild) => guild.id + ' ' + guild.name) // for discord v11 //let guilds = client.guilds.map(guild => guild.id)
    console.log(guilds)
    //client.guilds.cache.get("734892196993695856").leave()
    console.log('test')

    require('./dashboard/index')(client)
})
