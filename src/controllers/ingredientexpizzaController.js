import {Router} from 'express';
import EscribirError from '../modules/log-helper.js';
import IngredientexPizzaService from '../services/ingredientesxpizzas-service.js';

const router = Router()

const svc = new IngredientexPizzaService();

router.get('/', async function (req, res) {
    try {
        let parametros = req.query
        let result = await svc.getAll(parametros.top, parametros.orderField, parametros.sortOrder)
        res.send(result)
    } catch (error) {
        res.send("error")
    }

})

router.get('/ingredientexpizzaId/:id', async function (req, res) {
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
  
        let Objparametros = req.body    
        let result = await svc.Insert(Objparametros.nombre, Objparametros.idIngrediente, Objparametros.cantidad, Objparametros.idUnidad)

        res.send(result)

    } catch (error) {
        EscribirError(error)
    }

})

router.put('/update', async function (req, res) {
    try {

        let Objparametros = req.body
       
        let result = await svc.Update(Objparametros.id,Objparametros.idPizza, Objparametros.idIngrediente, Objparametros.cantidad, Objparametros.idUnidad)

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

