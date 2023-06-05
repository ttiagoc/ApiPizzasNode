
import sql from 'mssql';
import config from '../../dbconfig.js';
import EscribirError from '../modules/log-helper.js';


export default class IngredientesService {

    
    getAll = async (top, orderField, sortOrder) => {
        let resultado = null

        console.log("Estoy en : IngredientesService.GetAll")

        try {
            let pool = await sql.connect(config)
            let result = await pool.request().
                query("SELECT " + (top == null ? '' : "TOP " + top) + " * FROM Ingredientes " + (orderField == null ? '' : "ORDER BY " + orderField) + " " + (sortOrder == null ? '' : sortOrder))

            resultado = result.recordsets[0]

        } catch (error) {
            
            EscribirError(" IngredientesService.GetAll: " + error)
        }
        return resultado;
    }

    getById = async (id) => {
        let resultado = null

        console.log("Estoy en : IngredientesService.GetByid")
        try {
            let pool = await sql.connect(config)
            let result = await pool.request().input('pid', sql.Int, id).query("SELECT * FROM Ingredientes WHERE Id = @pId")

            resultado = result.recordsets[0][0]
                  

        } catch (error) {
            
            EscribirError(" IngredientesService.getById: " + error)
        }
        return resultado
    }

    deleteById = async (id) => {
        let resultado = null
        console.log("Estoy en : IngredientesService.deleteById")
        try {
            let pool = await sql.connect(config)
            let result = await pool.request().input('pid', sql.Int, id).query("DELETE FROM Ingredientes WHERE Id = @pId")

            resultado = result.rowsAffected;


        } catch (error) {
            EscribirError(" IngredientesService.deleteById: " + error)
        }
        return resultado
    }

    Insert = async (nombre) => {
        let resultado = null
        console.log("Estoy en : IngredientesService.Insert")
        try {
            let pool = await sql.connect(config)
            let result = await pool.request()
                .input('pNombre', sql.VarChar, nombre ?? '')
                .query("INSERT INTO Ingredientes(Nombre) VALUES(@pNombre)")
            resultado = result.rowsAffected;

        } catch (error) {
            EscribirError(" IngredientesService.Insert: " + error)
        }
        return resultado
    }


    Update = async (id, nombre) => {
        let resultado = null
        console.log("Estoy en : IngredientesService.Update")
        try {
            let pool = await sql.connect(config)
            let result = await pool.request()
                .input('pId', sql.Int, id)
                .input('pNombre', sql.VarChar, nombre)
                .query("UPDATE Ingredientes set Nombre = @pNombre WHERE Id = @pId")
            resultado = result.rowsAffected;

        } catch (error) {
            EscribirError(" IngredientesService.Update: " + error)
        }
        return resultado
    }


}