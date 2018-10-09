const express = require('express');
const app = express();
const morgan = require('morgan');
const path =  require('path'); // se encarga de unir directorios sin aisalndo del sistema operativo donde se ejecuta, para evitar los problemas con las / o \ entre Linux y Windows por ejemplo
// configuracion

const { mongoose } = require('./database');

app.set('port', process.env.PORT || 80); // esto es para que ya tome un puerto si se despliega en una nuve
// middelwares
app.use (morgan('dev')); // usa morgan en entorno de desarrollo
app.use(express.json()); // comprueba para cada peticion que llega al servidor si es una peticion JSON o no
//Rutas o url
app.use('/api/tasks',require('./routes/task.routes'));
// Archivos estaticos (donde iran el contenido estatico)
//console.log(path.join(__dirname,'public'));
app.use(express.static(path.join(__dirname,'public')));
// iniciando el servidor
app.listen(app.get('port'),() => {
 console.log(`server on port ${app.get('port')} `);
});
