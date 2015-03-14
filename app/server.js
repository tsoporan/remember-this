// RememberThis!

// The basic server side API that handles posts from Chrome extension and serves
// data to client.

var koa = require('koa'),
    router = require('koa-router'),
    error = require('koa-error'),
    compress = require('koa-compress'),
    serve = require('koa-static'),
    logger = require('koa-logger'),
    app = koa(),
    port = 3000;

// Logging
app.use(logger());

// Error handling.
app.use(error());

// Serve up public.
app.use(serve('public'));

// Set up router middleware.
app.use(router(app));

app.use(compress());

app.listen(port, function() {
    console.log("Started Koa server, listening on port: " + port);
});
