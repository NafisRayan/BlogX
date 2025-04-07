const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  authorName: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  publicationDate: {
    type: Date,
    required: true
  },
  destination: {
    type: String,
    required: true,
    enum: ['europe', 'asia', 'north-america', 'south-america', 'africa', 'australia', 'antarctica']
  },
  category: {
    type: String,
    required: true
  },
  subCategory: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  travelTags: [{
    type: String
  }],
  mainContent: {
    type: String,
    required: true
  },
  images: [{
    url: String,
    publicId: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Blog', blogSchema); 