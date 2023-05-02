

import config from './dbconfig.js';
import sql from 'mssql';
import PizzaService from './misModulos/src/services/pizzas-services.js';
import express from 'express';


const app = express()
const port = 3000



app.get('/', function(req,res){
    try {
        let svc = new PizzaService();
        let result = svc.getAll()
        res.send(result)
    } catch (error) {
        res.send("error")
    }
   
})



//  //let resultGetAll = await svc.getAll();
//  //console.log(resultGetAll)


//  let resultById = await svc.getById(2);
//  console.log(resultById)


// // let resultDelete = await svc.deleteById(1);
// // console.log(resultDelete)

//  let resultInsert = await svc.Insert("Tiago",0,2100,"Muy bddduena")
//  console.log(resultInsert)

// // let resultUpdate = await svc.Update(2,"Tiago",1,200,"buena")
// // console.log(resultUpdate)


 app.listen(port,() => {
     console.log('Example app listening on port ' + port)
 })