const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Pet = mongoose.model('pets');

// Pets Index
router.get('/', (req, res) => {
  Pet.find({})
    .populate('pets')
    .then(pets => {
      if (!pets) {
        res.statusCode = 204;
        return res.send();
      }
      res.statusCode = 200;
      res.send({
        data: pets,
      })
    });
});

// Show Single Pet
router.get('/:id', (req, res) => {
  Pet.findOne({
    _id: req.params.id
  })
    .populate('pet')
    .then(pet => {
      if (!pet) {
        res.statusCode = 204;
        return res.send();
      }
      res.statusCode = 200;
      res.send({
        data: pet,
      })
    });
});

// Process Add Pet
router.post('/', (req, res) => {
  const body = req.body;
  const newPet = {
    petId: body.petId,
    birthDate: body.birthDate,
    name: body.name,
    type: body.type,
    image: body.image
  }

  // Create Pet
  new Pet(newPet)
    .save()
    .then(pet => {
      res.statusCode = 200;
      res.send({
        data: pet,
      });
    });
});

// Delete Pet
router.delete('/:id', (req, res) => {
  Pet.remove({ _id: req.params.id })
    .then(() => {
      res.statusCode = 204;
      res.send({
        data: {
          message: `Pet with id: ${req.params.id} deleted successfully `,
        }
      })
    });
});


module.exports = router;