const test = require('tape')
const sinon = require('sinon')
const helpers = require('../test/helpers')

const noop = helpers.noop
const bindFunc = helpers.bindFunc
const isFunction = require('../internal/isFunction')

const constant = require('../combinators/constant')

const safe = require('./safe')

test('safe', t => {
  const f = bindFunc(safe)

  t.ok(isFunction(safe), 'is a function')

  t.throws(f(undefined), 'throws with undefined in first argument')
  t.throws(f(null), 'throws with null in first argument')
  t.throws(f(0), 'throws with falsey number in first argument')
  t.throws(f(1), 'throws with truthy number in first argument')
  t.throws(f(''), 'throws with falsey string in first argument')
  t.throws(f('string'), 'throws with truthy string in first argument')
  t.throws(f(false), 'throws with false in first argument')
  t.throws(f(true), 'throws with true in first argument')
  t.throws(f({}), 'throws with an object in first argument')
  t.throws(f([]), 'throws with an array in first argument')

  t.doesNotThrow(f(noop), 'allows a function in first argument')

  t.end()
})

test('safe functionality', t => {
  const pred = x => !!x

  const f = safe(pred)

  const fResult = f(false).option('nothing')
  const tResult = f('just').option('nothing')

  t.equals(fResult, 'nothing', 'returns a Nothing when false')
  t.equals(tResult, 'just', 'returns a Just when true')

  t.end()
})
