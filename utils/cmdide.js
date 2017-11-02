let cmdlist = document.querySelector('.cmds')

function updateCmds() {
  let commands = localStorage.commands ? JSON.parse(localStorage.commands) : {}
  cmdlist.innerHTML = ''
  Object.keys(commands).forEach(label => {
    let cmdWrap = document.createElement('div')
    let command = document.createElement('a');
    let delCmd = document.createElement('a');
    command.appendChild(document.createTextNode(label));
    command.href = "#"
    command.className = `cmd cmd${label}`
    command.addEventListener('click', function (evt) {
      if (document.querySelector('.cmd-wrap.selected')) {
        document.querySelector('.cmd-wrap.selected').classList.remove('selected')
      }
      this.parentNode.classList.add('selected')
      let ide = document.querySelector('.ide')
      ide.innerHTML = ''
      let cmdCode = CodeMirror(ide, {
        value: commands[label].code,
        mode:  "javascript",
        theme: 'material',
        lineNumbers: true,
        indentWithTabs: false,
        styleActiveLine: true,
        matchBrackets: true,
        smartIndent: true,
        autoCloseBrackets: false,
      });
      cmdCode.on("change", function (editor, change) {
        commands[label].code = editor.getValue();
        localStorage.commands = JSON.stringify(commands)
        commands = JSON.parse(localStorage.commands)
      });
    })
    let cross = document.createElement('i')
    cross.className = 'material-icons'
    cross.appendChild(document.createTextNode('close'))
    delCmd.appendChild(cross)
    delCmd.addEventListener('click', function (evt) {
      commands[label] = undefined;
      localStorage.commands = JSON.stringify(commands)
      commands = JSON.parse(localStorage.commands)
      updateCmds()
    })
    delCmd.href = "#"
    delCmd.className = 'del-cmd'
    cmdWrap.appendChild(command)
    cmdWrap.appendChild(delCmd)
    cmdWrap.className = 'cmd-wrap'
    document.querySelector('.cmds').appendChild(cmdWrap);
  })
}

updateCmds()

$(document).ready(function(){
   $('.modal').modal();
 });

document.querySelector('.newcmdbtn').addEventListener('click', function () {
  $('#modal1').modal('open');
})

document.querySelector('.createcmdbtn').addEventListener('click', function () {
  let label = document.querySelector('.newcmdname').value
  if (label) {
    commands[label] = {code: ''};
    localStorage.commands = JSON.stringify(commands)
    commands = JSON.parse(localStorage.commands)
    updateCmds()
    $('#modal1').modal('close');
    label = ''
  }
})
