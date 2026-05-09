// src/routes/ventas.routes.js

// Importamos express
const express = require('express')

// Creamos el enrutador
const router = express.Router()

// Importamos la conexión a MySQL
const conexion = require('../config/database')

// GET /ventas - Trae todas las ventas
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM ventas'

    conexion.query(sql, (error, resultados) => {
        if (error) {
            return res.status(500).json({ mensaje: 'Error en el servidor', error })
        }
        res.json(resultados)
    })
})

// POST /ventas - Registra una venta y descuenta stock
router.post('/', (req, res) => {
    const { medicamento_id, cantidad } = req.body

    // Primero verificamos que el medicamento existe y tiene stock
    const sqlBuscar = 'SELECT * FROM medicamentos WHERE id = ?'

    conexion.query(sqlBuscar, [medicamento_id], (error, resultados) => {
        if (error) {
            return res.status(500).json({ mensaje: 'Error en el servidor', error })
        }
        if (resultados.length === 0) {
            return res.status(404).json({ mensaje: 'Medicamento no encontrado' })
        }

        const medicamento = resultados[0]

        // Verificamos que hay suficiente stock
        if (medicamento.stock < cantidad) {
            return res.status(400).json({ mensaje: 'Stock insuficiente' })
        }

        // Calculamos el total
        const total = medicamento.precio * cantidad

        // Insertamos la venta
        const sqlVenta = 'INSERT INTO ventas (medicamento_id, cantidad, total) VALUES (?, ?, ?)'

        conexion.query(sqlVenta, [medicamento_id, cantidad, total], (error, resultado) => {
            if (error) {
                return res.status(500).json({ mensaje: 'Error al registrar venta', error })
            }

            // Descontamos el stock
            const sqlStock = 'UPDATE medicamentos SET stock = stock - ? WHERE id = ?'

            conexion.query(sqlStock, [cantidad, medicamento_id], (error) => {
                if (error) {
                    return res.status(500).json({ mensaje: 'Error al actualizar stock', error })
                }

                res.status(201).json({ 
                    mensaje: 'Venta registrada correctamente',
                    id: resultado.insertId,
                    total: total
                })
            })
        })
    })
})

// Exportamos el router
module.exports = router