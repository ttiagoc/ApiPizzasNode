

import config from './dbconfig.js';
import sql from 'mssql';
import PizzaService from './src/services/pizzas-services.js';
import express from 'express';


const app = express()
const port = 3000

let svc = new PizzaService();

app.use(express.json());

app.get('/', async function (req, res) {
    try {

        let parametros = req.query
        let result = await svc.getAll(parametros.top, parametros.orderField, parametros.sortOrder)
        res.send(result)
    } catch (error) {
        res.send("error")
    }

})

app.get('/pizzaId/:id', async function (req, res) {
    try {

        let parametros = req.params


        let result = await svc.getById(parametros.id)

        res.send(result)
    } catch (error) {

        EscribirError(error)
    }

})

app.post('/insert', async function (req, res) {
    try {

        // let parametros = req.query
        // console.log(parametros)
        // let result = await svc.Insert(parametros.nombre, parametros.glutenFree, parametros.importe, parametros.descripcion)

        // res.send(result)


        let Objparametros = req.body
        console.log(Objparametros)

        let result = await svc.Insert(Objparametros.nombre, Objparametros.glutenFree, Objparametros.importe, Objparametros.descripcion)

        res.send(result)



    } catch (error) {
        EscribirError(error)
    }

})

app.put('/update', async function (req, res) {
    try {

        let parametros = req.query

        let result = await svc.Update(parametros.id, parametros.nombre, parametros.glutenFree, parametros.importe, parametros.descripcion)

        res.send(result)
    } catch (error) {
        EscribirError(error)
    }

})


app.delete('/delete/:id', async function (req, res) {
    try {

        let parametros = req.params

        let result = await svc.deleteById(parametros.id);

        res.send(result)
    } catch (error) {
        EscribirError(error)
    }

})

    app.post('/ejemplo-req-json', (req, res) => {



    let objRecibido = req.body;
    console.log(objRecibido)
     res.send(objRecibido);


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


app.listen(port, () => {
    console.log('Example app listening on port ' + port)
})