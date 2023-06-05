import {Router} from 'express';
import EscribirError from '../modules/log-helper.js';
import IngredientesService from '../services/ingredientes-service.js';

const router = Router()

const svc = new IngredientesService();

router.get('/', async function (req, res) {
    try {
        let parametros = req.query
        let result = await svc.getAll(parametros.top, parametros.orderField, parametros.sortOrder)
        res.send(result)
    } catch (error) {
        res.send("error")
    }

})

router.get('/ingredienteId/:id', async function (req, res) {
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
        let result = await svc.Insert(Objparametros.nombre)

        res.send(result)

    } catch (error) {
        EscribirError(error)
    }

})

router.put('/update', async function (req, res) {
    try {

        let Objparametros = req.body
       
        let result = await svc.Update(Objparametros.id,Objparametros.nombre)

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

