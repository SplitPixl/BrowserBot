module.exports = function(url) {
  let xhr = new XMLHttpRequest();
  if (!xhr) {
    console.error('Giving up :( Cannot create an XMLHTTP instance');
    return false;
  }
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      return xhr.responseText
    }
  };
  xhr.open('GET', url, false);
  xhr.send();
}
