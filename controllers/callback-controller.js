'use strict'

const Callback = {
  success: {
    status: ( httpstatus ) => ( result, res ) => {
      ( result.length === 0 )
        ? res.status( 404 ).send()
        : res.status( httpstatus ).send( result )
    }
  }
  ,
  error: ( err, res ) => res.status( 400 ).send( err )
}

module.exports = Callback