/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , twitter = require('ntwitter')
  , config = require('confu')(__dirname, 'config.json')
  , twit = new twitter(config.twitter)
  , mongodb = require('mongodb')
  , EntitiesParser = require('./lib/entities_parser')
  , entitiesParser = new EntitiesParser
  , Tweet = require('./lib/tweet');

var app = module.exports = express.createServer()
  , io = require('socket.io').listen(app);

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', routes.index);

app.listen(config.app.port, function () {
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

  new mongodb.Db(
    config.mongodb.database,
    new mongodb.Server(config.mongodb.host, config.mongodb.port, {})
  ).open(function (err, db) {
    if (err) {
      console.error('Failed to open database!');
      console.error(err);
      throw err;
    };

    db.collection('tweets', function (err, collection) {
      if (err) {
        console.error('Failed to open collection!');
        console.error(err);
        throw err;
      }

      twit.stream('statuses/sample', function(stream) {
        stream.on('data', function (data) {
          var tweet, entities;
          if ('text' in data && 'entities' in data) {
            entities = entitiesParser.parse(data.entities);
            tweet = new Tweet({
              "status_id": data.id
            , "text": data.text
            , "urls": entities.urls
            , "hashtags": entities.hashtags
            , "user_id": data.user.id
            , "screen_name": data.user.screen_name
            , "profile_image_url": data.user.profile_image_url
            , "created_at": new Date(Date.parse(data.created_at))
            });
            if (tweet.hasUrl()) {
              io.sockets.emit('tweet', tweet.data);
              collection.insert(tweet.data);
            }
          }
        });
      });

      io.sockets.on('connection', function (socket) {
        console.log('Connected');
        socket.on('disconnect', function () {
          console.log('Disconnected.');
        });
      });
    });
  });
});
