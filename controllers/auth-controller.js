'use strict'

const Adviser = require( '../models/adviser' )
const authService = require( '../services/auth-service' )
const adviserRepository = require( '../repositoires/adviser-repository' )
const Message = require( '../models/message' )
const authModel = require( '../models/auth' )

const populateAuthModel = ( model, roles ) => {
  authModel.id = model._id
  authModel.email = model.email
  authModel.name = model.name
  authModel.roles = roles
}

const Auth = {
  authenticate: async ( req, res ) => {
    try {
      const adviser = await adviserRepository.login( req.body.email, req.body.password )

      if ( !adviser ) {
        Message.message = 'Email or password invalid';
        res.status( 404 ).send( Message )
        return
      }

      populateAuthModel( adviser, 'adviser' )

      const token = await authService.generateToken( authModel )

      delete authModel.id

      res.status( 200 ).send( {
        token: token,
        data: authModel
      } )
    } catch ( e ) {
      console.log( e )
      Message.message = e
      res.status( 500 ).send( Message )
    }
  },

  refreshToken: async ( req, res ) => {
    try {
      const token = req.body.token || req.query.token || req.headers[ 'x-access-token' ]

      const data = await authService.decodeToken( token )

      const adviser = await adviserRepository.findById( data.id )

      if ( !adviser ) {
        Message.message = 'Not found anyone with this credentials'
        res.status( 404 ).send( Message )
        return
      }

      populateAuthModel( adviser, 'adviser' )

      const tokenData = await authService.generateToken( authModel )

      delete authModel.id

      res.status( 201 ).send( {
        token: tokenData,
        data: authModel
      } )
    } catch ( e ) {
      Message.message = 'Erro refresh token'
      res.status( 500 ).send( Message )
    }
  }
}

module.exports = Auth