//  Importar mysql2 de node_modules
const mysql = require('mysql2');

//  Cargamos las variables del archivo .env
//El que CARGA los datos del .env
require('dotenv').config(); 

// Creamos la conexión con los datos del .env
// process  El que GUARDA y da acceso a esos datos del .env
const conexion = mysql.createConnection({
    host     : process.env.DB_HOST,      // localhost
    user     : process.env.DB_USER,      // root
    password : process.env.DB_PASSWORD,  // tu contraseña
    database : process.env.DB_NAME,      // botica_nova_salud
    port     : process.env.DB_PORT       // 3306
});

// Verificamos si la conexión funciona
conexion.connect((error) => {  // Función flecha — forma moderna de JavaScript -> // Es equivalente a esta forma antigua: function(error){}
    if (error) {
        // Algo salió mal
        console.error('Error al conectar a MySQL:', error.message); // Muestra mensaje de error en rojo
        return;
    }
    // Todo bien
    console.log('Conexión exitosa a MySQL - Botica Nova Salud');   // Muestra mensaje normal en terminal
});

//Compartimos la conexión con otros archivos
module.exports = conexion; 