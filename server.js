var ip = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;

// load webservice and database libraries
var express = require('express');
var app = express();

var mongoDbConnectionString = "mongodb://admin:YjIY8hdFKNXV@127.3.171.2:27017/onlineide";
if (typeof process.env.OPENSHIFT_MONGODB_DB_HOST == "undefined") {
    mongoDbConnectionString = "onlineide";
}
var mongojs = require('mongojs');
var db = mongojs(mongoDbConnectionString, ["serviceClients"]);

// serve static content (html, css, js) in the public directory
app.use(express.static(__dirname + '/public'));

// configure express to parse JSON in the body of an HTTP request
app.use(express.bodyParser());


var serviceClients = require("./public/features/services/server.js");
serviceClients(app, db, mongojs);

app.get("/env", function (req, res) {
    res.json(process.env);
});

app.get("/hello", function (req, res) {
    res.send("Hello World");
});

// listen to port 3000 in localhost
app.listen(port, ip);


/*
  MongoDB 2.4 database added.  Please make note of these credentials:

   Root User:     admin
   Root Password: YjIY8hdFKNXV
   Database Name: onlineide

Connection URL: mongodb://$OPENSHIFT_MONGODB_DB_HOST:$OPENSHIFT_MONGODB_DB_PORT/


OPENSHIFT_MONGODB_DB_URL: "mongodb://admin:YjIY8hdFKNXV@127.3.171.2:27017/",
 */


/*
 * Git
 * 
 * git remote add onlineide -f https://github.com/jannunzi/onlineide.git
 * 
 * git merge onlineide/master -s recursive -X ours
 * 
 * git push onlineide HEAD
 * 
 */