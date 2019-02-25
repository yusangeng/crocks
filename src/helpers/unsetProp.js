/** @license ISC License (c) copyright 2019 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

const curry = require('../core/curry')
const isArray = require('../core/isArray')
const isEmpty = require('../core/isEmpty')
const isInteger  = require('../core/isInteger')
const isObject  = require('../core/isObject')
const isString = require('../core/isString')

const array = require('../core/array')
const object = require('../core/object')

function fn(name) {
  function unsetProp(key, x) {
    if(isObject(x)) {
      if(isString(key) && !isEmpty(key)) {
        return object.unset(key, x)
      }

      throw new TypeError(
        `${name}: Non-empty String required for first argument when second argument is an Object`
      )
    }

    if(isArray(x)) {
      if(isInteger(key) && key >= 0) {
        return array.unset(key, x)
      }

      throw new TypeError(
        `${name}: Positive Integer required for first argument when second argument is an Array`
      )
    }

    throw new TypeError(
      `${name}: Object or Array required for second argument`
    )
  }

  return curry(unsetProp)
}

const unsetProp =
  fn('unsetProp')

unsetProp.origFn =
  fn

module.exports =
  unsetProp
