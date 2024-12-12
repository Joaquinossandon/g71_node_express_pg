const cors = require('cors')

// express
const express = require('express') // importamos express
const app = express() // instanciamos express

// controladores
const {
  getClientById,
  createClient,
  getClients,
  deleteClient,
  updateClient
} = require('./src/controllers/clients.controller.js')

// middlewares
app.use(express.json()) // middleware para parsear el body de las peticiones
app.use(cors()) // middleware para permitir peticiones desde ¡cualquier origen!

// rutas
app.get('/clientes/:id', getClientById)
app.get('/clientes', getClients)
app.post('/clientes', createClient)
app.put('/clientes/:id', updateClient)
app.delete('/clientes/:id', deleteClient)

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000')
}) // iniciamos el servidor en el puerto 3000
