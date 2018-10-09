const mongoose = require('mongoose');

//const URI = "mongodb+srv://prueba:VdaOIx6tqcgTBpOz@cluster0-sgraz.mongodb.net/test";
const URI='mongodb://prueba:Sistemas1@localhost:27017/mern-tasks';

mongoose.connect(URI, { useNewUrlParser: true })
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));

module.exports = mongoose;



