'use strict'

const jwt = require( 'jsonwebtoken' )
const configGeneral = require( '../config/general' )
const callback = require( '../controllers/callback-controller' )

const getToken = ( req ) => req.body.token || req.query.token || req.headers[ 'x-access-token' ]
const hasAdviserRole = ( roles ) => roles.includes( 'adviser' )
const NOT = ( x ) => !x

const callbackVerify = ( error, decoded, res ) =>
  ( error )
    ? callback.status( 401 ).message( 'Invalid Token', res )
    : next()

const callbackVerifyAdviser = ( error, decoded, res, next ) =>
  ( error )
    ? callback.status( 401 ).message( 'Invalid Token', res )
    : hasAdviserRole( decoded.roles )
      ? next()
      : callback.status( 403 ).message( 'Only advisers can access', res )


const AuthService = {
  generateToken: async ( data ) => await jwt.sign( data, configGeneral.SALT_KEY, { expiresIn: '60m' } )
  ,
  refreshToken: async () => await jwt.sign( { type: 'refresh' }, configGeneral.SALT_KEY, { expiresIn: '10m' } )
  ,
  decodeToken: async ( token ) => await jwt.verify( token, configGeneral.SALT_KEY )
  ,
  authorize: ( req, res, next ) => {
    const token = getToken( req )

    NOT( token )
      ? callback.status( 403 ).message( 'Access Denied', res )
      : jwt.verify( token, configGeneral.SALT_KEY, ( error, decoded ) => callbackVerify( error, decoded, res ) )
  }
  ,
  isAdviser: ( req, res, next ) => {
    const token = getToken( req )

    NOT( token )
      ? callback.status( 403 ).message( 'Access Denied', res )
      : jwt.verify( token, configGeneral.SALT_KEY, ( error, decoded ) => callbackVerifyAdviser( error, decoded, res, next ) )
  }
}

module.exports = AuthService