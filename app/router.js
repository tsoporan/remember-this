var router = require('koa-router')(),
    api    = require('./controllers/api'),
    main   = require('./controllers/main');

router.get('/', main.index);
router.get('/login', main.login);
router.get('/logout', main.logout);
router.get('/register', main.register);
router.post('/register', main.register);
router.post('/capture', api.capture);

module.exports = router
