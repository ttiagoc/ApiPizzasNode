import express, {Router} from 'express';
import cors from 'cors'
import pizzaRouter from "./src/controllers/pizzaController.js";
import 'dotenv/config'

const app = express()
const port = process.env.HTTP_PORT;

//Middlewares

app.use(cors())
app.use(express.json());
app.use(express.static('public'));

app.use("/api/pizzas",pizzaRouter);

//Endpoints

app.listen(port, () => {
    console.log('Example app listening on port ' + port)
})