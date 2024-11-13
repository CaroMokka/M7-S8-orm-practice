import pkg from "pg"

const { Pool } = pkg
const conexion = new Pool({
    user: "postgres",
    password: "postgres",
    host: "localhost",
    port: 5432,
    database: "biblioteca"
})

export { conexion }