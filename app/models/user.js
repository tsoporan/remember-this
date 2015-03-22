var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  email: String,
  date_created: { type: Date, default: Date.Now},
  verified: { type: Boolean, default: false },
});

// Register the model with Schema.
var User = mongoose.model('User', UserSchema);

module.exports = User;
