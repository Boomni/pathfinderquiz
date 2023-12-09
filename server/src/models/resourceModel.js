const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resourceSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  permissions: {
  },
  classId: {
    type: Schema.Types.ObjectId,
    ref: 'Class'
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
  },
  likes: Number,
  likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const Resource = mongoose.model('Resource', resourceSchema);
module.exports = Resource;
