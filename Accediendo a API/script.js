


function CargarDatos() {
    axios
      .get("http://localhost:3000/pizzaId/5")
      .then((result) => {
        console.log(result.data);
        let contenedor = document.querySelector("#contenedor");
        contenedor.innerHTML += result.data.Id
        contenedor.innerHTML += result.data.Nombre
        contenedor.innerHTML += result.data.Descripcion
        contenedor.innerHTML += result.data.LibreGluten
      })
      .catch((error) => {
        console.log(error);
      });
  }
  