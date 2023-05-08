import PizzaService from '../src/services/pizzas-services.js';


let svc = new PizzaService();

 let resultGetAll = await svc.getAll(2, "Nombre" , null);
 console.log(resultGetAll)


//  let resultById = await svc.getById(2);
//  console.log(resultById)
