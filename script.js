const CLAVE_STORAGE = "autos";
const formulario = document.querySelector("#formulario-auto");
const listaAutos = document.querySelector("#lista-autos");
const mensajeVacio = document.querySelector("#mensaje-vacio");

// Obtiene los automóviles guardados en el localStorage.
function obtenerAutos() {
  return JSON.parse(localStorage.getItem(CLAVE_STORAGE)) || [];
}

// Muestra los automóviles en las filas de la tabla.
function listarAutos() {
  const autos = obtenerAutos();
  listaAutos.innerHTML = "";
  mensajeVacio.classList.toggle("oculto", autos.length > 0);

  autos.forEach((auto) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${auto.marca}</td>
      <td>${auto.modelo}</td>
      <td>${auto.anio}</td>
      <td>${auto.color}</td>
      <td></td>
    `;
    listaAutos.appendChild(fila);
  });
}

listarAutos();
