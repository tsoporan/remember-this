// RememberThis!

// The basic server side API that handles posts from Chrome extension and serves
// data to client.

var koa = require('koa'),
    error = require('koa-error'),
    compress = require('koa-compress'),
    serve = require('koa-static'),
    logger = require('koa-logger'),
    parse = require('co-body'),
    handlebars = require('koa-handlebars'),
    mongoose = require('mongoose'),
    app = koa(),
    port = 3000,

    router = require('./router');

// Connect to DB
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(cb) {
  console.log('opened mongoose connection!');
});

// Logging
app.use(logger());

// Error handling.
app.use(error());

// Set up view rendering.
app.use(handlebars({
  layoutsDir: "views/layouts",
  partialsDir: "views/partials",
  defaultLayout : "main"
}));

// Serve up public.
app.use(serve('public'));

// Set up router middleware.
app.use(router.routes());
app.use(router.allowedMethods());

app.use(compress());

app.listen(port, function() {
    console.log("Started Koa server, listening on port: " + port);
});
