'use strict'

const mongoose = require( 'mongoose' )
const dbURI = process.env.MONGO_URL || 'mongodb://localhost/go-adviser'

mongoose.connect( dbURI, { useMongoClient: true } )
  .then( () => {
    console.log( `MongoDB Connected to ${dbURI}` )
  } )
  .catch( err => console.error( 'Error', err ) )

mongoose.connection.on( 'connected', () => {
  console.log( 'Mongoose default connection open to ', dbURI )
} )

mongoose.connection.on( 'error', ( err ) => {
  console.log( 'Mongoose default connection error: ', err )
} )

mongoose.connection.on( 'disconnected', () => {
  console.log( 'Mongoose default connection disconnected ' )
} )

mongoose.connection.on( 'open', () => {
  console.log( 'Mongoose default connection is open' )
} )

process.on( 'SIGINIT', () => {
  mongoose.connection.close( () => {
    console.log( 'Mongoose default connection disconnected through app terminator' )
    process.exit( 0 )
  } )
} )