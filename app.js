var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var routes = require("./routes/routes.js")(app);

var server = app.listen(8081, function() {
    console.log("Listening on port %s...", server.address().port);
});


// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/mydb";
//For Creating db
//  MongoClient.connect(url, function(err, db) {
//    if (err) throw err;
//    console.log("Database created!");
//    db.close();
//  });

//Creating tablestrt2
// MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     db.createCollection("FbAuthTokens", function(err, res) {
//         if (err) throw err;
//         console.log("Table created!");
//         db.close();
//     });
// });


//
