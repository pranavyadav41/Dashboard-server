const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true
  },
  age: {
    type: Number,
    required: [true, 'Please add an age'],
    min: [18, 'Age must be at least 18'],
    max: [100, 'Age must be less than 100']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Employee', employeeSchema);