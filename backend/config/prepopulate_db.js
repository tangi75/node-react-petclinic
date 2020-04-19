const mongoose = require('mongoose');
const Pet = mongoose.model('pets');
const Vet = mongoose.model('vets');
const Visit = mongoose.model('visits');
const vetsData = require('./vets.json');
const petsData = require('./pets.json');
const visitData = require('./visits.json');

const execute = async () => {

  //drop existing default collection.
  await dropDefaultCollections();

  console.log('Populating Vets default values');
  // Create Vets
  vetsData.map((vet) => {
    vet._id = mongoose.Types.ObjectId(vet.id);
    new Vet(vet)
      .save()
      .then(() => {
        console.log(`vet with VetId: ${vet._id} created successfully`);
      });
  });

  console.log('Populating Pets default values');
  // Create Pets
  petsData.map((pet) => {
    pet._id = mongoose.Types.ObjectId(pet.id);
    new Pet(pet)
      .save()
      .then(() => {
        console.log(`pet with PetId: ${pet._id} created successfully`);
      });
  });

  console.log('Populating Visits default values');
  // Create Visits
  visitData.map((visit) => {
    visit._id = mongoose.Types.ObjectId(visit.id);
    visit.pet = mongoose.Types.ObjectId(visit.pet);
    visit.vet = mongoose.Types.ObjectId(visit.vet);
      new Visit(visit)
        .save()
        .then(() => {
          console.log(`visit with visitId: ${visit.visitId} created successfully`);
        });
  });
}

const dropDefaultCollections = () => {
  //Erase old data: NOTE: Do not do this in production.
  Vet.remove({}, () => {
    console.log('Vets collections dropped!');
  })
  Pet.remove({}, () => {
    console.log('Pets collections dropped!');
  })
  Visit.remove({}, () => {
    console.log('Visits collections dropped!');
  })
}

module.exports = {
  execute,
}
