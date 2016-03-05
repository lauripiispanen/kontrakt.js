kontrakt
========

A functional contract library for Javascript.

[![Build Status](https://travis-ci.org/lauripiispanen/kontrakt.svg?branch=master)](https://travis-ci.org/lauripiispanen/kontrakt)

*note:* Even though examples on this page will use ES6 features for brevity, this library
does not require it and is backwards compatible with earlier versions.

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

Constraint functions should be pure functions that return boolean values. A falsy
return value from a constraint function is interpreted as a contract violation, and
a suitable error will be thrown. Errors thrown from constraints are either instances
of `CalleeViolation` or `CallerViolation`, indicating respectively that either the
calling code or called function is to blame.

Both pre- and post-constraints are optional. A pre-constraint receives all arguments
given in the function call as parameters. A post-constraint will receive the function
return value as the first argument, followed by original function call parameters.

**Combinators**

A set of combinators is included in `kontrakt/combinators` module. These include the
most basic combinators:

The `and()` combinator subjects all argument constraint return values to the boolean
AND operation and returns the result. `or()` combinator works in similar fashion,
using a boolean OR operator instead. Both combinators accept 1-N constraint functions
as arguments.

The `not()` combinator inverts the return value from any one constraint function.

```javascript
const kontrakt = require('kontrakt'),
    { and, or } = require('kontrakt/combinators'),
    gt = (x) => (y) => x > y,
    lt = (x) => (y) => x > y,
    fn = (x) => x + 2

const fn2 = kontrakt({
    pre: and(
      gt(2),
      lt(5)
    ),
    post: or(
      lt(-2),
      gt(10)
    )
})(fn)
```
