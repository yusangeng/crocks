const test = require('tape')
const helpers = require('../test/helpers')

const bindFunc = helpers.bindFunc

const isFunction = require('../core/isFunction')
const unit =  Function.prototype

const dissoc = require('./dissoc')

test('dissoc helper function', t => {
  t.ok(isFunction(dissoc), 'is a function')

  const fn = bindFunc(dissoc)

  const err = /dissoc: Object or Array required for second argument/
  t.throws(fn('key', undefined), err, 'throws when second arg is undefined')
  t.throws(fn('key', null), err, 'throws when second arg is null')
  t.throws(fn('key', 0), err, 'throws when second arg is falsey number')
  t.throws(fn('key', 1), err, 'throws when second arg is truthy number')
  t.throws(fn('key', ''), err, 'throws when second arg is falsey string')
  t.throws(fn('key', 'string'), err, 'throws when second arg is truthy string')
  t.throws(fn('key', false), err, 'throws when second arg is false')
  t.throws(fn('key', true), err, 'throws when second arg is true')

  t.end()
})

test('dissoc with Object', t => {
  const fn = bindFunc(dissoc)

  const noString = /dissoc: Non-empty String required for first argument/
  t.throws(fn(undefined, {}), noString, 'throws when first arg is undefined')
  t.throws(fn(null, {}), noString, 'throws when first arg is null')
  t.throws(fn('', {}), noString, 'throws when first arg is empty string')
  t.throws(fn(0, {}), noString, 'throws when first arg is falsey number')
  t.throws(fn(1, {}), noString, 'throws when first arg is truthy number')
  t.throws(fn(false, {}), noString, 'throws when first arg is false')
  t.throws(fn(true, {}), noString, 'throws when first arg is true')
  t.throws(fn(unit, {}), noString, 'throws when first arg is a function')
  t.throws(fn({}, {}), noString, 'throws when first arg is an object')
  t.throws(fn([], {}), noString, 'throws when first arg is an array')

  const undefs = { a: undefined, b: undefined }
  t.same(dissoc('key', undefs), {}, 'removes undefined values')

  const defs = { a: 1, b: 2 }
  t.notEqual(dissoc('key', defs), defs, 'returns a new object')
  t.same(dissoc('a', defs), { b: 2 }, 'returns a new object with specified key removed')

  t.end()
})

test('dissoc with Array', t => {
  const fn = bindFunc(dissoc)

  const noInt = /dissoc: Positive Integer required for first argument when second argument is an Array/
  t.throws(fn(undefined, []), noInt, 'throws when first arg is undefined')
  t.throws(fn(null, []), noInt, 'throws when first arg is null')
  t.throws(fn('', []), noInt, 'throws when first arg is falsey string')
  t.throws(fn('string', []), noInt, 'throws when first arg is falsey string')
  t.throws(fn(false, []), noInt, 'throws when first arg is false')
  t.throws(fn(true, []), noInt, 'throws when first arg is true')
  t.throws(fn(unit, []), noInt, 'throws when first arg is a function')
  t.throws(fn({}, []), noInt, 'throws when first arg is an object')
  t.throws(fn([], []), noInt, 'throws when first arg is an array')

  const undefs = [ undefined, undefined ]
  t.same(dissoc(0, undefs), [ undefined ], 'does not remove undefined values')

  const defs = [ 34, 99, 'string' ]
  t.same(dissoc(3, defs), defs, 'keeps items when index does not exist')
  t.notEqual(dissoc(3, defs), defs, 'returns a new object')

  t.same(dissoc(1, defs), [ 34, 'string' ], 'removes item at index without holes')

  t.end()
})
