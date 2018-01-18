'use strict'

const isStatusOkAndEmptyData = ( httpstatus, data ) => httpstatus === 200 && data.length === 0

exports.status = ( httpstatus ) => {
  return {
    send: ( data, res ) =>
      isStatusOkAndEmptyData( httpstatus, data )
        ? res.status( 404 ).send( data )
        : res.status( httpstatus ).send( data )
    ,
    message: ( message, res ) => res.status( httpstatus ).send( { message } )
  }
}