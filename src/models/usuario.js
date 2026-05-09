// src/models/usuario.js

// Importamos Sequelize y los tipos de datos
const { DataTypes } = require('sequelize')

// Importamos la conexión
const sequelize = require('../config/database')

// Definimos el modelo Usuario
const Usuario = sequelize.define('Usuario', {
    // Campo nombre
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    // Campo email
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true              // no puede haber dos usuarios con el mismo email
    },
    // Campo password
    password: {
        type: DataTypes.STRING(255),
        allowNull: false          // obligatorio
    },
    // Campo rol
    rol: {
     type: DataTypes.STRING(20),
     defaultValue: 'usuario'    // por defecto siempre es usuario
}
}, {
    tableName: 'usuarios',        // nombre exacto de la tabla
    timestamps: true,             // activa created_at
    createdAt: 'created_at',      // nombre del campo
    updatedAt: false              // no necesitamos updated_at
})

// Exportamos el modelo
module.exports = Usuario