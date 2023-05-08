
import PizzaService from '../src/services/pizzas-services.js';
import Pizza from '../src/models/Pizza.js'

let svc = new PizzaService();

let pizza = new Pizza("Pizza de mono", 1, 300, "gg")


let resultInsert = await svc.Insert("Tiago", 0, 2100, "Muy bddduena")
console.log(resultInsert)