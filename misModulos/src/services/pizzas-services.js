
import sql from 'mssql';
import config from '../../../dbconfig.js';
import EscribirError from '../modules/log-helper.js';

export default class PizzaService {


    getAll = async (top,oderField,sortOrder) => {
        let resultado = null
        let queryTop = "TOP " + top
        let queryorder = "ORDER BY " + oderField
        console.log("Estoy en : PizzaService.GetAll")
        try {
            let pool = await sql.connect(config)
            let result = await pool.request().
                                    query("SELECT " + queryTop  + " * FROM Pizzas " + queryorder  + " " + sortOrder )
            resultado = result.recordsets[0] 
            
        } catch (error) {
            //console.log(error)
            EscribirError(error)
        }
        return resultado;
    }

    getById = async (id) => {
        let resultado = null
        console.log("Estoy en : PizzaService.GetByid")
        try {
            let pool = await sql.connect(config)
            let result = await pool.request().input('pid',sql.Int,id).query("SELECT * FROM Pizzas WHERE id = @pId")
            resultado = result.recordsets[0][0] 
            
        } catch (error) {
            EscribirError(error)
        }
        return resultado
    }

    deleteById = async (id) => {
        let resultado = null
        console.log("Estoy en : PizzaService.deleteById")
        try {
            let pool = await sql.connect(config)
            let result = await pool.request().input('pid',sql.Int,id).query("DELETE FROM Pizzas WHERE id = @pId")
            resultado = result.rowsAffected;
            
        } catch (error) {
            EscribirError(error)
        }
        return resultado
    }

    Insert = async (nombre,libreGluten,importe,descripcion) => {
        let resultado = null
        console.log("Estoy en : PizzaService.Insert")
        try {
            let pool = await sql.connect(config)
            let result = await pool.request()
            .input('pNombre',sql.VarChar, nombre ?? '')
            .input('pLibreGluten',sql.Bit,libreGluten ?? '')
            .input('pImporte',sql.Float,importe  ?? '')
            .input('pDescripción',sql.VarChar,descripcion ?? '')
            .query("INSERT INTO Pizzas(Nombre,LibreGluten,Importe,Descripcion) VALUES(@pNombre, @pLibreGluten, @pImporte, @pDescripción)")
            resultado = result.rowsAffected;
            
        } catch (error) {
            EscribirError(error)
        }
        return resultado
    }


    Update = async (id,nombre,libreGluten,importe,descripcion) => {
        let resultado = null
        console.log("Estoy en : PizzaService.Update")
        try {
            let pool = await sql.connect(config)
            let result = await pool.request()
            .input('pId',sql.Int,id)
            .input('pNombre',sql.VarChar,nombre)
            .input('pLibreGluten',sql.Bit,libreGluten)
            .input('pImporte',sql.Float,importe)
            .input('pDescripcion',sql.VarChar,descripcion)
            .query("UPDATE Pizzas set Nombre = @pNombre,LibreGluten = @pLibreGluten,Importe = @pImporte,Descripcion = @pDescripcion WHERE id = @pId")
            resultado = result.rowsAffected;
            
        } catch (error) {
            EscribirError(error)
        }
        return resultado
    }


}