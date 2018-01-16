'use strict'

const Adviser = require( '../models/adviser' )
const authService = require( '../services/auth-service' )
const adviserRepository = require( '../repositoires/adviser-repository' )

const Auth = {
  authenticate: async ( req, res ) => {
    try {
      const adviser = await adviserRepository.login( req.body.email, req.body.password )

      if ( !adviser ) {
        res.status( 404 ).send( {
          message: 'Email or password invalid'
        } )
        return
      }

      const token = await authService.generateToken( {
        id: adviser._id,
        email: adviser.email,
        name: adviser.name,
        roles: 'adviser'
      } )

      res.status( 200 ).send( {
        token: token,
        data: {
          email: adviser.email,
          name: adviser.name,
          roles: 'adviser'
        }
      } )
    } catch ( e ) {
      console.log( e )
      res.status( 500 ).send( {
        message: 'Error'
      } )
    }
  },

  refreshToken: async ( req, res ) => {
    try {
      const token = req.body.token || req.query.token || req.headers[ 'x-access-token' ]

      const data = await authService.decodeToken( token )

      const adviser = await adviserRepository.findById( data.id )

      if ( !adviser ) {
        res.status( 404 ).send( {
          message: 'Not found anyone with this credentials'
        } )
        return
      }

      const tokenData = await authService.generateToken( {
        id: adviser._id,
        email: adviser.email,
        name: adviser.name,
        roles: 'adviser'
      } )

      res.status( 201 ).send( {
        token: tokenData,
        data: {
          email: adviser.email,
          name: adviser.name,
          roles: 'adviser'
        }
      } )
    } catch ( e ) {
      res.status( 500 ).send( {
        message: 'Erro refresh token'
      } )
    }
  }
}

module.exports = Auth