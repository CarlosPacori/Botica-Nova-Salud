# Botica Nova Salud — Diario de Avance

---

## SEMANA 9 — Git & GitHub

### 1. Creamos el repositorio
Se creó el repositorio en GitHub y se vinculó con la carpeta local del proyecto.
Se trabaja con dos ramas:
- `main` → código estable
- `feature` → desarrollo de nuevas funcionalidades

### 2. .gitignore
Archivo que le dice a Git qué archivos NO debe subir a GitHub.
Se ignoran cosas como:
- `node_modules/` → pesa mucho, se puede recrear con npm install
- `.env` → contiene contraseñas y datos sensibles de la base de datos
- Archivos temporales del sistema

### 3. .env.example
Plantilla pública del `.env`. Muestra qué variables se necesitan pero SIN los valores reales.
Sirve para que cualquiera que clone el proyecto sepa qué tiene que configurar.

### 4. Commits con Conventional Commits
Formato estándar para escribir mensajes de commit:
- `feat:` → funcionalidad nueva
- `fix:` → corrección de error
- `docs:` → cambios en documentación
- `refactor:` → reorganización de código

### 5. Merge conflict resuelto
Se produjo un conflicto al mergear ramas (mismo archivo modificado en dos lados).
Se resolvió manualmente eligiendo qué código conservar.

---

## SEMANA 10 — Node.js & MySQL

### 1. Verificar herramientas instaladas
Antes de empezar siempre verificar que todo esté instalado:
```
node --version   → si no responde, instalar Node.js
npm --version    → viene junto con Node.js
mysql --version  → si no responde, es problema de PATH
```

**Problema PATH de MySQL:**
MySQL estaba instalado pero Windows no lo encontraba.
Solución: agregar la ruta del ejecutable al PATH del sistema:
```
C:\Archivos de programa\MySQL\MySQL Server 8.0\bin
```

### 2. Inicialización del proyecto con npm
```
npm init -y
```
Esto crea el archivo `package.json` que registra el nombre del proyecto,
la versión y todas las dependencias que vamos instalando.
También se genera `package-lock.json` → nunca editar manualmente.
Al instalar paquetes se crea `node_modules/` → nunca subir a GitHub.

### 3. Paquetes instalados
```
npm install express mysql2 dotenv
```
- **express** → framework para crear el servidor y definir rutas (GET, POST, etc.)
- **mysql2** → permite que Node.js se conecte y hable con MySQL
- **dotenv** → lee las variables del archivo `.env` para usarlas en el código

### 4. Archivo .env
Contiene las credenciales reales de la base de datos:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=****
DB_NAME=botica_nova_salud
DB_PORT=3306
```
⚠️ Debe estar guardado en UTF-8 sin BOM. Si tiene BOM aparece `��` al inicio
y el servidor no lee ninguna variable (sale `injected env (0)`).

### 5. Estructura de carpetas creada
```
Botica-Nova-Salud/
├── src/
│   ├── config/
│   │   └── database.js   → conexión a MySQL
│   ├── models/           → pendiente
│   └── routes/           → pendiente
├── .env                  → credenciales reales (no sube a GitHub)
├── .env.example          → plantilla pública
├── .gitignore            → protección
├── index.js              → servidor Express principal
├── package.json          → registro del proyecto y dependencias
└── README.md
```

### 6. index.js — El servidor
Se configuró el servidor Express. Lo que hace:
- Carga las variables del `.env` con dotenv
- Crea la aplicación Express
- Activa el middleware `express.json()` para leer datos en formato JSON
- Define la ruta base GET `/` que responde con un mensaje de bienvenida
- Arranca el servidor en el puerto 3000 con `app.listen()`

### 7. database.js — La conexión a MySQL
Se configuró la conexión entre Node.js y MySQL usando mysql2.
Lee las credenciales desde el `.env` (DB_HOST, DB_USER, etc.)
Al iniciar el servidor verifica si la conexión fue exitosa.

### 8. Entrar a MySQL y crear la base de datos
Para entrar a MySQL desde PowerShell:
```
mysql -u root -p
```
Pide la contraseña del usuario root.

Comandos usados dentro de MySQL:
```sql
SHOW DATABASES;           -- ver bases de datos existentes
CREATE DATABASE botica_nova_salud;
USE botica_nova_salud;
SHOW TABLES;              -- verificar tablas creadas
```

### 9. Tablas creadas
**medicamentos** → guarda el inventario de la botica
- `id` → número único automático
- `nombre` → nombre del medicamento
- `descripcion` → descripción del producto
- `precio` → precio con decimales
- `stock` → cantidad disponible
- `stock_minimo` → cantidad mínima antes de generar alerta (default: 10)
- `created_at` → fecha de registro automática

**ventas** → registra cada venta realizada
- `id` → número único automático
- `medicamento_id` → referencia al medicamento vendido (FK)
- `cantidad` → cuántas unidades se vendieron
- `total` → monto total de la venta
- `fecha` → fecha y hora automática

### 10. Estado actual del servidor
```
✅ Servidor corriendo en http://localhost:3000
✅ Conexión exitosa a MySQL - Botica Nova Salud
✅ Variables de entorno leyendo correctamente (injected env 5)
```

---

## PENDIENTE — Semana 10
- [ ] Rutas CRUD de medicamentos (GET, POST, PUT, DELETE)
- [ ] Rutas CRUD de ventas (GET, POST)
- [ ] Alerta de stock bajo → GET /medicamentos/stock-bajo
- [ ] Sequelize ORM
- [ ] Autenticación JWT
- [ ] Seguridad: CORS, SQL Injection, XSS