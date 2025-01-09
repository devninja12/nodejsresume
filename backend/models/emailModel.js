// models/emailModel.js
const mongoose = require('mongoose');

// Define the schema for email submissions
const emailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,  // To ensure no duplicate emails
    lowercase: true,
    trim: true
  }
});

// Create and export the model
const Email = mongoose.model('Email', emailSchema);

module.exports = Email;
