
import sql, { columns } from 'mssql';


class PizzaService {


    getAll = async () => {
        let resultado = null
        console.log("Estoy en : PizzaService.GetAll")
        try {
            let pool = await sql.connect(config)
            let result = await pool.request().query("SELECT * FROM Pizzas")
            resultado = result.recordsets[0] 
            
        } catch (error) {
            console.log(error)
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




}