const {
    MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.js");
var ee = require("../../botconfig/embed.json");
const settings = require("../../botconfig/settings.json");
module.exports = {
    name: "invite", //the command name for execution & for helpcmd [OPTIONAL]

    category: "Info",
    usage: "invite",
    aliases: ["inviteme", "addme",],

    cooldown: 5, //the command cooldown for execution & for helpcmd [OPTIONAL]
    description: "Sends you an invite link", //the command description for helpcmd [OPTIONAL]
    memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
    requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
    alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
    run: async (client, message, args) => {
        try {
            message.reply({
                embeds: [
                    new MessageEmbed().setColor(ee.color)
                        .setFooter(ee.footertext, ee.footericon)
                        .setDescription(`[**Click here to invite me!**](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands)\n\n||[**Click here to invite me __without__ Slash Commands!**](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot)||`)
                ]
            });
        } catch (e) {
            console.log(String(e.stack).bgRed)
        }
    }
}
