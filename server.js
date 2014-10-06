var ip = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;

// load webservice and database libraries
var express = require('express');
var app = express();

app.get("/env", function (req, res) {
    res.json(process.env);
});


// listen to port 3000 in localhost
app.listen(port, ip);
