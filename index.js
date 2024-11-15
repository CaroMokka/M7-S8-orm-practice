import { Libro } from "./clases/Libro.js";
import http from "http"
import url from "url";

const port = 3000

http.createServer( async (request, response) => {
     const method = request.method;
     const urlParsed = url.parse(request.url, true);
     const pathname = urlParsed.pathname;

   

    //GET - describir
    if ( method == "GET" && pathname == "/libro/describir") {
        const id = urlParsed.query.id
        const libro = new Libro(id)
  
        const description = await libro.describir()
   
        if(!description){
            response.writeHead(404, { "Content-Type": "application/json" })
            return response.end(JSON.stringify({ message: "Libro no existe" }))
        }
        response.writeHead(200, { "Content-Type": "application/json" })
        return response.end(JSON.stringify({message: "Datos descriptivos del libro", data: description}))
    } 

    // POST - prestar
    if(method == "POST" && pathname == "/libro/prestar"){
        let body = ""
        request.on("data", (chunk) => {
            body += chunk.toString()
        })
        request.on("end", async () => {
            body = JSON.parse(body)
            const libro = new Libro(body.id)
            const result = await libro.prestar()
            response.setHeader("Content-Type", "application/json")
            response.writeHead(result.code)
            return response.end(JSON.stringify({ message: result.message }))
        })
  
       
    }

    if(method == "POST" && pathname == "/libro/devolver"){
        let body = ""
        request.on("data", (chunk)=>{
            body += chunk.toString()
        })
        request.on("end", async () => {
            body = JSON.parse(body)
            
            const libro = new Libro(body.id)
            const libroDevuelto = await libro.devolver()
   
            response.setHeader("Content-Type", "application/json")
            response.writeHead(libroDevuelto.code)
            return response.end(JSON.stringify({ message: libroDevuelto.message }))
        })
    }

    //POST - Registrar
    if(method == "POST" && pathname == "/libro/registrar"){
        let body = ""
        request.on("data", (chunk)=>{
            body += chunk.toString()
        })
        request.on("end", async ()=>{
            body = JSON.parse(body)
            
            const libro = new Libro(null, body.titulo, body.autor, body.anio)
            const libroRegistrado = await libro.registrar()

            response.setHeader("Content-Type", "application/json")
            response.writeHead(200)
            return response.end(JSON.stringify({ message: "Registro de libro éxitoso" , data: libroRegistrado}))
        })
    }
    
    


    // response.end(JSON.stringify({ message: "Ruta no existente" }))
  })
  .listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
  });

//Ejemplo de registro de libro
// const libro1 = new Libro(null,"El poder del ahora", "Eckhart Tolle", 1997)
// const result = libro1.registrar()
// console.log({libro1})

//Ejemplo consulta de libro
// (async() => {
//   const libro2 = new Libro(2);
//   await libro2.consultar();
//   console.log({ libro2 });
// })();

//Ejemplo de descripción de libro
// (async() => {
//   const libro2 = new Libro(2);
//   const respuesta = await libro2.describir();
  
//   console.log({ respuesta });
// })();

//Ejemplo de prestar
// (async() => {
//   const libro2 = new Libro(2);
//   console.log(await libro2.describir())
//   const respuesta = await libro2.prestar()
//   console.log(respuesta);
//   console.log(await libro2.describir())
    
// })();

//Ejemplo para devolver libro
// (async() => {
//     const libro2 = new Libro(2);
//     console.log(await libro2.describir())
//     const respuesta = await libro2.devolver()
//         //console.log(respuesta);
//     console.log(await libro2.describir()) 
//   })();