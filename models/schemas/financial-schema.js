'use strict'

const mongoose = require( 'mongoose' )

const receive_date = require( './fields/field-receive-date' )
const amount_receive = require( './fields/field-amount-receive' )

const financialSchema = new mongoose.Schema( {
  receive_date,
  amount_receive
} )

financialSchema.index( { _id: 1 }, { unique: true } )

module.exports = financialSchema