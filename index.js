import { Libro } from "./clases/Libro.js";

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
(async() => {
    const libro2 = new Libro(2);
    console.log(await libro2.describir())
    const respuesta = await libro2.devolver()
        //console.log(respuesta);
    console.log(await libro2.describir()) 
  })();