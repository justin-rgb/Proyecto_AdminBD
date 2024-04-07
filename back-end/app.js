// Importar Express
const express = require('express');
const app = express();
const port = 3000; // Puerto en el que se ejecutará el servidor

// Definir un endpoint
app.get('/', (req, res) => {
  res.send('¡Hola Mundo!');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});