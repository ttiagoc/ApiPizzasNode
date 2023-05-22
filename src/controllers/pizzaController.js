import PizzaService from '../../src/services/pizzas-services.js';
import express, {Router} from 'express';

const router = Router()

const svc = new PizzaService();

router.get('/', async function (req, res) {
    try {

        let parametros = req.query
        let result = await svc.getAll(parametros.top, parametros.orderField, parametros.sortOrder)
        res.send(result)
    } catch (error) {
        res.send("error")
    }

})

router.get('/pizzaId/:id', async function (req, res) {
    try {

        let parametros = req.params

         let result = await svc.getById(parametros.id)

         res.send(result)

    } catch (error) {

        EscribirError(error)
    }

})

router.post('/insert', async function (req, res) {
    try {

        // let parametros = req.query
        // console.log(parametros)
        // let result = await svc.Insert(parametros.nombre, parametros.glutenFree, parametros.importe, parametros.descripcion)

  
        let Objparametros = req.body
       

        let result = await svc.Insert(Objparametros.nombre, Objparametros.glutenFree, Objparametros.importe, Objparametros.descripcion)

        res.send(result)



    } catch (error) {
        EscribirError(error)
    }

})

router.put('/update', async function (req, res) {
    try {

        // let parametros = req.query
        // let result = await svc.Update(parametros.id, parametros.nombre, parametros.glutenFree, parametros.importe, parametros.descripcion)

        let Objparametros = req.body
       
        let result = await svc.Update(Objparametros.id,Objparametros.nombre, Objparametros.glutenFree, Objparametros.importe, Objparametros.descripcion)

        res.send(result)

    } catch (error) {
        EscribirError(error)
    }

})


router.delete('/delete/:id', async function (req, res) {
    try {

        let parametros = req.params

        let result = await svc.deleteById(parametros.id);

        res.send(result)
    } catch (error) {
        EscribirError(error)
    }

})


export default router;

