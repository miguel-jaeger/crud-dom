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
        <button type="button" class="boton-editar" data-id="${auto.id}">Editar</button>
        <button type="button" class="boton-eliminar" data-id="${auto.id}">Eliminar</button>
      </td>
    `;
    listaAutos.appendChild(fila);
  });
}

// Registra un automóvil nuevo y actualiza la lista.
function insertarAuto(evento) {
  evento.preventDefault();

  if (document.querySelector("#auto-id").value) {
    actualizarAuto();
    return;
  }

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

// Carga los datos del automóvil seleccionado en el formulario.
function prepararEdicion(id) {
  const auto = obtenerAutos().find((elemento) => elemento.id === id);

  document.querySelector("#auto-id").value = auto.id;
  document.querySelector("#marca").value = auto.marca;
  document.querySelector("#modelo").value = auto.modelo;
  document.querySelector("#anio").value = auto.anio;
  document.querySelector("#color").value = auto.color;
  document.querySelector("#boton-guardar").textContent = "Actualizar auto";
  document.querySelector("#boton-cancelar").classList.remove("oculto");
}

// Actualiza el automóvil editado y guarda los cambios.
function actualizarAuto() {
  const id = Number(document.querySelector("#auto-id").value);
  const autos = obtenerAutos();
  const posicion = autos.findIndex((auto) => auto.id === id);

  autos[posicion].marca = document.querySelector("#marca").value;
  autos[posicion].modelo = document.querySelector("#modelo").value;
  autos[posicion].anio = document.querySelector("#anio").value;
  autos[posicion].color = document.querySelector("#color").value;
  localStorage.setItem(CLAVE_STORAGE, JSON.stringify(autos));
  cancelarEdicion();
  listarAutos();
}

// Limpia el formulario y termina el modo de edición.
function cancelarEdicion() {
  formulario.reset();
  document.querySelector("#auto-id").value = "";
  document.querySelector("#boton-guardar").textContent = "Guardar auto";
  document.querySelector("#boton-cancelar").classList.add("oculto");
}

document.querySelector("#boton-cancelar").addEventListener("click", cancelarEdicion);

// Elimina el automóvil seleccionado del localStorage.
function eliminarAuto(id) {
  const autos = obtenerAutos().filter((auto) => auto.id !== id);
  localStorage.setItem(CLAVE_STORAGE, JSON.stringify(autos));
  listarAutos();
}

listaAutos.addEventListener("click", (evento) => {
  if (evento.target.classList.contains("boton-editar")) {
    prepararEdicion(Number(evento.target.dataset.id));
  }

  if (evento.target.classList.contains("boton-eliminar")) {
    eliminarAuto(Number(evento.target.dataset.id));
  }
});

listarAutos();
