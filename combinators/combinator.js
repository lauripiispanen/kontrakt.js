"use strict";
var kontrakt = require('..'),
    pre = function() {
      return arguments.length > 0
    }

module.exports = function combinator(fn, defaultValue) {
  return kontrakt({
    pre: pre
  })(function() {
    var matchers = new Array(arguments.length);
    for(var i = 0; i < matchers.length; ++i) {
        matchers[i] = arguments[i]
    }
    return function() {
      var params = new Array(arguments.length);
      for(var i = 0; i < params.length; ++i) {
          params[i] = arguments[i]
      }
      return matchers.reduce(function(a, b) {
        return fn(a, b.apply(b, params))
      }, defaultValue)
    }
  })
}
