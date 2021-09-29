var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),    
    mongoose = require('mongoose'),
    modelResources = require('./model/RecipesModel'),
    recipeCreationController = require('./controllers/RecipeCreation');

const connectionURL = 'mongodb://nodejsuser:Colombia1%2A@127.0.0.1:27017/';
const databaseName = 'recipes?authSource=resources&gssapiServiceName=mongodb';

mongoose.set('bufferCommands', false);
mongoose.connect(connectionURL + databaseName,
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (err, res) {
        console.log('Connection parameters: ', connectionURL + databaseName);
        if (err) throw err;
        console.log('Connected to Database');
    });

//middleware
app.use(express.json());
app.use(express.urlencoded());
app.use(methodOverride());

var router = express.Router();

// Health Route
var router = express.Router();
router.get('/health', function (req, res) {
  res.send("{\"ok\":\"ok\"}");
});

// API routes
var recipesServices = express.Router();
recipesServices.route('/recipe')
.post(recipeCreationController.addRecipe);

app.use(router);
app.use('/api',recipesServices);

// Start server
app.listen(3001, function () {
    console.log("Node server running on http://localhost:3001");
  });