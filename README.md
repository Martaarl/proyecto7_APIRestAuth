[README (2).md](https://github.com/user-attachments/files/23290221/README.2.md)
# 🎶 Proyecto 7 – API REST de Música (Users, Artists & Albums)

API REST construida con **Express**, **MongoDB** y **Mongoose**. Permite gestionar **usuarios**, **artistas** y **álbumes** con roles de usuario (admin y user) y autenticación mediante **JWT** y control de acceso por **roles**.
___
## 🧩 Funcionalidades principales

✅ Registro y login de usuarios con contraseñas encriptadas  
✅ Autenticación mediante token JWT  
✅ Roles de usuario (`user`, `admin`)  
✅ Control de acceso mediante middlewares  
✅ CRUD completo para `users`, `artists` y `albums`  
✅ Relación entre colecciones (`Artist` ↔ `Album`)  
✅ Base de datos en **MongoDB Atlas**  
✅ Endpoint de **seed** para precargar datos

## 🚀 Tecnologías utilizadas

- **Node.js** + **Express**
- **MongoDB** + **Mongoose**
- **JWT (Json Web Token)**
- **Bcrypt** (para encriptar contraseñas)
- **dotenv** (variables de entorno)
- **CORS**
- **Nodemon** (entorno de desarrollo)
___

## 📁 Estructura del proyecto
src/
 ├─ api/
     ├─ controllers/
     ├─ models/
     └─ routes/
 ├─ config/
     └─ db.js
     └─  jwt.js
 ├─ middlewares/
     └─ auth.js
 └─ utils
     └─ seeds.js
.env
index.js
package.json
___

## ⚡️ Instalación
1. Clonar el repositorio:
```bash
git clone <URL_DEL_REPOSITORIO>
```
2. Instalar dependencias:
```bash
npm install 
```
3. Crear un archivo .env con las siguientes variables:
```bash
DB_URL=<TU_URL_DE_MONGODB>
JWT_SECRET=<TU_SECRETO_JWT>
```
4. ejecutar el servidor:
```bash
npm run dev
```
Servidor corriendo en: http://localhost:3000
___
## 🔐 Roles y permisos
* User
    *   Puede registrarse y autenticarse.
    * Puede ver artistas, álbumes y su propio perfil.
    * Puede eliminar su propia cuenta.
* Admin
    * Puede ver, crear, modificar y eliminar cualquier usuario.
    * Puede cambiar el rol de un usuario a “admin”.
    * Puede crear, modificar y eliminar artistas y álbumes.
___
## 🔑 Autenticación
* Todos los endpoints sensibles requieren token JWT.
* Middleware isAuth valida token.
* Middleware isAdmin valida que el usuario sea administrador.
___
## MODELOS
### User
- `userName`: String, obligatorio
- `password`: String, obligatorio
- `rol`: String, enum ["user","admin"], default "user"
- `favoriteAlbums`: Array<ObjectId>, ref `Album`
- timestamps: true

### Artist
- `name`: String, obligatorio
- `image`: String
- `genre`: String, enum ["pop","rock","hip-hop","jazz","electronic","classical"], obligatorio
- `albums`: Array<ObjectId>, ref `Album`
- timestamps: true

### Album
- `title`: String, obligatorio
- `year`: Number
- `image`: String
- `artist`: Array<ObjectId>, ref `Artist`, obligatorio
- timestamps: true

## ✅ ENDPOITNS
###  ✋ Users (`/api/users`)

| **Método** | **Endpoint** | **Descripción** | **Autenticación** |
|-------------|---------------|------------------|-------------------|
| **POST** | `/register` | Registro de usuario (solo se crea con rol `"user"`) | ❌ |
| **POST** | `/login` | Login y obtención de token JWT | ❌ |
| **GET** | `/` | Obtener todos los usuarios | ✅ (Admin) |
| **GET** | `/:userName` | Obtener usuario por nombre | ✅ (Admin o el propio usuario) |
| **DELETE** | `/:userName` | Eliminar usuario | ✅ (Admin o el propio usuario) |

#### 🧾 Ejemplo de cuerpo para registro

```json
{
  "userName": "marta",
  "password": "admin123"
}
````
⚠️ El primer admin se crea directamente en la base de datos, los usuarios normales siempre con rol user.

### Artistas
### 🎤 Artistas (`/api/artists`)

| **Método** | **Endpoint** | **Descripción** | **Autenticación** |
|-------------|---------------|------------------|-------------------|
| **GET** | `/` | Obtener todos los artistas | ❌ |
| **GET** | `/:id` | Obtener artista por ID | ❌ |
| **POST** | `/` | Crear nuevo artista | ✅ (Admin) |
| **PUT** | `/:id` | Actualizar artista existente | ✅ (Admin) |
| **DELETE** | `/:id` | Eliminar artista | ✅ (Admin) |

#### 📘 Ejemplo de cuerpo para crear un artista

```json
{
  "name": "Amy Winehouse",
  "genre": "Soul / Jazz",
  "country": "Reino Unido"
}
```
### 💿 Álbumes (`/api/albums`)

| **Método** | **Endpoint** | **Descripción** | **Autenticación** |
|-------------|--------------|------------------|-------------------|
| **GET** | `/` | Obtener todos los álbumes | ❌ |
| **GET** | `/:id` | Obtener álbum por ID | ❌ |
| **POST** | `/` | Crear nuevo álbum | ✅ (Admin) |
| **PUT** | `/:id` | Actualizar álbum existente | ✅ (Admin) |
| **DELETE** | `/:id` | Eliminar álbum | ✅ (Admin) |

#### 🧾 Ejemplo de cuerpo para crear un álbum

```json
{
  "title": "A Rush of Blood to the Head",
  "artist": "Coldplay",
  "year": 2002,
  "genre": "Alternative Rock",
  "cover": "https://upload.wikimedia.org/wikipedia/en/2/29/Coldplay_-_A_Rush_of_Blood_to_the_Head.jpg"
}
```
___

## 🌱Semilla (Seed)

Semilla para cargar datos iniciales de álbumes (y/o artistas) en la base de datos si no existen previamente.
```bash
node src/utils/seeds.js
```
___
## 🔗 Relaciones entre colecciones

- Usuario ↔ Álbum: favoritos (favoriteAlbums)
- Álbum ↔ Artista: varios artistas por álbum
- Artista ↔ Álbum: varios álbumes por artista
___
## 🛠️ Uso

1.  Configura .env con la URL de tu base de datos y la clave JWT
2. Ejecuta npm install
3. Levanta el servidor: npm run dev
Prueba los endpoints con Insomnia o Postman

___
## 👩‍💻 Autor
**Marta Ramírez Linares**  
Proyecto desarrollado en **Node.js**, **Express** y **MongoDB** con autenticación **JWT**.  

📧 *Contacto:* *https://github.com/Martaarl*


