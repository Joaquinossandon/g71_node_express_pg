const { pool } = require('../config/db_connection') // importamos la conexión a la base de datos

const getAll = async () => {
  const { rows } = await pool.query('SELECT nombre, email FROM clientes') // ejecutamos la consulta

  return rows // retornamos los registros obtenidos
}

const getById = async (id) => {
  const { rows } = await pool.query({
    text: 'SELECT * FROM clientes WHERE id = $1', // consulta parametrizada
    values: [id] // valores de los parámetros,
    // deben ser un array en el mismo orden que los placeholders ($1)
  })

  /* ---------------
        las consultas parametrizadas son más seguras que las consultas concatenadas
        porque evitan la inyección de SQL
        la inyección de SQL es una técnica que permite a un atacante ejecutar código SQL arbitrario
        en la base de datos, si no se sanitizan los datos de entrada.
        --------------- */

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
