const { Router } = require('express')
const router = Router()

// controladores
const clientController = require('../controllers/clients.controller')

// rutas
router.get('/clientes/:id', clientController.getClientById)
router.get('/clientes', clientController.getClients)
router.post('/clientes', clientController.createClient)
router.put('/clientes/:id', clientController.updateClient)
router.delete('/clientes/:id', clientController.deleteClient)

module.exports = router
