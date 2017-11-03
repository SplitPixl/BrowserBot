module.exports = function () {
  let exportZip = new JSZip();

  exportZip.file('Readme.txt', 'Meow')

  exportZip.generateAsync({type:"blob"}).then(function(content) {
    download(content, 'browserBot.zip', 'application/zip')
  })
};


// https://stackoverflow.com/questions/13405129/javascript-create-and-save-file
function download(data, filename, type) {
  var file = new Blob([data], {type: type});
  if (window.navigator.msSaveOrOpenBlob) // IE10+
  window.navigator.msSaveOrOpenBlob(file, filename);
  else { // Others
    var a = document.createElement("a"),
    url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }
}
