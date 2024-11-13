import { Libro } from "./clases/Libro.js"

// conexion.query("SELECT * FROM libros", (err, res)=>{
//     console.log(res.rows)
// })

const libro1 = new Libro("El poder del ahora", "Eckhart Tolle", 1997)
const result = libro1.registrar()

console.log({libro1})