// src/routes/medicamentos.routes.js

// Importamos express
const express = require('express')

// Creamos el enrutador
const router = express.Router()

// Importamos la conexión a MySQL
const conexion = require('../config/database')

// GET /medicamentos - Trae todos los medicamentos
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM medicamentos'
    
    conexion.query(sql, (error, resultados) => {
        if (error) {
            return res.status(500).json({ mensaje: 'Error en el servidor', error })
        }
        res.json(resultados)
    })
})

// GET /medicamentos/stock-bajo - Trae medicamentos con stock bajo
router.get('/stock-bajo', (req, res) => {
    const sql = 'SELECT * FROM medicamentos WHERE stock < stock_minimo'

    conexion.query(sql, (error, resultados) => {
        if (error) {
            return res.status(500).json({ mensaje: 'Error en el servidor', error })
        }
        res.json(resultados)
    })
})

// GET /medicamentos/:id - Trae un medicamento por id
router.get('/:id', (req, res) => {
    const { id } = req.params
    const sql = 'SELECT * FROM medicamentos WHERE id = ?'

    conexion.query(sql, [id], (error, resultados) => {
        if (error) {
            return res.status(500).json({ mensaje: 'Error en el servidor', error })
        }
        if (resultados.length === 0) {
            return res.status(404).json({ mensaje: 'Medicamento no encontrado' })
        }
        res.json(resultados[0])
    })
})

// POST /medicamentos - Crea un medicamento nuevo
router.post('/', (req, res) => {
    const { nombre, descripcion, precio, stock, stock_minimo } = req.body
    const sql = 'INSERT INTO medicamentos (nombre, descripcion, precio, stock, stock_minimo) VALUES (?, ?, ?, ?, ?)'

    conexion.query(sql, [nombre, descripcion, precio, stock, stock_minimo], (error, resultados) => {
        if (error) {
            return res.status(500).json({ mensaje: 'Error en el servidor', error })
        }
        res.status(201).json({ mensaje: 'Medicamento creado correctamente', id: resultados.insertId })
    })
})

// PUT /medicamentos/:id - Actualiza un medicamento
router.put('/:id', (req, res) => {
    const { id } = req.params
    const { nombre, descripcion, precio, stock, stock_minimo } = req.body
    const sql = 'UPDATE medicamentos SET nombre = ?, descripcion = ?, precio = ?, stock = ?, stock_minimo = ? WHERE id = ?'

    conexion.query(sql, [nombre, descripcion, precio, stock, stock_minimo, id], (error, resultados) => {
        if (error) {
            return res.status(500).json({ mensaje: 'Error en el servidor', error })
        }
        if (resultados.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Medicamento no encontrado' })
        }
        res.json({ mensaje: 'Medicamento actualizado correctamente' })
    })
})

// DELETE /medicamentos/:id - Elimina un medicamento
router.delete('/:id', (req, res) => {
    const { id } = req.params
    const sql = 'DELETE FROM medicamentos WHERE id = ?'

    conexion.query(sql, [id], (error, resultados) => {
        if (error) {
            return res.status(500).json({ mensaje: 'Error en el servidor', error })
        }
        if (resultados.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Medicamento no encontrado' })
        }
        res.json({ mensaje: 'Medicamento eliminado correctamente' })
    })
})

// Exportamos el router
module.exports = router