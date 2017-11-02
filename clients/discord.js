const Eris = require('eris')
module.exports = function (command) {
  logger.log('Starting Discord...')
  let token = JSON.parse(localStorage.tokens).discord;
  let bot = new Eris("Bot " + token);
  bot.on("ready", () => {
    document.getElementById('dstatus').innerHTML = "Connected!"
    document.getElementById('dstatus').className = "good"
    logger.log('Started Discord!')
  });
  bot.on('messageCreate', (msg) => {
    if (msg.content.startsWith(JSON.parse(localStorage.options).prefix || '/')) {
      let cmd = msg.content.split(' ');
      let args = cmd.slice(1);
      let msgFormatted = {
        raw: {
          source: 'discord',
          msg: msg
        },
        sender: {
          name: `@${msg.author.username}#${msg.author.discriminator}`
        },
        command: cmd[0].replace(JSON.parse(localStorage.options).prefix || '/', ''),
        args: args,
        text: msg.content
      }
      command(msgFormatted, (text) => {
        if (text) {
          bot.createMessage(msg.channel.id, text)
        }
      })
    }
  })
  bot.connect();
  document.getElementById('dstatus').innerHTML = "Connecting..."
  document.getElementById('dstatus').className = "maybe"
  return bot;
}
