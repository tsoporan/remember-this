// RememberThis!

// The basic server side API that handles posts from Chrome extension and serves
// data to client.

var koa = require('koa'),
    app = koa();

// Logging
app.use(function *(next) {
    var start = new Date;
    yield next;
    var ms = new Date - start;
    console.log('%s %s - %s', this.method, this.url, ms);
});

app.use(function *() {
    this.body = 'Hello World';
});


app.listen(3000);
