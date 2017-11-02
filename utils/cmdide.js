let cmdlist = document.querySelector('.cmds')
let commands = localStorage.commands ? JSON.parse(localStorage.commands) : {}

Object.keys(commands).forEach(label => {
  let command = document.createElement("a");
  command.appendChild(document.createTextNode(label));
  command.href = "#"
  command.className = `cmd cmd${label}`
  command.addEventListener('click', function (evt) {
    if (document.querySelector('.cmd.selected')) {
      document.querySelector('.cmd.selected').classList.remove('selected')
    }
    this.classList.add('selected')
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
  document.querySelector('.cmds').appendChild(command);
})
