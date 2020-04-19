const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Shema
const VisitSchema = new Schema({
  visitId: {
    type: String,
  },
  visitDate: {
    type: Date,
    required: true,
  },
  visitTime: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    default: 'active'
  },
  pet: {
    type: Schema.Types.ObjectId,
    ref: 'pets'
  },
  vet: {
    type: Schema.Types.ObjectId,
    ref: 'vets'
  },
  description:{
    type: String,
  }
});

// Create collection and add schema
mongoose.model('visits', VisitSchema);