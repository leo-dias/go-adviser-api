'use strict'

const callback = require( './callback-controller' )
const adviserRepository = require( '../repositoires/adviser-repository' )
const ObjectId = require( 'mongodb' ).ObjectID

const controller = {
  create: ( req, res ) => {
    adviserRepository
      .create( req.body )
      .then( result => callback.success.status( 201 )( result, res ) )
      .catch( err => callback.error( err, res ) )
  }
  ,
  update: ( req, res ) => {
    const query = { _id: req.params.id }
    adviserRepository
      .update( query, req.body )
      .then( result => callback.success.status( 200 )( result, res ) )
      .catch( err => callback.error( err, res ) )
  }
  ,
  filter: ( req, res ) => {
    adviserRepository
      .filter( req.query )
      .then( result => callback.success.status( 200 )( result, res ) )
      .catch( err => callback.error( err, res ) )
  }
  ,
  findByPriceVideo: ( req, res ) => {
    if ( req.query.init === undefined || req.query.end === undefined ) {
      res.status( 400 ).send( { message: 'The parameters [init] and [end] are required.' } )
      return
    }

    adviserRepository
      .findByPriceVideo( req.query.init, req.query.end )
      .then( result => callback.success.status( 200 )( result, res ) )
      .catch( err => callback.error( err, res ) )
  }
  ,
  findBySkills: ( req, res ) => {
    if ( !req.headers.skills ) {
      res.status( 400 ).send( { message: 'No variable skills was found in header request.' } )
      return
    }

    let skillsParam = JSON.parse( "[" + req.headers.skills + "]" )
    let skills = []
    for ( let i = 0; i < skillsParam.length; i++ ) {
      skills.push( new ObjectId( skillsParam[ i ] ) )
    }

    adviserRepository
      .findBySkills( skills )
      .then( result => callback.success.status( 200 )( result, res ) )
      .catch( err => callback.error( err, res ) )
  }
}

module.exports = controller