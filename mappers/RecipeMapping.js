var mongoose = require('mongoose');
var Recipe = mongoose.model('Recipe');

exports.mapFullRecipe = function (req) {
    return new Recipe({
        idRecipe: req.body.idRecipe ? req.body.idRecipe : "",
        nameRecipe: req.body.nameRecipe ? req.body.nameRecipe : "",
        timeForPreparation: req.body.timeForPreparation ? req.body.timeForPreparation : "",
        portions: req.body.portions ? req.body.portions : "",
        totalIngredients: req.body.totalIngredients ? req.body.totalIngredients : "",
        description: req.body.description ? req.body.description : "",
        imageUrl: req.body.imageUrl ? req.body.imageUrl : "",
        tags: req.body.tags ? req.body.tags.map(tag => {
            return { name: tag.name }
        }) : {},
        ingredients: req.body.ingredients ? req.body.ingredients.map(ingredient => {
            return {
                idProduct: ingredient.idProduct,
                quantity: ingredient.quantity,
                unityMeasure: ingredient.unityMeasure,
                measure: ingredient.measure,
                imageUrl: ingredient.imageUrl
            }
        }) : {}
    });
}