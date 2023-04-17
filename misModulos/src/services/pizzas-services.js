
import sql from 'mssql';
import config from '../../../dbconfig.js';
import fs from 'fs'


export default class PizzaService {


    getAll = async () => {
        let resultado = null
        console.log("Estoy en : PizzaService.GetAll")
        try {
            let pool = await sql.connect(config)
            let result = await pool.request().query("SELECT * FROM Pizzas")
            resultado = result.recordsets[0] 
            
        } catch (error) {
            console.log(error)
            // const content = error;

            // fs.writeFile('C:\Users\46878457\Desktop\Accediendo-a-MSSQL-y-usando-ENV-\misModulos\src\modules', content, err => {
            // if (err) {
            //      console.error(err);
            //      }
            // // file written successfully
            // });

        // 
        }
        return resultado
    }

    getById = async (id) => {
        let resultado = null
        console.log("Estoy en : PizzaService.GetByid")
        try {
            let pool = await sql.connect(config)
            let result = await pool.request().input('pid',sql.Int,id).query("SELECT * FROM Pizzas WHERE id = @pId")
            resultado = result.recordsets[0][0] 
            
        } catch (error) {
            console.log(error)
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
            console.log(error)
        }
        return resultado
    }

    Insert = async (nombre,libreGluten,importe,descripcion) => {
        let resultado = null
        console.log("Estoy en : PizzaService.Insert")
        try {
            let pool = await sql.connect(config)
            let result = await pool.request()
            .input('pNombre',sql.VarChar,nombre)
            .input('pLibreGluten',sql.Bit,libreGluten)
            .input('pImporte',sql.Float,importe)
            .input('pDescripción',sql.VarChar,descripcion)
            .query("INSERT INTO Pizzas(Nombre,LibreGluten,Importe,Descripcion) VALUES(@pNombre, @pLibreGluten, @pImporte, @pDescripción)")
            resultado = result.rowsAffected;
            
        } catch (error) {
            console.log(error)
        }
        return resultado
    }


    Update = async (id,nombre,libreGluten,importe,descripcion) => {
        let resultado = null
        console.log("Estoy en : PizzaService.Insert")
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
            console.log(error)
        }
        return resultado
    }


}