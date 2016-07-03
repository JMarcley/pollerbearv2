/**
 * Schema Definitions
 *
 */
var mongoose = require('mongoose');

var LeagueSchema = new mongoose.Schema({
  id: String,
  name: String,
  members: Array,
  password: String,
  points: Number,
  states: { type: Number, default: 1 }
});

// Compiles the schema into a model, opening (or creating, if
//	nonexistent) the 'Topic' collection in the MongoDB database
module.exports = mongoose.model('League', LeagueSchema);
