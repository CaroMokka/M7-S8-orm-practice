import { conexion } from "../conexion.js";

class Libro {
  constructor(id, titulo, autor, anio, disponible) {
    this._id = id,
      this._titulo = titulo,
      this._autor = autor,
      this._anio = anio,
      this._disponible = disponible;
  }

  async describir() {
    const consulta = await this.consultar();
    if (!consulta) {
      return null;
    }
    const descripcion = `Titulo: ${this._titulo}, Autor: ${this._autor}, Año: ${
      this._anio
    }, Disponible: ${this._disponible ? "Si" : "No"}`;

    return descripcion;
  }
  async prestar() {
    const consulta = await this.consultar();
    if (!consulta) {
      return { message: "libro no existente", code: 404 };
    }
    if (!this._disponible) {
      return { message: "No esta disponible", code: 422 };
    }
    const args = {
      text: "UPDATE libros SET disponible=false WHERE id=$1 RETURNING *",
      values: [this._id],
    };
    const result = await conexion.query(args);
    return { message: "Libro prestado exitosamente", code: 200 };

  }
  async devolver() {
    await this.consultar();
    if (this._disponible) {
      console.log(
        "Imposible devolver, ya que el libro se encuentra disponible"
      );
      return false;
    }
    const args = {
      text: "UPDATE libros SET disponible=true WHERE id=$1 RETURNING *",
      values: [this._id],
    };
    const res = await conexion.query(args);
    console.log("Libro devuelto con éxito");
    return res.rows;
  }
  async registrar() {
    const args = {
      text: "INSERT INTO libros(titulo, autor, anio) VALUES($1, $2, $3) RETURNING *",
      values: [this._titulo, this._autor, this._anio],
    };
    const result = await conexion.query(args);
    return result.rows;
  }
  async consultar() {
    const result = await conexion.query("SELECT * FROM libros WHERE id=$1", [
      this._id
    ]);
  
    if (result.rowCount == 0) return null;
    const libro = result.rows[0];

    this._titulo = libro.titulo;
    this._autor = libro.autor;
    this._anio = libro.anio;
    this._disponible = libro.disponible;
    return true
  }

  //Accesadores y Mutadores
  get titulo() {
    return this._titulo;
  }
  set titulo(valor) {
    this._titulo = valor;
  }
  get autor() {
    return this._autor;
  }
  set autor(valor) {
    this._autor = valor;
  }
  get anio() {
    return this._anio;
  }
  set anio(valor) {
    this._anio = valor;
  }
  get disponible() {
    return this._disponible;
  }
  set disponible(valor) {
    this._disponible = valor;
  }
}

export { Libro };
