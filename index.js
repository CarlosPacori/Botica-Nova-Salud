// index.js

//  Importamos express
const express = require('express');

// Importamos la conexión a MySQL
const conexion = require('./src/config/database');

// Creamos el servidor
const app = express();
const PORT = 3000;

// Le decimos a Express que entienda JSON
app.use(express.json());

//  Ruta principal de prueba
app.get('/', (req, res) => {
    res.json({ 
        mensaje: 'Bienvenido a la API de Botica Nova Salud',
        estado: 'Servidor funcionando correctamente'
    });
});

// Iniciamos el servidor en el puerto 3000
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`); //${} mete el valor de la variable dentro del texto.
});