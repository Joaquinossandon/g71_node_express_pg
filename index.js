const { pool } = require("./connection.js");
const cors = require("cors");

// express
const express = require("express"); // importamos express
const app = express(); // instanciamos express

app.use(express.json()); // middleware para parsear el body de las peticiones
app.use(cors()); // middleware para permitir peticiones desde ¡cualquier origen!

// rutas
app.get("/clientes/:id", async (req, res) => {
    const { id } = req.params; 
    const result = await pool.query({
        text: "SELECT * FROM clientes WHERE id = $1", // consulta parametrizada
        values: [id], // valores de los parámetros, 
        // deben ser un array en el mismo orden que los placeholders ($1)
    }); 

    /* ---------------
    las consultas parametrizadas son más seguras que las consultas concatenadas
    porque evitan la inyección de SQL
    la inyección de SQL es una técnica que permite a un atacante ejecutar código SQL arbitrario
    en la base de datos, si no se sanitizan los datos de entrada.
    --------------- */
    
    res.json(result.rows); // respondemos con los registros obtenidos
});

/* ---------------
Difencias entre Query y Params

 query: /clientes?id=1
 params: /clientes/1

las rutas con query generalmente se usan para filtrar datos
las rutas con params se usan para obtener un recurso específico

los params van en lugares que nosotros definimos en la URL.
    Ejemplo: /clientes/:id/ventas/:idVenta
    el ejemplo anterior tiene dos parámetros: id y idVenta
este endpoint se usaría para obtener una venta específica de un cliente específico

los query van al final de la URL con un ? y se separan con &
además, los query usan el formato clave=valor
    Ejemplo: /clientes?nombre=Juan&ciudad=Quito
    el query anterior tiene dos parámetros: nombre=Juan y ciudad=Quito
este endpoint se usaría para obtener todos los clientes que se llamen Juan y vivan en Quito

----------------- */ 

app.get("/clientes", async (req, res) => {
    const result = await pool.query("SELECT nombre, email FROM clientes"); // ejecutamos la consulta
    
    res.json(result.rows); // respondemos con los registros obtenidos
});

app.post("/clientes", async (req, res) => {
    const { nombre, email } = req.body; // obtenemos los datos del body (express.json)
    const result = await pool.query({
        text: "INSERT INTO clientes (nombre, email) VALUES ($1, $2) RETURNING *",
        values: [nombre, email],
    }); // returning * nos permite obtener los datos del registro insertado
    // podemos obtener solo los campos que necesitamos: RETURNING id, nombre, email
    
    res.status(201).json({
        message: "Se insertó el cliente",
        result: result.rows,
    }); // respondemos con un mensaje y los datos del registro insertado
    // 201 es el código de estado para "Created"
});

app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
}); // iniciamos el servidor en el puerto 3000
