import config from './dbconfig.js';
import sql from 'mssql';
import PizzaService from './src/services/pizzas-services.js';
import express, {Router} from 'express';
import cors from 'cors'
import pizzaRouter from "./src/controllers/pizzaController.js";


const app = express()
const port = 3000

//Middlewares

app.use(cors())
app.use(express.json());
app.use(express.static('public'));

app.use("/api/pizzas",pizzaRouter);

//Endpoints

app.listen(port, () => {
    console.log('Example app listening on port ' + port)
})