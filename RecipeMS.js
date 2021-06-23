var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    mongoose = require('mongoose');

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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

var router = express.Router();

// Health Route
var router = express.Router();
router.get('/health', function (req, res) {
  res.send("{\"ok\":\"ok\"}");
});
app.use(router);

// Start server
app.listen(3000, function () {
    console.log("Node server running on http://localhost:3001");
  });