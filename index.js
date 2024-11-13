import { conexion } from "./conexion.js"

conexion.query("SELECT * FROM libros", (err, res)=>{
    console.log(res.rows)
})