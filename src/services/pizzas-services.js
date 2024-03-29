
import sql from 'mssql';
import config from '../../dbconfig.js';
import EscribirError from '../modules/log-helper.js';
import IngredientexPizzaService from './ingredientesxpizzas-service.js';

export default class PizzaService {


    getAll = async (incluirIngredientes, top, orderField, sortOrder) => {
        let resultado = null

        console.log("Estoy en : PizzaService.GetAll")

        try {
            let pool = await sql.connect(config)
            let result = await pool.request().
                query("SELECT " + (top == null ? '' : "TOP " + top) + " * FROM Pizzas " + (orderField == null ? '' : "ORDER BY " + orderField) + " " + (sortOrder == null ? '' : sortOrder))

            resultado = result.recordsets[0]

            let cantPizzas = result.rowsAffected[0];
            
            if (incluirIngredientes == true) {

                let svc3 = new IngredientexPizzaService();

                for (let i = 0; i < cantPizzas; i++) {

                    resultado[i].ingredientes = await svc3.getById(resultado[i].Id)

                }
            }


        } catch (error) {

            EscribirError(" PizzaService.GetAll: " + error)
        }
        return resultado;
    }

    getById = async (id, incluir) => {
        let resultado = null

        console.log("Estoy en : PizzaService.GetByid")
        try {
            let pool = await sql.connect(config)
            let result = await pool.request().input('pid', sql.Int, id).query("SELECT * FROM Pizzas WHERE id = @pId")

            resultado = result.recordsets[0][0]

            if (resultado != null && incluir == true) {
                let svc2 = new IngredientexPizzaService();
                resultado.ingredientes = await svc2.getById(id, incluir)

            }


        } catch (error) {

            EscribirError(" PizzaService.getById: " + error)
        }
        return resultado
    }

    deleteById = async (id) => {
        let resultado = null
        console.log("Estoy en : PizzaService.deleteById")
        try {
            let pool = await sql.connect(config)
            let result = await pool.request().input('pid', sql.Int, id).query("DELETE FROM Pizzas WHERE id = @pId")

            resultado = result.rowsAffected;


        } catch (error) {
            EscribirError(" PizzaService.deleteById: " + error)
        }
        return resultado
    }

    Insert = async (nombre, libreGluten, importe, descripcion) => {
        let resultado = null
        console.log("Estoy en : PizzaService.Insert")
        try {
            let pool = await sql.connect(config)
            let result = await pool.request()
                .input('pNombre', sql.VarChar, nombre ?? '')
                .input('pLibreGluten', sql.Bit, libreGluten ?? '')
                .input('pImporte', sql.Float, importe ?? '')
                .input('pDescripción', sql.VarChar, descripcion ?? '')
                .query("INSERT INTO Pizzas(Nombre,LibreGluten,Importe,Descripcion) VALUES(@pNombre, @pLibreGluten, @pImporte, @pDescripción)")
            resultado = result.rowsAffected;

        } catch (error) {
            EscribirError(" PizzaService.Insert: " + error)
        }
        return resultado
    }


    Update = async (id, nombre, libreGluten, importe, descripcion) => {
        let resultado = null
        console.log("Estoy en : PizzaService.Update")
        try {
            let pool = await sql.connect(config)
            let result = await pool.request()
                .input('pId', sql.Int, id)
                .input('pNombre', sql.VarChar, nombre)
                .input('pLibreGluten', sql.Bit, libreGluten)
                .input('pImporte', sql.Float, importe)
                .input('pDescripcion', sql.VarChar, descripcion)
                .query("UPDATE Pizzas set Nombre = @pNombre,LibreGluten = @pLibreGluten,Importe = @pImporte,Descripcion = @pDescripcion WHERE id = @pId")
            resultado = result.rowsAffected;

        } catch (error) {
            EscribirError(" PizzaService.Update: " + error)
        }
        return resultado
    }


}