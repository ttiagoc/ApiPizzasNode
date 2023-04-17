

import config from './dbconfig.js';
import sql from 'mssql';
import PizzaService from './misModulos/src/services/pizzas-services.js';
// let pool  = await sql.connect(config)
// let result = await pool.request().query("SELECT TOP 2 * FROM Pizzas")

let svc = new PizzaService();

 //let resultGetAll = await svc.getAll();
 //console.log(resultGetAll)


//let resultById = await svc.getById(1);
//console.log(resultById)


// let resultDelete = await svc.deleteById(1);
// console.log(resultDelete)

// let resultInsert = await svc.Insert("Tiago",1,200,"Muy buena")
// console.log(resultInsert)

let resultUpdate = await svc.Update(2,"Tiago",1,200,"buena")
console.log(resultUpdate)


