var parse = require('co-body');

exports.index = function* () {
  console.log('in index');
  yield this.render("index", {
    title : "Home",
  });
};

exports.login = function* () {
  console.log('in login');
  this.body = 'Login';
};

exports.logout = function* ()  {
  console.log('in logout');
  this.body = 'Logout';
};

exports.register = function* () {
  console.log('in register');
  this.body = 'Register';
};
