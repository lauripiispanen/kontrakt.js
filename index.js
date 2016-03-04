"use strict";

// arguments optimizations from @petkaantonov 
function kontrakt(opts) {

  var options = opts || {}
  return function(fn) {
    if (!options.pre && !options.post) {
      return fn
    } else {
      return function() {
        var pre = options.pre && !options.pre.apply(options.pre, arguments)
        if (pre) {
          var args = new Array(arguments.length);
          for(var i = 0; i < args.length; ++i) {
              args[i] = arguments[i]
          }
          throw new CallerViolation(args)
        }
        var val = fn.apply(this, arguments)

        if (options.post) {
          var args = new Array(arguments.length + 1);
          for(var i = 0; i < args.length - 1; ++i) {
              args[i] = arguments[i]
          }
          args[args.length - 1] = val
          var post = options.post && !options.post.apply(options.post, args)
          if (post){
            throw new CalleeViolation(args, val)
          }
        }
        return val
      }
    }
  }
}

module.exports = kontrakt({
  pre: function(opts) {
    var options = opts || {}
    return !(options.pre && typeof options.pre !== "function") &&
      !(options.post && typeof options.post !== "function")
  }
})(kontrakt)

function CallerViolation(args) {
  this.name = 'CallerViolation'
  this.stack = (new Error()).stack
  this.message = "Caller violated contract. Arguments: [" + args + "]"
}
CallerViolation.prototype = Object.create(Error.prototype);
CallerViolation.prototype.constructor = CallerViolation;
module.exports.CallerViolation = CallerViolation

function CalleeViolation(args, retValue) {
  this.name = 'CalleeViolation'
  this.stack = (new Error()).stack
  this.message = "Function violated its own contract. Arguments: [" + args + "] Return value: " + retValue
}
CalleeViolation.prototype = Object.create(Error.prototype);
CalleeViolation.prototype.constructor = CalleeViolation;
module.exports.CalleeViolation = CalleeViolation
