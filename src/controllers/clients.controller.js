const {
  create,
  destroy,
  getAll,
  getById,
  update
} = require('../models/clients.model')

const getClientById = async (req, res) => {
  const { id } = req.params
  const result = await getById(id) // ejecutamos la consulta

  res.json(result) // respondemos con los registros obtenidos
}

const getClients = async (req, res) => {
  let { limit, order_by, page = '1' } = req.query // obtenemos el query string
  const { clients, count, tienePrevio, tieneSiguiente } = await getAll({
    limit,
    order_by,
    page
  }) // ejecutamos la consulta

  const baseurl = `${req.protocol}://${req.get('host')}${req.path}`

  console.log(page)
  res.json({
    clients,
    count,
    prev: tienePrevio
      ? `${baseurl}?page=${Number(page) - 1}&limit=${Number(limit)}`
      : null,
    next: tieneSiguiente
      ? `${baseurl}?page=${Number(page) + 1}&limit=${Number(limit)}`
      : null
  }) // respondemos con los registros obtenidos
}

const createClient = async (req, res) => {
  const { nombre, email } = req.body // obtenemos los datos del body (express.json)
  const result = await create(nombre, email) // ejecutamos la consulta

  res.status(201).json({
    message: 'Se insertó el cliente',
    result
  }) // respondemos con un mensaje y los datos del registro insertado
  // 201 es el código de estado para "Created"
}

const updateClient = async (req, res) => {
  const { id } = req.params
  const { nombre, email } = req.body
  const result = await update(id, nombre, email)

  res.json({
    message: 'Se actualizó el cliente',
    result
  })
}

const deleteClient = async (req, res) => {
  const { id } = req.params
  const result = await destroy(id)

  res.json({
    message: 'Se eliminó el cliente',
    result
  })
}

module.exports = {
  getClientById,
  getClients,
  createClient,
  updateClient,
  deleteClient
}
