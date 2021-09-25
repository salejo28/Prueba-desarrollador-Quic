# Prueba desarrollador

[Requisitos de la prueba](https://hackmd.io/jQgCodYMTUek3njon1l8VQ?view)

Esta prueba fue desarrollada con Node js con el framework Express js, cuenta con una base de datos MySQL, autenticación por tokens con JWT.

## Estructura del projecto
```
├── App.js
├── auth
│   └── auth.js
├── auto
│   └── auto.js
├── config
│   └── config.js
├── controllers
│   └── user.controllers.js
├── DB.js
├── index.js
├── libs
│   └── ExistUser.js
├── middleware
│   ├── ensurejson.js
│   ├── Token.js
│   └── Users.js
├── routes
│   ├── index.routes.js
│   └── users.routes.js
└── security
    └── password.js

```

## Estructura de la base de datos
```
+-------------+--------------+------+-----+---------+----------------+
| Field       | Type         | Null | Key | Default | Extra          |
+-------------+--------------+------+-----+---------+----------------+
| id          | int(11)      | NO   | PRI | NULL    | auto_increment |
| first_name  | varchar(128) | NO   |     | NULL    |                |
| last_name   | varchar(128) | NO   |     | NULL    |                |
| email       | varchar(64)  | NO   |     | NULL    |                |
| password    | varchar(250) | NO   |     | NULL    |                |
| token       | varchar(250) | YES  |     | NULL    |                |
| age         | int(3)       | NO   |     | NULL    |                |
| image       | text         | NO   |     | NULL    |                |
| description | varchar(255) | NO   |     | NULL    |                |
+-------------+--------------+------+-----+---------+----------------+

```

## Instrucciones para ejecutarlo en tu computador
1. Colnar el repositorio
```
git clone https://github.com/santi280403/Prueba-desarrollador-Quic.git
```
2. Crear la base de datos
Si lo vas hacer desde consola solo copea el archivo que esta en la carpeta db y si lo vas hacer desde otro gesto como lo puede ser **phpmyadmin** sube el archivo.

3. Crea el archivo **.env** en la raíz del projecto, con la siguiente estructura:
```
DB_HOST=tu_host
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_DATABASE=nombre_de_la_base_de_datos

# JWT
JWT_SECRET_KEY=tu_secret_key_para_JWT
```
4. Ejecutar la aplicacion
```
npm start
```

## Endpoints
Los endpoints que tienen **(auth)** deben tener el header **x-access-token** con el valor **Bearer [token]**, todos los endpoints deben tener el header **Content-Type=application/json**.
> GET /api/users (**auth**)
> Devuelve todos los usuarios
>
> GET /api/users/uid (**auth**)
> Devuelve el usuario que se esta consultando con el **uid**
>
> POST /api/users (**auth**)
> Crea un usuario y los campos son:
> ```
> first_name
> last_name
> email
> password
> age
> image 
> description
> ```
>
> POST /api/users 
> Hace el login del usuario y devuelve un token para el acceso, los campos son:
>```
> email
> password
>```
>
> PUT /api/users/uid (**auth**)
> Actualiza todos los campos que hay en el endpoint de crear usuario **POST /api/users**
>
>
> PATCH /api/users/uid (**auth**)
> Actualiza parcialmente y no todos los campos son requeridos
>
> DELETE /api/users/uid (**auth**)
> Elimina un usuario
>