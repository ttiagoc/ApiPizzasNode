
import sql from 'mssql';
import config from '../../dbconfig.js';
import EscribirError from '../modules/log-helper.js';

export default class IngredientexPizzaService {


    getAll = async (top, orderField, sortOrder) => {
        let resultado = null

        console.log("Estoy en : IngredientexPizzaService.GetAll")

        try {
            let pool = await sql.connect(config)
            let result = await pool.request().
                query("SELECT " + (top == null ? '' : "TOP " + top) + " * FROM IngredientesXPizzas " + (orderField == null ? '' : "ORDER BY " + orderField) + " " + (sortOrder == null ? '' : sortOrder))

            resultado = result.recordsets[0]

        } catch (error) {

            EscribirError(" IngredientexPizzaService.GetAll: " + error)
        }
        return resultado;
    }

    getById = async (id) => {
        let resultado = null

        console.log("Estoy en : IngredientexPizzaService.GetByid")
        try {
            let pool = await sql.connect(config)
            let result = await pool.request().input('pid', sql.Int, id)
                .query("SELECT Ingredientes.Nombre, IngredientesXPizzas.Cantidad, Unidades.Nombre  FROM IngredientesXPizzas inner join Ingredientes on IngredientesxPizzas.IdIngrediente = Ingredientes.Id inner join Unidades on IngredientesXPizzas.IdUnidad = Unidades.Id WHERE IngredientesXPizzas.IdPizza = @pId")

            resultado = result.recordsets[0][0]


        } catch (error) {

            EscribirError(" IngredientexPizzaService.getById: " + error)
        }
        return resultado
    }

    deleteById = async (id) => {
        let resultado = null
        console.log("Estoy en : IngredientexPizzaService.deleteById")
        try {
            let pool = await sql.connect(config)
            let result = await pool.request().input('pId', sql.Int, id)
                .query("DELETE FROM IngredientesXPizzas WHERE id = @pId")

            resultado = result.rowsAffected;


        } catch (error) {
            EscribirError(" IngredientexPizzaService.deleteById: " + error)
        }
        return resultado
    }

    Insert = async (idPizza, idIngrediente, cantidad, idUnidad) => {
        let resultado = null
        console.log("Estoy en : IngredientexPizzaService.Insert")
        try {
            let pool = await sql.connect(config)
            let result = await pool.request()
                .input('pIdPizza', sql.Int, idPizza ?? '')
                .input('pIdIngrediente', sql.Int, idIngrediente)
                .input('pCantidad', sql.Int, cantidad)
                .input('pIdUnidad', sql.Int, idUnidad)
                .query("INSERT INTO IngredientesXPizzas(IdPizza,IdIngrediente,Cantidad,IdUnidad) VALUES(@pIdPizza, @pIdIngrediente, @pCantidad, @pIdUnidad)")

            resultado = result.rowsAffected;

        } catch (error) {
            EscribirError(" IngredientexPizzaService.Insert: " + error)
        }
        return resultado
    }


    Update = async (id, idPizza, idIngrediente, cantidad, idUnidad) => {
        let resultado = null
        console.log("Estoy en : IngredientexPizzaService.Update")
        try {
            let pool = await sql.connect(config)
            let result = await pool.request()
                .input('pId', sql.Int, id)
                .input('pIdPizza', sql.Int, idPizza)
                .input('pIdIngrediente', sql.Int, idIngrediente)
                .input('pCantidad', sql.Int, cantidad)
                .input('pIdUnidad', sql.Int, idUnidad)
                .query("UPDATE IngredientesXPizzas set IdPizza = @pIdPizza,IdIngrediente = @pIdIngrediente, Cantidad = @pCantidad, IdUnidad = @pIdUnidad WHERE id = @pId")
            resultado = result.rowsAffected;

        } catch (error) {
            EscribirError(" IngredientexPizzaService.Update: " + error)
        }
        return resultado
    }


}