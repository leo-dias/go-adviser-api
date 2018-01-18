'use strict'

const jwt = require( 'jsonwebtoken' )
const configGeneral = require( '../config/general' )

const getToken = ( req ) => req.body.token || req.query.token || req.headers[ 'x-access-token' ]
const hasAdviserRole = ( roles ) => roles.includes( 'adviser' )

const AuthService = {
  generateToken: async ( data ) => await jwt.sign( data, configGeneral.SALT_KEY, { expiresIn: '60m' } )
  ,
  refreshToken: async () => await jwt.sign( { type: 'refresh' }, configGeneral.SALT_KEY, { expiresIn: '10m' } )
  ,
  decodeToken: async ( token ) => await jwt.verify( token, configGeneral.SALT_KEY )
  ,
  authorize: ( req, res, next ) => {
    const token = getToken( req )

    if ( !token ) {
      res.status( 401 ).json( { message: 'Access Denied' } )

    } else {
      jwt.verify( token, configGeneral.SALT_KEY, ( error, decoded ) =>
        ( error ) ? res.status( 401 ).json( { message: 'Invalid Token' } ) : next() )
    }
  }
  ,
  isAdviser: ( req, res, next ) => {
    const token = getToken( req )

    if ( !token ) {
      res.status( 401 ).json( { message: 'Invalid Token' } )

    } else {
      jwt.verify( token, configGeneral.SALT_KEY, ( error, decoded ) => {
        if ( error ) {
          res.status( 401 ).json( { message: 'Invalid Token' } )

        } else {
          hasAdviserRole( decoded.roles )
            ? next()
            : res.status( 403 ).json( { message: 'Only advisers can access' } )
        }
      } )
    }
  }
}

module.exports = AuthService