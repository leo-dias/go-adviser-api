'use strict'

const Adviser = require( '../models/adviser' )
const authService = require( '../services/auth-service' )
const adviserRepository = require( '../repositoires/adviser-repository' )
const callback = require( '../controllers/callback-controller' );

const NOT = ( x ) => !x

const getAuthModel = ( model, roles ) => {
  const authModel = require( '../models/auth' )
  authModel.id = model._id
  authModel.email = model.email
  authModel.name = model.name
  authModel.roles = roles
  return authModel;
}

const Auth = {
  authenticate: async ( req, res ) => {
    try {
      const adviser = await adviserRepository.login( req.body.email, req.body.password )

      if ( NOT( adviser ) ) {
        return callback.status( 404 ).message( 'Email or password invalid', res )
      }

      const authModel = getAuthModel( adviser, 'adviser' )

      const token = await authService.generateToken( authModel )

      delete authModel.id

      res.status( 200 ).send( {
        token: token,
        data: authModel
      } )
    } catch ( e ) {
      console.log( e )
      return callback.status( 500 ).message( 'Error ' + e, res )
    }
  },

  refreshToken: async ( req, res ) => {
    try {
      const token = req.body.token || req.query.token || req.headers[ 'x-access-token' ]

      const data = await authService.decodeToken( token )

      const adviser = await adviserRepository.findById( data.id )

      if ( NOT( adviser ) ) {
        return callback.status( 404 ).message( 'Not found anyone with this credentials', res )
      }

      const authModel = getAuthModel( adviser, 'adviser' )

      const tokenData = await authService.generateToken( authModel )

      delete authModel.id

      res.status( 201 ).send( {
        token: tokenData,
        data: authModel
      } )
    } catch ( e ) {
      return callback.status( 500 ).message( 'Error refresh token' + e, res )
    }
  }
}

module.exports = Auth