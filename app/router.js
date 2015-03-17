var router = require('koa-router')(),
    api    = require('./controllers/api');

router.post('/capture', api.capture);

module.exports = router
