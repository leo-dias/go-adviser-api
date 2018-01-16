'use strict'

const validator = {
  validate: ( v ) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test( v ),
  message: 'E-mail {VALUE} is invalid.'
}

module.exports = validator