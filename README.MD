# Ejercicio Gestión de clientes

Este ejercicio tiene como objetivo contruir un servidor web con Express que permita conectarse a una base e datos PostgreSQL. Para ello, se trabajará con el paquete `pg` y se ejecutarán las configuraciones necesarias para realizar dicha conexión.

## Difencias entre Query y Params

query: `/clientes?id=1`
params: `/clientes/1`

las rutas con query generalmente se usan para filtrar datos
las rutas con params se usan para obtener un recurso específico

los params van en lugares que nosotros definimos en la URL.

    Ejemplo: `/clientes/:id/ventas/:idVenta`
    el ejemplo anterior tiene dos parámetros: `id` y `idVenta`

este endpoint se usaría para obtener una venta específica de un cliente específico

los query van al final de la URL con un `?` y se separan con `&`
además, los query usan el formato `clave=valor`

    Ejemplo: `/clientes?nombre=Juan&ciudad=Quito`
    el query anterior tiene dos parámetros: `nombre=Juan` y `ciudad=Quito`

este endpoint se usaría para obtener todos los clientes que se llamen Juan y vivan en Quito

## Middlewares

Los middlewares son funciones que se ejecutan antes de que lleguen a las rutas. Se pueden usar para validar datos, autenticar usuarios, etc.

### express.json()

En el código, utilizamos express.json() para que el servidor pueda entender los datos que vienen en formato JSON. Este middleware se encarga de parsear los datos y los deja disponibles en `req.body`.

### cors

El middleware cors nos permite configurar los permisos de acceso a nuestro servidor. En este caso, permitimos que cualquier origen pueda acceder a nuestra API.

Otros ejemplos de uso de cors:

- `cors({ origin: 'http://localhost:3000' })` solo permite que el servidor en el puerto 3000 acceda a nuestra API
- `cors({ origin: '*' })` permite que cualquier origen acceda a nuestra API
- `cors({ origin: ['http://localhost:3000', 'http://localhost:3001'] })` permite que los servidores en los puertos 3000 y 3001 accedan a nuestra API

### Otros middlewares populares

Algunos de los middlewares populares son:

- `morgan` para registrar las peticiones al servidor
- `cookie-parser` para trabajar con cookies
- `multer` para subir archivos al servidor

## RETURNING

`RETURNING *` al final de una consulta (por ejemplo) INSERT, nos permite obtener los datos del registro insertado.

También, podemos obtener solo los campos que necesitamos: RETURNING id, nombre, email
