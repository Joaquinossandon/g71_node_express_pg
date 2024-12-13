const cors = require('cors')
const morgan = require('morgan')

// express
const express = require('express') // importamos express
const app = express() // instanciamos express

// middlewares
app.use(morgan('dev'))

// rutas
const clientsRoutes = require('./src/routes/clients.routes.js')

// middlewares
app.use(express.json()) // middleware para parsear el body de las peticiones
app.use(cors()) // middleware para permitir peticiones desde ¡cualquier origen!

app.use('/', clientsRoutes)

module.exports = app
