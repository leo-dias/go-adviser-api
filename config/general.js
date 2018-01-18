'use strict'

const passwordHash = require( 'password-hash' )

module.exports = {
  SALT_KEY: passwordHash.generate( 'go-adviser' )
}
