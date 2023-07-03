
import UsuariosService from "../services/usuarios-service.js";

export default class AutenticationMiddleware {

    requireAutentication = async (req, res, next) => {

        console.log("Estoy en El middleware de autenticación")

        if (!(req.path.toLowerCase().startsWith('/api/pizzas'))) {
            return next();
        } else {
            if ((req.headers.token != undefined) && (req.headers.token != null)) {

                let token = req.headers.token;
                let usuariosService = new UsuariosService();
                let usuario = await usuariosService.getByToken(token);

                if (usuario != null && usuario != undefined) {
                    if (usuario.TokenExpirationDate > new Date()) {
                        next();
                    } else {
                        res.status(401).send('Unauthorized, expiró el token');
                    }
                } else {
                    res.status(401).send('Unauthorized, no se encontró ningún usuario con ese token');
                }
            } else {
                res.status(401).send('Unauthorized, es necesario un token');
            }
        }
    }
}
