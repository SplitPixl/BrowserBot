const webRequire = require('./utils/webrequire.js')

let commands = localStorage.commands ? JSON.parse(localStorage.commands) : {}
let bots = {}

global.logger = require('./utils/logger.js')

function startBots() {
  let tokens = localStorage.tokens ? JSON.parse(localStorage.tokens) : {}
  if (tokens.telegram) {
    bots.telegram = require("./clients/telegram.js")(commandHandler)
  }
  if (tokens.discord) {
    bots.discord = require("./clients/discord.js")(commandHandler)
  }
  window.bots = bots
  document.getElementById('start').classList.toggle("hidden");
  document.getElementById('stop').classList.toggle("hidden");
}

function commandHandler(msg, callback) {
  commandList = JSON.parse(localStorage.commands)
  if (commandList[msg.command.toLowerCase()]) {
    logger.logCmd(msg);
    try{
      eval(`(msg, bots, require, done) => {${commandList[msg.command.toLowerCase()].code}}`)(msg, bots, webRequire, (text) => { // TODO: Make a webrequire module
        callback(text);
      });
    } catch (err) {
      console.log(err);
      logs.push({
        type: 'error',
        from: 'command',
        text: err.message
      })
    }
  }
}

function cmdIde() {
  let cmdIde = document.querySelector('.cmdide')
  cmdIde.classList.toggle('hidden')
}

document.getElementById("start").addEventListener('click', startBots)
document.querySelector(".cmdidebtn").forEach(b => {
  b.addEventListener('click', cmdIde)
});
