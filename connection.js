// importamos Pool desde pg para conectarnos a la DB
const { Pool } = require("pg");
// creamos una instancia de Pool con los datos de la DB
const pool = new Pool({
    host: "localhost",
    port: 5433,
    user: "postgres",
    password: "admin123",
    database: "gestion_clientes",
    allowExitOnIdle: true,
});

module.exports = { pool };
