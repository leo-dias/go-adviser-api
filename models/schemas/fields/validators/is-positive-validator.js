'use strict'

const validator = {
  validate: ( v ) => v >= 0,
  message: 'The value must be positive.'
}

module.exports = validator