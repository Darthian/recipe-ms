var mongoose = require('mongoose');
var Recipe = mongoose.model('Recipe');
var RecipeMappingMapper = require('../mappers/RecipeMapping');

exports.addRecipe = (req, res) => {
    if (!req.body.idRecipe) return res.send(400, 'no hay un id de receta');
    if (!req.body.nameRecipe) return res.status(400).send(JSON.stringify({ 'response': 'el nombre de la receta es obligatorio' }));
    if (!req.body.timeForPreparation) return res.status(400).send(JSON.stringify({ 'response': 'el tiempo de preparación es obligatorio' }));
    if (!req.body.portions) return res.status(400).send(JSON.stringify({ 'response': 'el número de porciones es obligatorio' }));
    if (!req.body.totalIngredients) return res.status(400).send(JSON.stringify({ 'response': 'el total de ingredientes es obligatorio' }));
    if (!req.body.description) return res.status(400).send(JSON.stringify({ 'response': 'la descripción es obligatoria' }));
    if (!req.body.imageUrl) return res.status(400).send(JSON.stringify({ 'response': 'la imágen es obligatoria' }));
    if (!req.body.tags) return res.status(400).send(JSON.stringify({ 'response': 'los tags son obligatorios' }));
    if (!req.body.ingredients) return res.status(400).send(JSON.stringify({ 'response': 'los ingredientes son obligatorios' }));
    Recipe.findOne({
        'idRecipe': req.body.idRecipe,
        'name': req.body.name
    }, ((err, doc) => {
        if (doc !== null && doc !== undefined) {
            return res.status(409).send(JSON.stringify({ 'response': 'ya existe una receta registrada con esos datos' }));
        }
        var recipeResult = RecipeMappingMapper.mapFullRecipe(req);
        recipeResult.save(function (err, result) {
            if (err) return res.status(500).send(JSON.stringify({ 'response': err.message }));
            res.status(200).jsonp(result);
        });
    }));
};