"use strict";

module.exports = require('./combinator')(function(a, b) {
  return a || b
}, false)
