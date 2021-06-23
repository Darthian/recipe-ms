var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var recipeSchema = mongoose.Schema({
    idRecipe: String,
    nameRecipe: String,
    timeForPreparation: String,
    portions: Number,
    totalIngredients: Number,
    description: String,
    imageUrl: String,
    ingredients: [
        {
            idProduct: String,
            quantity: String,
            unityMeasure: String,
            measure: Number,
            imageUrl: String
        }
    ]
});

module.exports = mongoose.model('Recipe', recipeSchema);