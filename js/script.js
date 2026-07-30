// Función que se ejecuta al cargar los contenidos del index

document.addEventListener('DOMContentLoaded', () => {

  cargarJSON();

});


/*
Nombre función: cargarJSON
Descripción: La siguiente función carga el JSON y agregar los bloques de ramos
desde el JSON.

*/

async function cargarJSON() {
  //Carga el JSON
  const respuesta = await fetch('../data/malla.json');

  //Aqui convierte el JSON a objeto automáticamente
  const malla = await respuesta.json();
  console.log(malla.malla);


  Object.entries(malla.malla).forEach(([claveNivel, ramos]) => {
    let numeroColumna = parseInt(claveNivel.match(/\d+/)[0], 10);
    if (numeroColumna == 9 || numeroColumna == 10) {
      numeroColumna = numeroColumna + 1;
    }
    const filaInicial = 3;
    ramos.forEach((ramo, index) => {
      console.log(ramo.pre_requisitos);
      const numeroFila = index + filaInicial;
      crearRamo(ramo.ramo_nombre_html, ramo.codigo, ramo.sct, ramo.pre_requisitos, numeroColumna, numeroFila)

    });


  });
}

/*
Nombre función: crearRamo
Descripción: Crea los divs de los ramos llamado "CourseBox"

*/


function crearRamo(nombre_html, codigo, sct,prerequisitos, columna, fila){
  const nuevoDiv = document.createElement('div');
  nuevoDiv.classList.add('course-box');
  nuevoDiv.id = codigo;
  nuevoDiv.dataset.prerequisitos = prerequisitos.join(',');
  console.log(nuevoDiv.dataset.prerequisitos);

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
