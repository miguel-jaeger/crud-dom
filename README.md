# CRUD de automóviles con HTML, CSS y JavaScript

Ejemplo sencillo de un CRUD (crear, leer, actualizar y eliminar) de automóviles.
El proyecto utiliza únicamente HTML, CSS y JavaScript, sin librerías ni
frameworks. Los datos se guardan en el `localStorage` del navegador, por lo que
no necesita una base de datos.

## ¿Cómo ejecutarlo?

Abre el archivo `index.html` directamente en un navegador. No es necesario
instalar dependencias ni iniciar un servidor.

## Funcionalidades

- **Listar:** al abrir la página, `listarAutos()` obtiene los datos del
  `localStorage` y crea las filas de la tabla usando elementos del DOM.
- **Insertar:** el formulario ejecuta `insertarAuto()`, crea un objeto con los
  datos ingresados, lo agrega al arreglo y guarda el arreglo en el
  `localStorage`.
- **Eliminar:** cada fila tiene un botón que ejecuta `eliminarAuto()` usando el
  `id` del automóvil para quitarlo del arreglo.
- **Actualizar:** el botón Editar ejecuta `prepararEdicion()` y carga los datos
  en el formulario. Al guardar, `actualizarAuto()` reemplaza los datos y
  actualiza el `localStorage`.
- **Cancelar edición:** el botón Cancelar limpia el formulario y vuelve al
  modo de registro.

## Archivos principales

- `index.html`: formulario y tabla de automóviles.
- `styles.css`: estilos básicos utilizando CSS Grid para el formulario y
  Flexbox para los botones.
- `script.js`: funciones del CRUD, manipulación del DOM y uso de
  `localStorage`.

## Ideas para practicar

Puedes agregar validaciones, nuevos campos como precio o placa, un filtro de
búsqueda o una confirmación antes de eliminar. Es recomendable revisar cada
commit para observar cómo se incorporó cada funcionalidad paso a paso.
