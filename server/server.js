var express = require('express');
var path = require('path');
var http = require('http');
var socketHandler = require('./socketHandler');
var redditController = require('./reddit/redditController.js');
var fs = require('fs');
var cloudinary = require('cloudinary');
var formidable = require('formidable'),
    http = require('http'),
    util = require('util');
var request = require('request');

// // Middleware
// var morgan = require('morgan');
var bodyParser = require('body-parser');

// Router
var router = require('./config/route.js');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/', router);
app.use(express.static(path.join(__dirname, '/../client')));

var path = require('path'),
    fs = require('fs');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

app.post('/upload/:fileType', function(req, res) {
    console.log(process.env)
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
      console.log(req.params.fileType, "$$$$$$")
        if (req.params.fileType == 'jpg' || req.params.fileType == 'png') {
          console.log('i am inside the if statement')

            cloudinary.uploader.upload(files.displayImage.path,
                function(result) {
                    res.status(200).json(JSON.stringify(result))
                })
        } else {
            cloudinary.uploader.upload(files.displayImage.path,
                function(result) {
                    res.status(200).json(JSON.stringify(result))
                }, {
                  resource_type: "video"
                })
        }
    })
})

io.on('connection', socketHandler.newConnection);

var port = process.env.PORT || 9000;

server.listen(port, function() {
    console.log('server up and running on port ' + port);
});

exports.io = io;
exports.app = app;