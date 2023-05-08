import PizzaService from '../src/services/pizzas-services.js';

let svc = new PizzaService();

 let resultUpdate = await svc.Update(2,"Tiago",1,200,"buena")
 console.log(resultUpdate)
