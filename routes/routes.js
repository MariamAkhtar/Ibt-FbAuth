var appRouter = function(app) {

    responseObject = app.get("/facebookCallback", function(req, res) {
        var responseObject = "";
        if (!req.query.code) {

            return res.send({
                "status": "error",
                "message": "missing a code"
            });
        } else {

            performRequest('/oauth/access_token', 'GET', {
                redirect_uri: "http://localhost:8081/facebookCallback",
                client_id: 1864310473844946,
                client_secret: "6a45d57ea6eee3771b09185d03d89cf4",
                code: req.query.code
            }, function(data) {
                var access_token = data.access_token;
                console.log(data);
                performRequest('/me', 'GET', {
                    access_token: data.access_token
                }, function(data) {
                    console.log("userid",data);
                    return res.json({"msg":"successfully retireved user Info",
                    "userId":data.id,
                    "name" : data.name,
                    "access_token":access_token,
                    "Current_DateTime" : (new Date()).toJSON()
                  });
                });


            });

        }
    });

}


function performRequest(endpoint, method, data, success) {

	var querystring = require('querystring');
var https = require('https');

var host = 'graph.facebook.com';
  var dataString = JSON.stringify(data);
  var headers = {};

  if (method == 'GET') {
    endpoint += '?' + querystring.stringify(data);
  }
  else {
    headers = {
      'Content-Type': 'application/json',
      'Content-Length': dataString.length
    };
  }
  var options = {
    host: host,
    path: endpoint,
    method: method,
    headers: headers
  };

  var req = https.request(options, function(res) {
    res.setEncoding('utf-8');

    var responseString = '';

    res.on('data', function(data) {
      responseString += data;
    });

    res.on('end', function() {

      var responseObject = JSON.parse(responseString);
      success(responseObject);
    });
  });

  req.write(dataString);
  req.end();
}


// function insertToken(client_id,token) {
//
//   var MongoClient = require('mongodb').MongoClient;
//   var url = "mongodb://localhost:27017/mydb";
//
//   MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var myobj = { client_id: client_id, Token: token.access_token ,token_type:token.token_type , expiry:token.expires_in};
//     db.collection("FbAuthTokens").insertOne(myobj, function(err, res) {
//       if (err) throw err;
//       console.log("1 record inserted");
//       db.close();
//     });
//   });
// }

module.exports = appRouter;
