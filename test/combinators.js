var combinators = require('../combinators')
  , expect = require('expect.js')
  , constant = function(x) { return function() { return x }}

describe("combinators", function() {

  describe('and', function() {

    it('combines matchers', function() {
      expect(combinators.and(constant(true), constant(true))()).to.be(true)
      expect(combinators.and(constant(true), constant(false), constant(true))()).to.be(false)
      expect(combinators.and(constant(false))()).to.be(false)
    })

    it('requires at least one matcher', function() {
      expect(combinators.and).to.throwException()
    })
  })

  describe('or', function() {

    it('combines matchers', function() {
      expect(combinators.or(constant(true), constant(true))()).to.be(true)
      expect(combinators.or(constant(true), constant(false), constant(true))()).to.be(true)
      expect(combinators.or(constant(false), constant(false), constant(false))()).to.be(false)
    })

    it('requires at least one matcher', function() {
      expect(combinators.or).to.throwException()
    })
  })

  describe('not', function() {
    it('boolean flips matcher', function() {
      expect(combinators.not(constant(true))()).to.be(false)
      expect(combinators.not(constant(false))()).to.be(true)
    })
    it('expects exactly one matcher', function() {
      expect(combinators.not).to.throwException()
      expect(combinators.not).withArgs(constant(true), constant(false)).to.throwException()
    })
  })


})
