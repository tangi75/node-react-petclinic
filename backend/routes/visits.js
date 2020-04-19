const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Visit = mongoose.model('visits');

//TODO: move the database logic to controller/services
// Visits Index
router.get('/', (req, res) => {
  Visit.find()
    .populate('visits pet vet')
    .sort({ date: 'desc' })
    .then(visits => {
      if (!visits) {
        res.statusCode = 204;
        return res.send({});
      }
      res.statusCode = 200;
      res.send({
        data: visits,
      })
    });
});

// Show Single Visit
router.get('/:id', (req, res) => {
  console.log(mongoose.Types.ObjectId(req.params.id));
  Visit.findOne({
    _id: mongoose.Types.ObjectId(req.params.id)
  })
    .populate('visit pet vet')
    .then(visit => {
      if (!visit) {
        res.statusCode = 204;
        return res.send();
      }
      res.statusCode = 200;
      res.send({
        data: visit,
      })
    });
});

// Process Add visit
router.post('/', (req, res) => {
  const body = req.body;

  //TODO: validation of input
  // visitdate is in correct format and date
  // visitTime is from M-F 9am-5pm
  const newVisit = {
    visitDate: body.visitDate,
    visitTime: body.visitTime,
    description: body.description,
  }

  newVisit.pet = mongoose.Types.ObjectId(body.pet);
  newVisit.vet = mongoose.Types.ObjectId(body.vet);

  Visit.findOne({
    visitTime: body.visitTime,
    visitDate: new Date(body.visitDate)
  }).populate('visit')
    .then(visit => {
      // if visit is already Scheduled return 
      if (visit) {
        res.statusCode = 409;
        return res.send({
          status: 409,
          message: `visit already scheduled for date: '${body.visitDate}' and time slot: '${body.visitTime}' for provider '${body.vetName}'. Please try some other date/time slot or provider`,
          data:visit,
        })
      } else {
        // Create Visit
        new Visit(newVisit)
          .save()
          .then(visit => {
            res.statusCode = 200;
            res.send({
              data: visit,
            });
          });
      }
    });
});

// Delete Visits

// TODO: add authentication and authorization to delete
// a token can be used by client to identify the user that is deleting
// the resource.
router.delete('/:id', (req, res) => {
  Visit.remove({ _id: req.params.id })
    .then(() => {
      res.statusCode = 204;
      return res.send({
        data: {
          message: `Visit with id: ${req.params.id} deleted successfully `,
        }
      })
    });
});


module.exports = router;