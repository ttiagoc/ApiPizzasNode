import PizzaService from '../../src/services/pizzas-services.js';
import {Router} from 'express';
import EscribirError from '../modules/log-helper.js';

const router = Router()

const svc = new PizzaService();

router.get('/', async function (req, res) {
    try {
        let parametros = req.query

        let incluirIngredientes2 = (typeof req.query.incluirIngredientes !== 'undefined' && req.query.incluirIngredientes.toLowerCase() === 'true')

        let result = await svc.getAll(incluirIngredientes2,parametros.top, parametros.orderField, parametros.sortOrder)
        res.send(result)
    } catch (error) {
        res.send("error")
    }

})

router.get('/pizzaId/:id', async function (req, res) {
    try {

        let parametros = req.params.id

        let incluirIngredientes = (typeof req.query.incluirIngredientes !== 'undefined' && req.query.incluirIngredientes.toLowerCase() === 'true')

         let result = await svc.getById(parametros,incluirIngredientes)

         res.send(result)

    } catch (error) {

        EscribirError(error)
    }

})

router.post('/insert', async function (req, res) {
    try {

        let Objparametros = req.body
        let result = await svc.Insert(Objparametros.nombre, Objparametros.glutenFree, Objparametros.importe, Objparametros.descripcion)
        res.send(result)

    } catch (error) {
        EscribirError(error)
    }

})

router.put('/update', async function (req, res) {
    try {

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

