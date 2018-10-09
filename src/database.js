const mongoose= require('mongoose');
const URI='mongodb://localhost/mern-tasks'; // crea  la base si no existe

mongoose.connect(URI)
.then(db => console.log('DB esta conectada2'))
.catch(err=>console.error(err));

module.exports = mongoose;
