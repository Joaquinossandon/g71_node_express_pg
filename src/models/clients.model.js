const { pool } = require('../config/db_connection') // importamos la conexión a la base de datos
const format = require('pg-format')

const getAll = async ({ limit = 10, order_by = 'nombre_ASC', page = 2 }) => {
  const [column_order, type_order] = order_by.split('_')
  const offset = (page - 1) * limit

  const formatedQuery = format(
    'SELECT nombre, email FROM clientes ORDER BY %s %s LIMIT %s OFFSET %s',
    column_order,
    type_order,
    limit,
    offset
  )
  const { rows: clients } = await pool.query(formatedQuery) // ejecutamos la consulta

  // obtenemos el total de registros en la tabla
  const countQuery = 'SELECT COUNT(*) FROM clientes'
  const {
    rows: [{ count }]
  } = await pool.query(countQuery) // {[{count: 20}]} -> destructuring

  const tieneSiguiente = page * limit < count // si hay más registros por cargar

  const tienePrevio = page > 1 // si hay registros anteriores

  return { clients, count, tienePrevio, tieneSiguiente } // retornamos los registros obtenidos
}

const getById = async (id) => {
  const { rows } = await pool.query({
    text: 'SELECT * FROM clientes WHERE id = $1', // consulta parametrizada
    values: [id] // valores de los parámetros,
    // deben ser un array en el mismo orden que los placeholders ($1)
  })

  return rows // retornamos los registros obtenidos
}

const create = async (nombre, email) => {
  const { rows } = await pool.query({
    text: 'INSERT INTO clientes (nombre, email) VALUES ($1, $2) RETURNING *',
    values: [nombre, email]
  }) // returning * nos permite obtener los datos del registro insertado
  // podemos obtener solo los campos que necesitamos: RETURNING id, nombre, email

  return rows // retornamos los registros obtenidos
}

// actualizar sólo algunos campos de un cliente
const update = async (id, nombre, email) => {
  const [currentClientData] = await getClientsById(id)

  const { rows } = await pool.query({
    text: 'UPDATE clientes SET nombre = $1, email = $2 WHERE id = $3 RETURNING *',
    values: [
      nombre ?? currentClientData.nombre,
      email ?? currentClientData.email,
      id
    ]
  }) // este query actualiza solo los campos que se pasen como argumento y mantiene los demás.

  return rows
}

const destroy = async (id) => {
  const { rows } = await pool.query({
    text: 'DELETE FROM clientes WHERE id = $1 RETURNING *',
    values: [id]
  })

  return rows
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  destroy
}
