const webRequire = require('./utils/webrequire.js')

let commands
let bots = {}

if (localStorage.commands) {
  commands = JSON.parse(localStorage.commands)
} else {
  localStorage.commands = JSON.stringify({echo: {code: "reply(msg.args.join(' '))"},reverse: {code: "reply(msg.args.join(' ').split('').reverse().join(''))"},cat: {code: "fetch('https://random.cat/meow').then(r => {return r.json()}).then(res => {reply('meow! ' + res.file)})"}})
  commands = JSON.parse(localStorage.commands)
}

if (!localStorage.options) {
  localStorage.options = JSON.stringify({})
}

global.logger = require('./utils/logger.js')

require('./utils/cmdide.js')

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
      eval(`(msg, bots, require, reply) => {${commandList[msg.command.toLowerCase()].code}}`)(msg, bots, webRequire, (text) => { // TODO: Make a webrequire module
        callback(text);
      });
    } catch (err) {
      err.cmd = msg.command.toLowerCase() + ' cmd'
      logger.error(err)
      console.error(err)
    }
  }
}

function cmdIde() {
  let cmdIde = document.querySelector('.cmdide')
  cmdIde.classList.toggle('hidden')
}

document.getElementById("start").addEventListener('click', startBots)
document.querySelectorAll(".cmdidebtn").forEach(b => {
  b.addEventListener('click', cmdIde)
});
