const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const plm = require("passport-local-mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/Pintrest")

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true // Ensure username is required
  },
  password: {
    type: String,
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Post'
  }],
  dp: {
    type: String, // URL or path to the display picture
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  fullname: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

// Initialize passport-local-mongoose with options if necessary
UserSchema.plugin(plm, {
  usernameField: 'username', // Explicitly define the username field
});

module.exports = mongoose.model('User', UserSchema);
