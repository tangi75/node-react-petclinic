const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

// Create Shema
const VetSchema = new Schema({
  vetId: {
    type: String,
  },
  birthDate: {
    type: String,
  },
  email: {
    type: String,
  },
  specialties: [{
    name: {
      type: String,
      required: true,
    }
  }],
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  image: {
    type: String
  }
});

// Create collection and add schema
mongoose.model('vets', VetSchema);