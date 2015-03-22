var parse = require('co-body');

exports.capture = function* () {
    var body = yield parse.json(this);

    this.body = 'Worked!';
};
