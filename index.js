const app = require('./server') // importamos la configuración de express

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000')
}) // iniciamos el servidor en el puerto 3000
