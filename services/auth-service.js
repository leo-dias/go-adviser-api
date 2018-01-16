'use strict'

const jwt = require( 'jsonwebtoken' )
const configGeneral = require( '../config/general' )

const AuthService = {
  generateToken: async ( data ) => await jwt.sign( data, configGeneral.SALT_KEY, { expiresIn: '5m' } )
  ,
  refreshToken: async () => await jwt.sign( { type: 'refresh' }, configGeneral.SALT_KEY, { expiresIn: '1m' } )
  ,
  decodeToken: async ( token ) => await jwt.verify( token, configGeneral.SALT_KEY )
  ,
  authorize: ( req, res, next ) => {
    const token = req.body.token || req.query.token || req.headers[ 'x-access-token' ]

    if ( !token ) {
      res.status( 401 ).json( { message: 'Access Denied' } )

    } else {
      jwt.verify( token, configGeneral.SALT_KEY, ( error, decoded ) =>
        ( error ) ? res.status( 401 ).json( { message: 'Invalid Token' } ) : next() )
    }
  }
  ,
  isAdviser: ( req, res, next ) => {
    const token = req.body.token || req.query.token || req.headers[ 'x-access-token' ]

    if ( !token ) {
      res.status( 401 ).json( { message: 'Invalid Token' } )

    } else {
      jwt.verify( token, configGeneral.SALT_KEY, ( error, decoded ) => {
        if ( error ) {
          res.status( 401 ).json( { message: 'Invalid Token' } )

        } else {
          if ( decoded.roles.includes( 'adviser' ) ) {
            next()

          } else {
            res.status( 403 ).json( { message: 'Only advisers can access' } )
          }
        }
      } )
    }
  }
}

module.exports = AuthService