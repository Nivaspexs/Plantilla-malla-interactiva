// TEST para animaciones

  document.addEventListener('mouseover', (event) => {
  // 1. Buscamos si el clic fue en un .course-box
  const courseBox = event.target.closest('.course-box');

  if (courseBox) {
    // Si ya tiene el efecto en curso, no volvemos a activarlo
    if (courseBox.classList.contains('click-effect')) return;

    // 2. Agregamos la clase que agranda el div
    courseBox.classList.add('click-effect');

    // 3. Registramos en la consola
    const nombreCurso = courseBox.querySelector('.course-name')?.innerText.replace(/\n/g, ' ');
    console.log(`Click en: ${nombreCurso}`);

    // 4. Quitamos la clase exacto después de 1 segundo (1000 milisegundos)
    setTimeout(() => {
      courseBox.classList.remove('click-effect');
    }, 200);
  }
});

// TEST animacion para barra de titulación



document.addEventListener('mouseover', (event) => {
  // 1. Buscamos si el clic fue en un .course-box
  const barraLicenciatura = event.target.closest('.licenciado-bar');

  if (barraLicenciatura) {
    // Si ya tiene el efecto en curso, no volvemos a activarlo
    if (barraLicenciatura.classList.contains('click-effect')) return;

    // 2. Agregamos la clase que agranda el div
    barraLicenciatura.classList.add('click-effect');

    // 3. Quitamos la clase exacto después de 1 segundo (1000 milisegundos)
    setTimeout(() => {
      barraLicenciatura.classList.remove('click-effect');
    }, 200);
  }
});

// TEST animacion ramo titulación


document.addEventListener('mouseover', (event) => {
  // 1. Buscamos si el clic fue en un .course-box
  const ramoTitulacion = event.target.closest('.titulacion-box');

  if (ramoTitulacion) {
    // Si ya tiene el efecto en curso, no volvemos a activarlo
    if (ramoTitulacion.classList.contains('click-effect')) return;

    // 2. Agregamos la clase que agranda el div
    ramoTitulacion.classList.add('click-effect');

    // 3. Quitamos la clase exacto después de 1 segundo (1000 milisegundos)
    setTimeout(() => {
      ramoTitulacion.classList.remove('click-effect');
    }, 200);
  }
});


// TEST DOM: Creacion de una caja de ramo

document.addEventListener('DOMContentLoaded', () => {
  const nuevoDiv = document.createElement('div');
  nuevoDiv.classList.add('course-box');
  nuevoDiv.id = 'ING050';
  // Inyectamos la estructura interna
    nuevoDiv.innerHTML = `
      <div class="course-name">Ingeniería<br>en coito</div>
      <div class="course-sct">SCT: 69</div>
    `;
  nuevoDiv.style.gridColumn = '1';
  nuevoDiv.style.gridRow = '8';

  const contenedor = document.querySelector('.curriculum-grid');
  contenedor.appendChild(nuevoDiv);

  cargarJSON();
});

// TEST JSON

async function cargarJSON() {
  //Carga el JSON
  const respuesta = await fetch('malla_test.json');

  //Aqui convierte el JSON a objeto automáticamente
  const malla = await respuesta.json();
  console.log(malla.malla);

  // Carga un array de Strings de las Keys, pero es un objeto así que a los
  // nombres de los parámetros
  const clavesMalla = Object.keys(malla.malla);
  console.log(clavesMalla[0]);

  Object.entries(malla.malla).forEach(([claveNivel, ramos]) => {
    let numeroColumna = parseInt(claveNivel.match(/\d+/)[0], 10);
    if (numeroColumna == 9 || numeroColumna == 10) {
      numeroColumna = numeroColumna + 1;
    }
    console.log(numeroColumna);
    const filaInicial = 3;
    ramos.forEach((ramo, index) => {
      const numeroFila = index + filaInicial;
      crearRamo(ramo.ramo_nombre_html, ramo.codigo, ramo.sct, numeroColumna, numeroFila)

    });


  });
}

function crearRamo(nombre_html, codigo, sct, columna, fila){
  const nuevoDiv = document.createElement('div');
  nuevoDiv.classList.add('course-box');
  nuevoDiv.id = codigo;
  // Inyectamos la estructura interna
  nuevoDiv.innerHTML = `
    <div class="course-name">`+ nombre_html +
    `</div><div class="course-sct">SCT: ` + sct +`</div>
  `;
  nuevoDiv.style.gridColumn = columna;
  nuevoDiv.style.gridRow = fila;

  const contenedor = document.querySelector('.curriculum-grid');
  contenedor.appendChild(nuevoDiv);
}
