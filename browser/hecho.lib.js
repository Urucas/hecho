(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var locale = require('../locale/locale.json')
var flag = require('emoji-flag')

module.hecho = function hecho(id) {
  var el = document.getElementById(id || "hecho")
  if(!el) throw new Error("#hecho element not found!")
  var locale = el.getAttribute(locale) || "es"
  var country = el.getAttribute("country") || "AR"
  var res = locale[loc].replace("${flag}", flag(country))
  el.innerText = res
}

},{"../locale/locale.json":2,"emoji-flag":3}],2:[function(require,module,exports){
module.exports={
  "es": "Hecho con orgullo en ${flag}",
  "en": "Proudly made in ${flag}"
}

},{}],3:[function(require,module,exports){
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

},{"punycode2/ucs2/encode":4}],4:[function(require,module,exports){
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
