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
  },
  error: function (err) {
    let newLog
    if (typeof err == 'object') {
      newLog = {
        source: 'err',
        text: err.message.replace(/&/gi, '&amp;').replace(/</gi, '&lt;'),
        author: err.cmd || 'ERR'
      }
    } else {
      newLog = {
        source: 'err',
        text: err.replace(/&/gi, '&amp;').replace(/</gi, '&lt;'),
        author: 'ERR'
      }
    }
    logs.push(newLog);
    updateLogs();
  }
}

function updateLogs() {
  logHTML = ''
  logs.slice(-10).forEach(log => {
    logHTML += `<div class="${log.source}">${log.author}: ${log.text}</div>`
  })
  document.getElementById('logs').innerHTML = logHTML;
}
