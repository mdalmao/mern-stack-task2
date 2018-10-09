const mongoose = require('mongoose');

//const URI='mongodb://localhost/mern-tasks'; // crea  la base si no existe
const URI = "mongodb+srv://prueba:VdaOIx6tqcgTBpOz@cluster0-sgraz.mongodb.net/test";
mongoose.connect(URI, { useNewUrlParser: true })
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));

module.exports = mongoose;
