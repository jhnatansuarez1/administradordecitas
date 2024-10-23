// Seleccionar elementos del DOM
const formulario = document.querySelector('#formulario');
const contenedorCitas = document.querySelector('.grid .card:nth-child(2)');

// Array para almacenar las citas
let citas = [];

// Event listener para manejar el envío del formulario
formulario.addEventListener('submit', agregarCita);

// Función para agregar una cita
function agregarCita(e) {
  e.preventDefault();

  // Obtener los valores del formulario
  const mascota = document.querySelector('#mascota').value;
  const propietario = document.querySelector('#propietario').value;
  const fecha = document.querySelector('#fecha').value;
  const hora = document.querySelector('#hora').value;
  const sintomas = document.querySelector('#sintomas').value;

  // Validar que no haya campos vacíos
  if (mascota === '' || propietario === '' || fecha === '' || hora === '' || sintomas === '') {
    alert('Todos los campos son obligatorios');
    return;
  }

  // Crear objeto de la cita
  const cita = {
    id: Date.now(),
    mascota,
    propietario,
    fecha,
    hora,
    sintomas
  };

  // Agregar la nueva cita al array de citas
  citas = [...citas, cita];

  // Resetear el formulario
  formulario.reset();

  // Mostrar las citas en el HTML
  mostrarCitas();
}

// Función para mostrar las citas
function mostrarCitas() {
  // Limpiar el contenedor de citas antes de mostrar las nuevas
  limpiarHTML();

  // Si no hay citas, mostrar el mensaje "No hay citas"
  if (citas.length === 0) {
    const noCitas = document.createElement('h2');
    noCitas.textContent = 'No hay citas';
    contenedorCitas.appendChild(noCitas);
    return;
  }

  // Recorrer el array de citas y generar HTML por cada una
  citas.forEach(cita => {
    const { mascota, propietario, fecha, hora, sintomas, id } = cita;

    // Crear el contenedor de la cita
    const citaDiv = document.createElement('div');
    citaDiv.classList.add('cita');

    // Crear el HTML de la cita
    citaDiv.innerHTML = `
      <p><span>Mascota:</span> ${mascota}</p>
      <p><span>Propietario:</span> ${propietario}</p>
      <p><span>Fecha:</span> ${fecha}</p>
      <p><span>Hora:</span> ${hora}</p>
      <p><span>Síntomas:</span> ${sintomas}</p>
    `;

    // Botón para eliminar la cita
    const btnEliminar = document.createElement('button');
    btnEliminar.classList.add('btn', 'btn-eliminar');
    btnEliminar.textContent = 'Eliminar';
    btnEliminar.onclick = () => eliminarCita(id);

    citaDiv.appendChild(btnEliminar);

    // Agregar la cita al contenedor de citas
    contenedorCitas.appendChild(citaDiv);
  });
}

// Función para eliminar una cita
function eliminarCita(id) {
  // Filtrar las citas para eliminar la que coincide con el ID
  citas = citas.filter(cita => cita.id !== id);

  // Volver a mostrar las citas actualizadas
  mostrarCitas();
}

// Función para limpiar el HTML
function limpiarHTML() {
  while (contenedorCitas.firstChild) {
    contenedorCitas.removeChild(contenedorCitas.firstChild);
  }
}
