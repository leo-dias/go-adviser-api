'use strict'

const callback = require( './callback-controller' )
const adviserRepository = require( '../repositoires/adviser-repository' )
const ObjectId = require( 'mongodb' ).ObjectID
const Message = require( '../models/message' );

const sendMessage = ( res, msg ) => {
  Message.message = msg
  res.status( 400 ).send( Message )
}

const controller = {
  create: ( req, res ) => {
    adviserRepository
      .create( req.body )
      .then( result => callback.status( 201 ).send( result, res ) )
      .catch( err => callback.status( 500 ).send( err, res ) )
  }
  ,
  update: ( req, res ) => {
    const query = { _id: req.params.id }
    adviserRepository
      .update( query, req.body )
      .then( result => callback.status( 200 ).send( result, res ) )
      .catch( err => callback.status( 500 ).send( err, res ) )
  }
  ,
  filter: ( req, res ) => {
    adviserRepository
      .filter( req.query )
      .then( result => callback.status( 200 ).send( result, res ) )
      .catch( err => callback.status( 500 ).send( err, res ) )
  }
  ,
  findByPriceVideo: ( req, res ) => {
    if ( req.query.init === undefined || req.query.end === undefined ) {
      return sendMessage(res, 'The parameters [init] and [end] are required.')
    }

    adviserRepository
      .findByPriceVideo( req.query.init, req.query.end )
      .then( result => callback.status( 200 ).send( result, res ) )
      .catch( err => callback.status( 500 ).send( err, res ) )
  }
  ,
  findBySkills: ( req, res ) => {
    if ( !req.headers.skills ) {
      return sendMessage(res, 'No variable skills was found in header request.')
    }

    const skillsParam = JSON.parse( `[ ${req.headers.skills} ]` )
    const skills = skillsParam.map( element => new ObjectId( element ) )

    adviserRepository
      .findBySkills( skills )
      .then( result => callback.status( 200 ).send( result, res ) )
      .catch( err => callback.status( 500 ).send( err, res ) )
  }
}

module.exports = controller