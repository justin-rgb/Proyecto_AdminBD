require('dotenv').config()
const express = require('express');
const cors = require('cors')

const db = require('./db');
const routes = require('./app/routes/index');
const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use('/', routes);

//Iniciar el servidor
db.initialize({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECTION_STRING
})
  .then(() => {
    app.listen(port, () => {
      console.log(`Servidor express corriendo en el puerto ${port}`);
    });
  })
  .catch((err) => {
    console.error('Error al inicializar la conexión a la base de datos:', err);
    process.exit(1);
  });


// Cerrar la conexión a la base de datos al salir de la aplicación
process.on('SIGINT', () => {
  db.close()
    .then(() => {
      console.log('Conexión a la base de datos cerrada');
      process.exit(0);
    })
    .catch((err) => {
      console.error('Error al cerrar la conexión a la base de datos (SIGNIT):', err);
      process.exit(1);
    });
});