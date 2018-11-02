/** @license ISC License (c) copyright 2018 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

const curry = require('../core/curry')
const isString = require('../core/isString')
const isObject  = require('../core/isObject')
const object = require('../core/object')

function fn(name) {
  function unsetProp(key, obj) {
    if(!isString(key)) {
      throw new TypeError(
        `${name}: String required for first argument`
      )
    }

    if(!isObject(obj)) {
      throw new TypeError(
        `${name}: Object required for second argument`
      )
    }

    return object.unset(key, obj)
  }

  return curry(unsetProp)
}

// unsetProp :: String -> Object -> Object
const unsetProp =
  fn('unsetProp')

unsetProp.origFn =
  fn

module.exports = unsetProp
