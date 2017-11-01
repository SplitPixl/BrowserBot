logs = []

module.exports = {
  logCmd: function (msg) {
    let newLog = {
      source: msg.raw.source,
      text: msg.text.replace(/&/gi, '&amp;').replace(/</gi, '&lt;'),
      author: msg.sender.name
    }
    logs.push(newLog);
    updateLogs();
  },
  log: function (text) {
    let newLog = {
      source: 'info',
      text: text.replace(/&/gi, '&amp;').replace(/</gi, '&lt;'),
      author: "LOG"
    }
    logs.push(newLog);
    updateLogs();
  }
}

function updateLogs() {
  logHTML = ''
  logs.slice(-5).forEach(log => {
    logHTML += `<div class="${log.source}">${log.author}: ${log.text}</div>`
  })
  document.getElementById('logs').innerHTML = logHTML;
}
