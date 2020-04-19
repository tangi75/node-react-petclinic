const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Vet = mongoose.model('vets');

//TODO: move the database logic to controller/services
// Vets Index
router.get('/', (req, res) => {
  Vet.find({})
    .populate('vets')
    .then(vets => {
      if (!vets) {
        res.statusCode = 204;
        return res.send();
      }
      res.statusCode = 200;
      res.send({
        data: vets,
      })
    });
});

// Show Single Vet
router.get('/:id', (req, res) => {
  Vet.findOne({
    _id: mongoose.Types.ObjectId(req.params.id)
  })
    .populate('vet')
    .then(vet => {
      if (!vet) {
        res.statusCode = 204;
        return res.send();   
      }
      res.statusCode = 200;
      res.send({
        data: vet,
      })
    });
});

// Process Add Vet
router.post('/', (req, res) => {
  const body = req.body;
  const newVet = {
    specialties: body.specialties,
    firstName: body.firstName,
    lastName: body.lastName
  }
  // Create Vet
  new Vet(newVet)
    .save()
    .then(vet => {
      res.statusCode = 200;
      res.send({
        data: vet,
      });
    });
});

// Delete Vet
router.delete('/:id', (req, res) => {
  Vet.remove({ _id: req.params.id })
    .then(() => {
      res.statusCode = 204;
      res.send({
        data: {
          message: `Vet with id: ${req.params.id} deleted successfully `,
        }
      })
    });
});


module.exports = router;