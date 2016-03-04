var kontrakt = require('..')
  , CallerViolation = kontrakt.CallerViolation
  , CalleeViolation = kontrakt.CalleeViolation
  , expect = require('expect.js')
  , identity = function(x) { return x }
  , constant = function(x) { return function() { return x }}


describe('kontrakt', function() {
  it('wraps functions', function() {
    var r = "foo"

    kontrakt()(function() {
      r = "bar"
    })()

    expect(r).to.be("bar")
  })

  it('supports pre-contracts', function() {
    var f = kontrakt({
      pre: function(x) { return x < 0 }
    })(identity)
    expect(f).withArgs(2).to.throwException()
  })

  it('supports post-contracts', function() {
    var f = kontrakt({
      post: function(x) { return x < 0 }
    })(constant(2))
    expect(f).to.throwException()
  })

  it('passes input and output parameters to post contract', function(done) {
    var f = kontrakt({
      post: function(x, y, z) {
        expect(x).to.be(1)
        expect(y).to.be(2)
        expect(z).to.be(3)
        done()
        return true
      }
    })(constant(3))

    f(1, 2)
  })

  it('reports whoever broke a contract', function() {
    var f = kontrakt({
      pre: function(x) {
        return x > 0
      },
      post: function(x, y) {
        return y < 3
      }
    })(identity)

    expect(f).withArgs(-1, 3).to.throwException(function(e) {
      expect(e).to.be.a(CallerViolation)
    })
    expect(f).withArgs(4).to.throwException(function(e) {
      expect(e).to.be.a(CalleeViolation)
    })
  })

  it('expects pre and post condition to be functions', function() {
    expect(function() {
      kontrakt({
        pre: "foo"
      })
    }).to.throwException()

    expect(function() {
      kontrakt({
        post: 3
      })
    }).to.throwException()
  })

  it("returns the function itself if there's no pre or post conditions", function() {
    function foo() {}
    expect(kontrakt()(foo)).to.be(foo)
  })

})
