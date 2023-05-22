


function CargarPorId() {

  let inputId = document.querySelector("#idPizza");
  let url = "http://localhost:3000/api/pizzas/pizzaId/" + inputId.value
  let contenedor = document.querySelector("#contenedor2");

  
  
  axios
    .get(url)
    .then((result) => {

      contenedor.innerHTML = ""
      if(result.data.Id != undefined){
      contenedor.innerHTML += `<ul>
        <li>${result.data.Id}</li>
        <li>${result.data.Nombre}</li>
        <li>${result.data.Importe}</li>
        <li>${result.data.Descripcion}</li>
        <li>${result.data.LibreGluten}</li>
        </ul> `}
        else{
          contenedor.innerHTML = "<h1 class='text-center'>NO HAY PIZZA CON ESE ID</h1>"

        }
    })
    .catch((error) => {
      console.log(error);
    });
}

function CargarAll() {
  axios
    .get("http://localhost:3000/api/pizzas")
    .then((result) => {
      console.log(result.data);
      let arr = result.data

      document.querySelector("#ClearButton").disabled = false;

      let contenedor = document.querySelector("#contenedor");
      contenedor.innerHTML = ""

      contenedor.innerHTML += `
      <table class="table table-bordered">
      <thead>
        <tr>
        <th scope="col">Id</th>
          <th scope="col">Nombre</th>
          <th scope="col">Importe</th>
          <th scope="col">Descripcion</th>
          <th scope="col">LibreGluten</th>
        </tr>
      </thead>
      <tbody>
        ${arr.map(item   => `
          <tr>
          
          <td>${item.Id}</td>
          <td>${item.Nombre}</td>
          <td>${item.Importe}</td>
          <td>${item.Descripcion}</td>
          <td>${item.LibreGluten}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
    `;
    



     
    })

    .catch((error) => {
      console.log(error);
    });
}

function Clear_CargarAll(){
  let contenedor = document.querySelector("#contenedor");
  
  document.querySelector("#ClearButton").disabled = true;
  contenedor.innerHTML = ""
}


function InsertPizza() {

  let nombre = document.getElementById("nombre").value
  let gluten = document.getElementById("gluten").value
  let importe = document.getElementById("importe").value
  let descripcion = document.getElementById("descripcion").value

  const params = {

    "nombre": nombre,
    "libreGluten": gluten,
    "importe": importe,
    "descripcion": descripcion

  };



  const options = {
    method: 'POST',
    url: 'http://localhost:3000/api/pizzas/insert',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com',
    },
    data: params
  };

  axios
    .request(options)
    .then((result) => {
      console.log(params)
      console.log(result.data)

    })
    .catch((error) => {
      console.log(error);
    });

}

function UpdatePizza() {

  let id = document.getElementById("idUpd").value
  let nombre = document.getElementById("nombreUpd").value
  let gluten = document.getElementById("glutenUpd").value
  let importe = document.getElementById("importeUpd").value
  let descripcion = document.getElementById("descripcionUpd").value

  let params = {

    "id": id,
    "nombre": nombre,
    "libreGluten": gluten,
    "importe": importe,
    "descripcion": descripcion

  };


  const options = {
    method: 'PUT',
    url: 'http://localhost:3000/api/pizzas/update',
    headers: {
      'content-type': 'application/json',
     
      'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com',
    },
    data: params
  };

  axios
    .request(options)
    .then((result) => {
      console.log(params)
      console.log(result.data)

    })
    .catch((error) => {
      console.log(error);
    });

}


function DeletePizza() {

  let inputDelete = document.querySelector("#idPizzaDelete");
  let url = "http://localhost:3000/api/pizzas/delete/" + inputDelete.value
  let contenedor3 = document.querySelector("#contenedor3");

  
  axios
    .delete(url)
    .then((result) => {

      if (result.data == 1) {
        contenedor3.innerHTML = "<h1 class='text-center'>BORRADO CON ÉXITO</h1>"
      }else{
        contenedor3.innerHTML = "<h1 class='text-center'>NO EXISTE PIZZA CON ESE ID</h1>"
      }
      console.log(result.data)
    })
    .catch((error) => {
      console.log(error);
    });
}
