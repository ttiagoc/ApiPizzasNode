import express, { Router } from 'express';
import cors from 'cors'
import pizzaRouter from "./src/controllers/pizzaController.js";
import ingredientesxpizzaRouter from "./src/controllers/ingredientexpizzaController.js";
import 'dotenv/config'
import ingredientesRouter from "./src/controllers/ingredientesController.js"
import unidadesRouter from "./src/controllers/unidadesController.js"
import usuariosRouter from "./src/controllers/usuariosController.js"
import AutenticationMiddleware from "./src/middlewares/autenticationMiddleware.js";

const app = express()
const port = process.env.HTTP_PORT;

//Middlewares

app.use(cors())
app.use(express.json());
app.use(express.static('public'));

/*
const timepoTranscurrido = function (req, res, next) {
    //console.log('Middleware (Antes): ' + new Date());
    let hora1 = new Date();
    next();
    //console.log('Middleware (Despues): ' + new Date());
    let hora2 = new Date();
    let horaTranscurrida = String(hora2 - hora1);
    console.log("Esta tarea duró: " + horaTranscurrida + "ms");
}


app.use(timepoTranscurrido);


const checkApiKey = function (req, res, next) {

    if (req.headers.apikey == undefined) {
        res.status(401).send('Es necesaria una ApiKey');
    } else {

        if (req.headers.apikey == '123456789') {
            next()
        } else {
            res.status(401).send('Unauthorized, es necesario una ApiKey Valida');
        }
    }


}

app.use(checkApiKey);


const addHeaders = function (req, res, next) {

    res.set("CreatedBy", "Tiago Coladonato y Tomas Marcus Forni")
    next()

}


app.use(addHeaders);

*/

let autenticationMiddleware = new AutenticationMiddleware();
app.use(autenticationMiddleware.requireAutentication)
app.use("/api/pizzas", pizzaRouter);
app.use("/api/ingredientesXPizzas", ingredientesxpizzaRouter);
app.use("/api/ingredientes", ingredientesRouter);
app.use("/api/unidades", unidadesRouter);
app.use("/api/usuarios", usuariosRouter);

//Endpoints

app.listen(port, () => {
    console.log('Example app listening on port ' + port)
})