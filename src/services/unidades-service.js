
import sql from 'mssql';
import config from '../../dbconfig.js';
import EscribirError from '../modules/log-helper.js';


export default class UnidadesService {

    
    getAll = async (top, orderField, sortOrder) => {
        let resultado = null

        console.log("Estoy en : UnidadesService.GetAll")

        try {
            let pool = await sql.connect(config)
            let result = await pool.request().
                query("SELECT " + (top == null ? '' : "TOP " + top) + " * FROM Unidades " + (orderField == null ? '' : "ORDER BY " + orderField) + " " + (sortOrder == null ? '' : sortOrder))

            resultado = result.recordsets[0]

        } catch (error) {
            
            EscribirError(" UnidadesService.GetAll: " + error)
        }
        return resultado;
    }

    getById = async (id) => {
        let resultado = null

        console.log("Estoy en : UnidadesService.GetByid")
        try {
            let pool = await sql.connect(config)
            let result = await pool.request().input('pid', sql.Int, id).query("SELECT * FROM Unidades WHERE Id = @pId")

            resultado = result.recordsets[0][0]
                  

        } catch (error) {
            
            EscribirError(" UnidadesService.getById: " + error)
        }
        return resultado
    }

    deleteById = async (id) => {
        let resultado = null
        console.log("Estoy en : UnidadesService.deleteById")
        try {
            let pool = await sql.connect(config)
            let result = await pool.request().input('pid', sql.Int, id).query("DELETE FROM Unidades WHERE Id = @pId")

            resultado = result.rowsAffected;


        } catch (error) {
            EscribirError(" UnidadesService.deleteById: " + error)
        }
        return resultado
    }

    Insert = async (nombre) => {
        let resultado = null
        console.log("Estoy en : UnidadesService.Insert")
        try {
            let pool = await sql.connect(config)
            let result = await pool.request()
                .input('pNombre', sql.VarChar, nombre ?? '')
                .query("INSERT INTO Unidades(Nombre) VALUES(@pNombre)")
            resultado = result.rowsAffected;

        } catch (error) {
            EscribirError(" UnidadesService.Insert: " + error)
        }
        return resultado
    }


    Update = async (id, nombre) => {
        let resultado = null
        console.log("Estoy en : UnidadesService.Update")
        try {
            let pool = await sql.connect(config)
            let result = await pool.request()
                .input('pId', sql.Int, id)
                .input('pNombre', sql.VarChar, nombre)
                .query("UPDATE Unidades set Nombre = @pNombre WHERE Id = @pId")
            resultado = result.rowsAffected;

        } catch (error) {
            EscribirError(" UnidadesService.Update: " + error)
        }
        return resultado
    }


}