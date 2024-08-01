const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for post details
const PostSchema = new Schema({
  postText: {
    type: String,
    required: true,
    trim: true
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'

  },
  date: {
    type: Date,
    default: Date.now
  },
  likes: {
    type: Array,
    default: []
  }
}, {
  timestamps: true
});

// Create and export the model
module.exports = mongoose.model('Post', PostSchema);
