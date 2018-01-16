'use strict'

const restful = require( 'node-restful' )
const mongoose = restful.mongoose
const skillSchema = require( './schemas/skill-schema' )

module.exports = restful.model( 'Skill', skillSchema )