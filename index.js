// index.js

//  Importamos express
const express = require('express');
// Importamos las rutas de medicamentos
const medicamentosRoutes = require('./src/routes/medicamentos.routes')
// Importamos las rutas de ventas
const ventasRoutes = require('./src/routes/ventas.routes')

// Importamos la conexión a MySQL
const conexion = require('./src/config/database');

// Creamos el servidor
const app = express();
const PORT = 3000;
// Le decimos a Express que entienda JSON
app.use(express.json());

// Usamos las rutas de medicamentos
app.use('/medicamentos', medicamentosRoutes)
// Usamos las rutas de ventas
app.use('/ventas', ventasRoutes)
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