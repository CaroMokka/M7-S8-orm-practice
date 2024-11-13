import { conexion } from "../conexion.js"

class Libro {
    constructor(titulo, autor, anio, disponible){
        this._titulo = titulo,
        this._autor = autor,
        this._anio = anio,
        this._disponible = disponible
    }

    describir(){}
    prestar(){}
    devolver(){}
    async registrar(){
        const args = {
            text: "INSERT INTO libros(titulo, autor, anio) VALUES($1, $2, $3) RETURNING *",
            values: [this._titulo, this._autor, this._anio]
        }
        const result = await conexion.query(args)
        return result.rows
    }

    //Accesadores y Mutadores
    get titulo(){
        return this._titulo
    }
    set titulo(valor) {
        this._titulo = valor
    }
    get autor(){
        return this._autor
    }
    set autor(valor) {
        this._autor = valor
    }
    get anio(){
        return this._anio
    }
    set anio(valor) {
        this._anio = valor
    }
    get disponible(){
        return this._disponible
    }
    set disponible(valor) {
        this._disponible = valor
    }
}

export {Libro}

