"use strict";
var kontrakt = require('..'),
    pre = function() {
      return arguments.length == 1
    }


module.exports = kontrakt({
  pre: pre
})(function(fn) {
  return function not() {
    return !fn.apply(this, arguments)
  }
})
