const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')

// Load Models
require('./models/Visit');
require('./models/Vet');
require('./models/Pet');

// Load Routes
const visits = require('./routes/visits')
const vets = require('./routes/vets')
const pets = require('./routes/pets');

const initDB = require('./config/prepopulate_db');

// Load Keys
const keys = require('./config/keys');

// Map global promises
mongoose.Promise = global.Promise;


const options = {
    useMongoClient:true,
    autoIndex: false, // Don't build indexes
    reconnectTries: 30, // Retry up to 30 times
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0
  }

const connectWithRetry = () => {
  console.log('MongoDB connection with retry')
  mongoose.connect(keys.mongoURI, options).then(()=>{
    console.log('MongoDB is connected: ' + keys.mongoURI)
    // Initialize the DB
    initDB.execute();
  }).catch(err=>{
    console.log(err)
    console.log('MongoDB connection to ' + keys.mongoURI + ' unsuccessful, retry after 5 seconds.')
    setTimeout(connectWithRetry, 5000)
  })
}

connectWithRetry()

const app = express();

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//TODO: remove the cors() for production.
app.use('/visits', cors(), visits);
app.use('/vets', cors(), vets);
app.use('/pets', cors(),pets);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
});
