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
      <td>
        <button type="button" class="boton-eliminar" data-id="${auto.id}">Eliminar</button>
      </td>
    `;
    listaAutos.appendChild(fila);
  });
}

// Registra un automóvil nuevo y actualiza la lista.
function insertarAuto(evento) {
  evento.preventDefault();

  const auto = {
    id: Date.now(),
    marca: document.querySelector("#marca").value,
    modelo: document.querySelector("#modelo").value,
    anio: document.querySelector("#anio").value,
    color: document.querySelector("#color").value
  };
  const autos = obtenerAutos();

  autos.push(auto);
  localStorage.setItem(CLAVE_STORAGE, JSON.stringify(autos));
  formulario.reset();
  listarAutos();
}

formulario.addEventListener("submit", insertarAuto);

// Elimina el automóvil seleccionado del localStorage.
function eliminarAuto(id) {
  const autos = obtenerAutos().filter((auto) => auto.id !== id);
  localStorage.setItem(CLAVE_STORAGE, JSON.stringify(autos));
  listarAutos();
}

listaAutos.addEventListener("click", (evento) => {
  if (evento.target.classList.contains("boton-eliminar")) {
    eliminarAuto(Number(evento.target.dataset.id));
  }
});

listarAutos();
