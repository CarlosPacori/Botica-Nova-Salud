# Botica Nova Salud
Sistema web de gestión de inventario y ventas

## Sesión — Rutas CRUD

### Lo que aprendí
- Creé el archivo de rutas y lo conecté al index con app.use
- GET trae datos, POST crea, PUT actualiza, DELETE elimina
- req.params viene de la URL, req.body viene adentro de la petición
- WHERE es obligatorio en UPDATE y DELETE para no afectar toda la tabla
- affectedRows detecta si el id existe o no
- En ventas primero verifico stock, luego registro la venta, luego descuento

