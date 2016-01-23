(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var hecho = require('./index.js')
hecho()

},{"./index.js":2}],2:[function(require,module,exports){
var locale = require('../locale/locale.json')
var flag = require('emoji-flag')

function hechoMe(el) {
  var loc = el.getAttribute("locale") || "es"
  var country = el.getAttribute("country") || "AR"
  var length = el.getAttribute("length") || "long"
  var res = locale[loc][length].replace("${flag}", flag(country))
  var div = document.createElement("div")
  div.className = `hecho-${country}`
  div.innerText = res
  el.appendChild(div)
}

module.exports = function hecho(id) {
  var els = document.getElementsByTagName("hecho")
  for(var i=0;i<els.length;i++) {
    hechoMe(els[i])
  }
}

},{"../locale/locale.json":3,"emoji-flag":4}],3:[function(require,module,exports){
module.exports={
  "es":  {
    "long" : "Hecho con orgullo en ${flag}",
    "short" : "Hecho en ${flag}",
  },
  "en": {
    "long" : "Proudly made in ${flag}",
    "short": "Made in ${flag}"
  }
}

},{}],4:[function(require,module,exports){
var encode = require('punycode2/ucs2/encode')

// The standard being ISO 3166-2 alpha-2.
var standard = /^[A-Z]{2}$/

// The decimal code for “Regional Indicator Symbol Letter A”
// minus the decimal code for “Latin Capital Letter A.”
var base = 127462 - 65

function flag (country) {
  if (!standard.test(country)) {
    return
  }

  return encode(
    country.split('').map(function (letter) {
      return base + letter.charCodeAt(0)
    })
  )
}

module.exports = flag

},{"punycode2/ucs2/encode":5}],5:[function(require,module,exports){
'use strict';

var stringFromCharCode = String.fromCharCode;

/**
	* Creates a string based on an array of numeric code points.
	* @see `punycode.ucs2.decode`
	* @memberOf punycode.ucs2
	* @name encode
	* @param {Array} codePoints The array of numeric code points.
	* @returns {String} The new Unicode string (UCS-2).
*/
module.exports = function (array) {
	return array.map(function (value) {
		var output = '';
		if (value > 0xFFFF) {
			value -= 0x10000;
			output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
			value = 0xDC00 | value & 0x3FF;
		}
		output += stringFromCharCode(value);
		return output;
	}).join('');
};

},{}]},{},[1]);
