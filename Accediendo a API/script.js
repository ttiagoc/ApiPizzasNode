


function CargarDatos() {

  let inputId = document.querySelector("#idPizza");
  let url = "http://localhost:3000/pizzaId/" + inputId.value
  let contenedor = document.querySelector("#contenedor");

  axios
    .get(url)
    .then((result) => {

      contenedor.innerHTML = ""
      contenedor.innerHTML += `<ul>
        <li>${result.data.Id}</li>
        <li>${result.data.Nombre}</li>
        <li>${result.data.Importe}</li>
        <li>${result.data.Descripcion}</li>
        <li>${result.data.LibreGluten}</li>
        </ul>   `
    })
    .catch((error) => {
      console.log(error);
    });
}

function CargarAll() {
  axios
    .get("http://localhost:3000/")
    .then((result) => {
      console.log(result.data);
      let arr = result.data

      let contenedor = document.querySelector("#contenedor");
      contenedor.innerHTML = ""
      arr.map((item, index) => {

        contenedor.innerHTML += `<ul>
        <li>${item.Id}</li>
        <li>${item.Nombre}</li>
        <li>${item.Importe}</li>
        <li>${item.Descripcion}</li>
        <li>${item.LibreGluten}</li>
        </ul>   `
      })

    })

    .catch((error) => {
      console.log(error);
    });
}

function InsertPizza() {

  let nombre = document.getElementById("nombre").value
  let gluten = document.getElementById("gluten").value
  let importe = document.getElementById("importe").value
  let descripcion = document.getElementById("descripcion").value

  const params = JSON.stringify({

    "nombre": nombre,
    "libreGluten": gluten,
    "importe": importe,
    "descripcion": descripcion

  });


  const options = {
    method: 'POST',
    url: 'http://localhost:3000/insert',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': 'your-rapidapi-key',
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

  let params = JSON.stringify({

    "id": id,
    "nombre": nombre,
    "libreGluten": gluten,
    "importe": importe,
    "descripcion": descripcion

  });


  const options = {
    method: 'PUT',
    url: 'http://localhost:3000/update',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': 'your-rapidapi-key',
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
  let url = "http://localhost:3000/delete/" + inputDelete.value
  let contenedor = document.querySelector("#contenedor");

  axios
    .delete(url)
    .then((result) => {

      console.log(result.data)
    })
    .catch((error) => {
      console.log(error);
    });
}
