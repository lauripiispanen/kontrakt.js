kontrakt
========

A functional contract library for Javascript.

**Installation**

```
npm install kontrakt --save
```

**Usage**

Call `kontrakt(opts)` to get a wrapper function that will inject constraints into
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
