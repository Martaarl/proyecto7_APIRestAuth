1.ESTRUCTURA DEL DOCUMENTO 📃
 --> src
        - api
            controllers
            models
            routes
        - config
        - data
        - middlewares
        - utils
        
2.FUNCIONALIDAD ▶️
Users
  *  Registro de usuarios
  *  Login y generación de token JWT
  *  GET de todos los usarios (solo admin)
  *  DELETE de todos los usarios (solo admin)
  *  Relación con personajes (characters)
Characters
  *  CRUD completo
  *  Relación con plataformas (platforms)
Platforms
  *  CRUD completo
  *  Relación con personajes (movies)

3.ROLES Y PERMISOS ✅
User - Puede autentificarse y ver su propio perfil
Admin - Puede crear, modificar y eliminar usuarios, acceder a todo

4.SEMILLA 🌱
Crea personajes de ejemplo y evita duplicados desde: node src/config/seeds.js

5.USO EN INSOMNIA 🤓
La autenticación se hará con:
  POST /api/users/register -> para registrar un usuario
  POST /api/users/login -> iniciar sesión y recibir token
*Para rutas protegidas habrá que añadir el token en auth 

        
