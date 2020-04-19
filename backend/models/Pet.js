const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Shema
const PetSchema = new Schema({
  petId: {
    type: String
  },
  birthDate: {
    type: String,
  },
  name: {
    type: String
  },
  type: {
    type: Object
  },
  image: {
    type: String
  }, 
  owner: {
    type: Object
  }
});

// Create collection and add schema
mongoose.model('pets', PetSchema);