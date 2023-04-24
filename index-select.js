import PizzaService from './misModulos/src/services/pizzas-services.js';


let svc = new PizzaService();

 let resultGetAll = await svc.getAll(null, null , "desc");
 console.log(resultGetAll)


//  let resultById = await svc.getById(2);
//  console.log(resultById)
