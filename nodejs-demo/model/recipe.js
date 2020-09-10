// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var recipeSchema = new Schema({
  recipeId: String,
  recipeName: { type: String, unique: true },
  recipeImage: { type: String },
  description: { type: String },
  calories: { type: Number },
  recipeCreatedDate: Date,
  ingredientNames: [{type: String}]
});

// the schema is useless so far
// we need to create a model using it
var Recipe = mongoose.model('Recipe', recipeSchema);

// make this available to our users in our Node applications
module.exports = Recipe;