import { Router } from 'express';
import EscribirError from '../modules/log-helper.js';
import UsuariosService from '../services/usuarios-service.js';

const router = Router()

const svc = new UsuariosService();

router.get('/', async function (req, res) {
    try {
        let result = await svc.getAll()
        res.send(result)
    } catch (error) {
        res.send("error")
    }

})

router.get('/usuarioId/:id', async function (req, res) {
    try {

        let parametros = req.params

        let result = await svc.getById(parametros.id)

        if (result != null) {
            res.status(200).send(result);
        } else {
            res.status(404).send('<p>No se encontro el usuario</p>');
        }


    } catch (error) {

        EscribirError(error)
    }

})

    router.post('/login', async (req, res) => {
        try {
            let usuario = req.body;
            let usuarioActualizado = await svc.login(usuario);
        
            if (usuarioActualizado != null) {
                res.status(200).send(usuarioActualizado);

            } else {
                
            res.status(404).send('<p>No fue posible realizar el login</p>');
        }
    } catch (e) {
        console.log(e);
    }
})


export default router;

