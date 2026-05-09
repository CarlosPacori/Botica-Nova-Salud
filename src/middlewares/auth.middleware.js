// src/middlewares/auth.middleware.js

// Importamos jsonwebtoken
const jwt = require('jsonwebtoken')

// Función guardián que verifica el token
const verificarToken = (req, res, next) => {
    // Buscamos el token en los headers de la petición
    const token = req.headers['authorization']

    // Si no hay token, bloqueamos
    if (!token) {
        return res.status(401).json({ mensaje: 'Acceso denegado, token requerido' })
    }

    try {
        // Verificamos que el token sea válido
        const verificado = jwt.verify(token, process.env.JWT_SECRET)
        
        // Guardamos los datos del usuario en req.usuario
        req.usuario = verificado
        
        // Dejamos pasar a la siguiente función
        next()
    } catch (error) {
        res.status(401).json({ mensaje: 'Token inválido' })
    }
}

// Exportamos el middleware
module.exports = verificarToken