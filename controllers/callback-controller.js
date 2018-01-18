'use strict'

exports.status = ( httpstatus ) => {
  return {
    send: ( data, res ) => {      
      if ( httpstatus === 200 && data.length === 0 ) {
        res.status( 404 ).send( data )
      }
      res.status( httpstatus ).send( data );
    }
  }
}