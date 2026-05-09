// src/routes/auth.routes.js

// Importamos express
const express = require('express')

// Creamos el enrutador
const router = express.Router()

// Importamos los paquetes
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Importamos el modelo Usuario
const Usuario = require('../models/usuario')

// POST /auth/registro - Registra un usuario nuevo
router.post('/registro', async (req, res) => {
    try {
        const { nombre, email, password } = req.body

        // Verificamos si el email ya existe
        const usuarioExiste = await Usuario.findOne({ where: { email } })
        if (usuarioExiste) {
            return res.status(400).json({ mensaje: 'El email ya está registrado' })
        }

        // Encriptamos la contraseña
        const passwordEncriptada = await bcrypt.hash(password, 10) // encripta la contraseña antes de guardarla en la base de datos.

        // Creamos el usuario — rol siempre es 'usuario'
        const usuario = await Usuario.create({
            nombre,
            email,
            password: passwordEncriptada
        })

        res.status(201).json({ mensaje: 'Usuario registrado correctamente', id: usuario.id })

    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error })
    }
})

// POST /auth/login - Inicia sesión
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body

        // Buscamos el usuario por email
        const usuario = await Usuario.findOne({ where: { email } })
        if (!usuario) {
            return res.status(400).json({ mensaje: 'Email o contraseña incorrectos' })
        }

        // Verificamos la contraseña
        const passwordCorrecta = await bcrypt.compare(password, usuario.password)
        if (!passwordCorrecta) {
            return res.status(400).json({ mensaje: 'Email o contraseña incorrectos' })
        }

        // Generamos el token JWT
        const token = jwt.sign(
            { id: usuario.id, rol: usuario.rol },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        )

        res.json({ mensaje: 'Login exitoso', token })

    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error })
    }
})

// Exportamos el router
module.exports = router