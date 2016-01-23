var locale = require('../locale/locale.json')
var flag = require('emoji-flag')

function hechoMe(el, i) {
  var loc = el.getAttribute("locale") || "es"
  var country = el.getAttribute("country") || "AR"
  var length = el.getAttribute("length") || "long"
  var res = locale[loc][length].replace("${flag}", flag(country))
  var div = document.createElement("div")
  div.className = `hecho-${country} hecho-${i}`
  div.innerText = res
  el.appendChild(div)
}

module.exports = function hecho() {
  var els = document.getElementsByTagName("hecho")
  for(var i=0;i<els.length;i++) {
    hechoMe(els[i], i)
  }
}
