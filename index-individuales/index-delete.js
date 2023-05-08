
import PizzaService from '../src/services/pizzas-services.js';

let svc = new PizzaService();
let resultDelete = await svc.deleteById(1);
console.log(resultDelete)
