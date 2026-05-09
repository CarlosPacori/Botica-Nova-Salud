// src/models/medicamento.js

// Importamos Sequelize y los tipos de datos
const { DataTypes } = require('sequelize')

// Importamos la conexión
const sequelize = require('../config/database')

// Definimos el modelo Medicamento
const Medicamento = sequelize.define('Medicamento', {
    // Campo nombre
    nombre: {
        type: DataTypes.STRING(100),  // VARCHAR(100)
        allowNull: false              // no puede estar vacío
    },
    // Campo descripcion
    descripcion: {
        type: DataTypes.TEXT,         // TEXT
        allowNull: true               // puede estar vacío
    },
    // Campo precio
    precio: {
        type: DataTypes.DECIMAL(10, 2), // DECIMAL(10,2)
        allowNull: false
    },
    // Campo stock
    stock: {
        type: DataTypes.INTEGER,      // INT
        allowNull: false
    },
    // Campo stock_minimo
    stock_minimo: {
        type: DataTypes.INTEGER,      // INT
        defaultValue: 10              // valor por defecto: 10
    }
}, {
    tableName: 'medicamentos',        // nombre exacto de la tabla en MySQL
    timestamps: true,                 // activa created_at
    createdAt: 'created_at',          // nombre del campo en la tabla
    updatedAt: false                  // no necesitamos updated_at
})

// Exportamos el modelo
module.exports = Medicamento