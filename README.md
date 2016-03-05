kontrakt
========

A functional contract library for Javascript.

**Installation**

```
npm install kontrakt --save
```

**Basic use**

Call `kontrakt(opts)(fn)` to get a wrapper function that will inject constraints into
any given function.

```javascript
var kontrakt = require('kontrakt'),
    fn = function(x) { return x + 2 }

var fn2 = kontrakt({
    pre: function(x) {
      return x < 2
    },
    post: function(x, y) {
      return y > 0
    }
})(fn)

fn2(0) // works
fn2(-3) // throws a kontrakt.CalleeViolation
fn2(4)  // throws a kontrakt.CallerViolation

```

**Details**

Constraint functions should be pure functions that return boolean values. A falsy
return value from a constraint function is interpreted as a contract violation, and
a suitable error will be thrown. Errors thrown from constraints are either instances
of `CalleeViolation` or `CallerViolation`, indicating respectively that either the
calling code or called function is to blame.

Both pre- and post-constraints are optional. A pre-constraint receives all arguments
given in the function call as parameters. A post-constraint will receive the function
return value as the first argument, followed by original function call parameters.
