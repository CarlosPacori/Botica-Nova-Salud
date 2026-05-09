// src/routes/medicamentos.routes.js

// Importamos express
const express = require('express')
// Importamos el middleware
const verificarToken = require('../middlewares/auth.middleware')
// Creamos el enrutador
const router = express.Router()

// Importamos la conexión a MySQL 
// const conexion = require('../config/database')

// Importamos el modelo Medicamento
const Medicamento = require('../models/medicamento')

// Importamos Sequelize y el operador Op para consultas avanzadas
const { Op } = require('sequelize')
const sequelize = require('../config/database')

//  Ahora hay que agregar verificarToken a cada ruta para protegerla

// GET /medicamentos - Trae todos los medicamentos 
//async → le dice a la función que va a hacer operaciones que toman tiempo
router.get('/',verificarToken, async (req, res) => { 
    try {
        const medicamentos = await Medicamento.findAll() //findAll() → es el método de Sequelize que reemplaza SELECT * FROM medicamentos.
        res.json(medicamentos)
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error })
    }
})


// GET /medicamentos/stock-bajo
router.get('/stock-bajo',verificarToken, async (req, res) => {
    try {
        const medicamentos = await Medicamento.findAll({
            where: {
                stock: { [Op.lt]: sequelize.col('stock_minimo') } // Op.lt → significa less than → "menor que" en español exatamente lo mismo que WHERE stock < stock_minimo
            }
        })
        res.json(medicamentos)
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error })
    }
})

// GET /medicamentos/:id
router.get('/:id',verificarToken, async (req, res) => {
    try {
        const medicamento = await Medicamento.findByPk(req.params.id) //findByPk() → es el método de Sequelize que reemplaza SELECT * FROM medicamentos WHERE id = ?
        if (!medicamento) {
            return res.status(404).json({ mensaje: 'Medicamento no encontrado' })
        }
        res.json(medicamento)
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error })
    }
})

// POST /medicamentos
router.post('/',verificarToken, async (req, res) => {
    try {
        const medicamento = await Medicamento.create(req.body) //create() → es el método de Sequelize que reemplaza INSERT INTO medicamentos (nombre, descripcion, precio, stock, stock_minimo) VALUES (?, ?, ?, ?, ?)
        res.status(201).json({ mensaje: 'Medicamento creado correctamente', id: medicamento.id })
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error })
    }
})

// PUT /medicamentos/:id
router.put('/:id',verificarToken, async (req, res) => {
    try {
        const medicamento = await Medicamento.findByPk(req.params.id)
        if (!medicamento) {
            return res.status(404).json({ mensaje: 'Medicamento no encontrado' })
        }
        await medicamento.update(req.body)
        res.json({ mensaje: 'Medicamento actualizado correctamente' })
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error })
    }
})

// DELETE /medicamentos/:id
router.delete('/:id',verificarToken, async (req, res) => {
    try {
        const medicamento = await Medicamento.findByPk(req.params.id)
        if (!medicamento) {
            return res.status(404).json({ mensaje: 'Medicamento no encontrado' })
        }
        await medicamento.destroy()
        res.json({ mensaje: 'Medicamento eliminado correctamente' })
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error })
    }
})

// Exportamos el router
module.exports = router