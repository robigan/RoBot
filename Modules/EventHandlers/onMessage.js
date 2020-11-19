const EventHandler = require("../../Structures/EventHandler.js");

module.exports = class extends EventHandler {
    constructor(...args) {
        super(...args, "Default message event handler");
    }

    async register() {
        this.client.on("message", (message) => {
            const mentionRegex = RegExp(`^<@!${this.user.id}>$`);
            const mentionRegexPrefix = RegExp(`^<@!${this.user.id}> `);

            function STFU (Chance) {
                if (Math.floor(Math.random()*Chance) === 1) {
                    message.reply("STFU");
                    return true;
                }
            }
            if (STFU(100)) return;

            if (!message.guild || message.author.bot) return;

            if (message.content.match(mentionRegex)) message.reply(`My prefix for this guild is \`${this.prefix}\` :D`);
            const prefix = message.content.match(mentionRegexPrefix) ? message.content.match(mentionRegexPrefix)[0] : this.prefix;
            const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g);

            //To patch running multiple commands
            const command = this.client.commands.get(cmd.toLowerCase()) || this.client.commands.get(this.aliases.get(cmd.toLowerCase()));
            if (command) {
                if (STFU(20)) return;
                message.guild.fetch().catch(err => {
                    console.error(err);
                    message.reply(`Error when fetching guild update, ${err}`);
                });
                command.run(message, args).catch(err => {
                    console.error(err);
                    message.reply(`Error when running command, ${err}`);
                });
            }
        });
    }
};