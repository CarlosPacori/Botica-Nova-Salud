// src/config/database.js

// Importamos Sequelize del paquete sequelize
const { Sequelize } = require('sequelize')

// Cargamos las variables del archivo .env
require('dotenv').config()

// Creamos la conexión con Sequelize
// Le pasamos: nombre de BD, usuario, contraseña y opciones
const sequelize = new Sequelize(
    process.env.DB_NAME,      // botica_nova_salud
    process.env.DB_USER,      // root
    process.env.DB_PASSWORD,  // tu contraseña
    {
        host: process.env.DB_HOST,  // localhost
        port: process.env.DB_PORT,  // 3306
        dialect: 'mysql',           // le decimos que usamos MySQL
        logging: false              // desactiva los logs de SQL en consola
    }
)

// Verificamos si la conexión funciona
// .authenticate() intenta conectarse a la BD
// .then() se ejecuta si todo salió bien
// .catch() se ejecuta si hubo un error
sequelize.authenticate()
    .then(() => {
        console.log('Conexión exitosa a MySQL - Botica Nova Salud')
    })
    .catch((error) => {
        console.error('Error al conectar a MySQL:', error.message)
    })

// Compartimos la conexión con otros archivos
module.exports = sequelize