const TelegramBot = require('node-telegram-bot-api');

module.exports = function(command) {
  logger.log('Started telegram!')
  let token = JSON.parse(localStorage.tokens).telegram;
  let bot = new TelegramBot(token, {polling: true});
  bot.onText(/\/(.*)/, (msg) => {
    let cmd = msg.text.split(' ');
    let args = cmd.slice(1);
    let msgFormatted = {
      raw: {
        source: 'telegram',
        msg: msg
      },
      sender: {
        name: msg.from.username
      },
      command: cmd[0].replace('/', '').split('@')[0],
      args: args,
      text: msg.text
    }
    command(msgFormatted, (text) => {
      bot.sendMessage(msg.chat.id, text)
    })
  });
  document.getElementById('tstatus').innerHTML = "Connected!"
  document.getElementById('tstatus').className = "good"
  return bot;
}
