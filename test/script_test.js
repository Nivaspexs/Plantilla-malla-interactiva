// TEST para animaciones

  document.addEventListener('mouseover', (event) => {
  // 1. Buscamos si el clic fue en un .course-box
  const courseBox = event.target.closest('.course-box');

  if (courseBox) {
    // Si ya tiene el efecto en curso, no volvemos a activarlo
    if (courseBox.classList.contains('mouseover-effect')) return;

    // 2. Agregamos la clase que agranda el div
    courseBox.classList.add('mouseover-effect');

    // 3. Registramos en la consola
    const nombreCurso = courseBox.querySelector('.course-name')?.innerText.replace(/\n/g, ' ');
    console.log(`Posado en: ${nombreCurso}`);

    // 4. Quitamos la clase exacto después de 1 segundo (1000 milisegundos)
    setTimeout(() => {
      courseBox.classList.remove('mouseover-effect');
    }, 200);
  }
});

// TEST animacion para barra de titulación



document.addEventListener('mouseover', (event) => {
  // 1. Buscamos si el clic fue en un .course-box
  const barraLicenciatura = event.target.closest('.licenciado-bar');

  if (barraLicenciatura) {
    // Si ya tiene el efecto en curso, no volvemos a activarlo
    if (barraLicenciatura.classList.contains('mouseover-effect')) return;

    // 2. Agregamos la clase que agranda el div
    barraLicenciatura.classList.add('mouseover-effect');

    // 3. Quitamos la clase exacto después de 1 segundo (1000 milisegundos)
    setTimeout(() => {
      barraLicenciatura.classList.remove('mouseover-effect');
    }, 200);
  }
});

// TEST animacion ramo titulación


document.addEventListener('mouseover', (event) => {
  // 1. Buscamos si el clic fue en un .course-box
  const ramoTitulacion = event.target.closest('.titulacion-box');

  if (ramoTitulacion) {
    // Si ya tiene el efecto en curso, no volvemos a activarlo
    if (ramoTitulacion.classList.contains('mouseover-effect')) return;

    // 2. Agregamos la clase que agranda el div
    ramoTitulacion.classList.add('mouseover-effect');


    // 3. Quitamos la clase exacto después de 1 segundo (1000 milisegundos)
    setTimeout(() => {
      ramoTitulacion.classList.remove('mouseover-effect');
    }, 200);
  }
});


// TEST DOM: Creacion de una caja de ramo

document.addEventListener('DOMContentLoaded', () => {

  /*
  const nuevoDiv = document.createElement('div');
  nuevoDiv.classList.add('course-box');
  nuevoDiv.id = 'ING0500';
  // Inyectamos la estructura interna
    nuevoDiv.innerHTML = `
      <div class="course-name">Ingeniería<br>en coito</div>
      <div class="course-sct">SCT: 69</div>
    `;
  nuevoDiv.style.gridColumn = '1';
  nuevoDiv.style.gridRow = '8';

  const contenedor = document.querySelector('.curriculum-grid');
  contenedor.appendChild(nuevoDiv);

   */


  cargarJSON();

  // Las líneas se dibujarán dinámicamente después de cargar el JSON mediante LeaderLine


});

// TEST JSON

async function cargarJSON() {
  //Carga el JSON
  const respuesta = await fetch('../data/malla.json');

  //Aqui convierte el JSON a objeto automáticamente
  const malla = await respuesta.json();
  console.log(malla.malla);

  //Cambiar encabezados y titulo
  /*
  <div class="header-text">
      <h1>INGENIERÍA CIVIL TELEMÁTICA</h1>
      <h2>FACULTAD DE INGENIERÍA Y CIENCIAS</h2>
      <h3>UNIVERSIDAD DE LA FRONTERA</h3>
  </div> */
  document.title = "Malla Curricular - " + malla.carrera;
  const carrera = document.querySelector('.header-text h1');
  carrera.textContent = malla.carrera.toUpperCase();

  const facultad = document.querySelector('.header-text h2');
  facultad.textContent = malla.facultad.toUpperCase();
  // Carga un array de Strings de las Keys, pero es un objeto así que a los
  // nombres de los parámetros
  const clavesMalla = Object.keys(malla.malla);
  console.log(clavesMalla[0]);

  Object.entries(malla.malla).forEach(([claveNivel, ramos]) => {
    let numeroColumna = parseInt(claveNivel.match(/\d+/)[0], 10);
    if (numeroColumna == 9 || numeroColumna == 10) {
      numeroColumna = numeroColumna + 1;
    }
    const filaInicial = 3;
    ramos.forEach((ramo, index) => {
      console.log(ramo.pre_requisitos);
      const numeroFila = index + filaInicial;
      crearRamo(ramo.ramo_nombre_html, ramo.codigo, ramo.sct, ramo.pre_requisitos, numeroColumna, numeroFila, ramo.descripcion || "Este ramo no tiene una descripción detallada en la malla todavía.")

    });


  });

  // Una vez que todos los ramos estén renderizados en el DOM, dibujamos las líneas
  setTimeout(() => {
    dibujarLineasPrerequisitos();
  }, 300);
}

//TEST: Funcion para crear div del ramo


function crearRamo(nombre_html, codigo, sct,prerequisitos, columna, fila, descripcion){
  const nuevoDiv = document.createElement('div');
  nuevoDiv.classList.add('course-box');
  nuevoDiv.id = codigo;
  nuevoDiv.dataset.prerequisitos = prerequisitos.join(',');
  nuevoDiv.dataset.descripcion = descripcion; // Guardar la descripción en el HTML
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


// TEST: Enfocar ramo que se le hace click
//
//  TEST: Ahora recalca de forma visual (BETA) los pre-requisitos

document.addEventListener('click', (event) => {
  const courseBox = event.target.closest('.course-box');

  if (courseBox) {
    // Si el ramo clickeado ya era el origen activo, lo apagamos (efecto toggle)
    if (courseBox.classList.contains('active-origin')) {
      courseBox.classList.remove('active-origin');
      document.querySelectorAll('.course-box').forEach(div => {
        div.classList.remove('dimmed');
        let sctDiv = div.querySelector('.course-sct');
        if (sctDiv) sctDiv.style.backgroundColor = ''; // Restaurar SCT
      });
      lineasGlobales.forEach(item => item.linea.hide('fade'));
      document.getElementById('infoPanel').classList.remove('open'); // Ocultar panel
      return; // Detenemos la ejecución aquí
    }

    // Limpiar el estado de activo de cualquier otro ramo anterior
    document.querySelectorAll('.course-box').forEach(div => {
      div.classList.remove('active-origin');
      let sctDiv = div.querySelector('.course-sct');
      if (sctDiv) sctDiv.style.backgroundColor = ''; // Restaurar SCT
    });

    // Marcar el nuevo ramo como el origen de la consulta
    courseBox.classList.add('active-origin');

    let idRamo = courseBox.id;

    // Obtener los ramos con su nivel de profundidad
    let mapaProfundidad = getPrerequisitosConProfundidad(idRamo);
    let ramosInvolucradosIds = Array.from(mapaProfundidad.keys());

    // 1. Apagar toda la malla
    document.querySelectorAll('.course-box').forEach(div => div.classList.add('dimmed'));

    // 1.5 Cargar datos en el Panel Lateral y mostrarlo
    const panel = document.getElementById('infoPanel');
    document.getElementById('panelTitle').innerHTML = courseBox.querySelector('.course-name').innerHTML;
    document.getElementById('panelSct').textContent = courseBox.querySelector('.course-sct').textContent;
    document.getElementById('panelDesc').textContent = courseBox.dataset.descripcion;

    // Generar etiquetas (badges) de los pre-requisitos directos
    const prereqsContainer = document.getElementById('panelPrereqsContainer');
    prereqsContainer.innerHTML = ''; // Limpiar los del ramo anterior

    // Leer los requisitos directos (los originales)
    const directPrereqs = courseBox.dataset.prerequisitos ? courseBox.dataset.prerequisitos.split(',').filter(x=>x) : [];

    if (directPrereqs.length > 0) {
      directPrereqs.forEach(reqId => {
        let reqBox = document.getElementById(reqId);
        if (reqBox) {
          // Extraer el nombre reemplazando los <br> por espacios
          let reqName = reqBox.querySelector('.course-name').innerHTML.replace(/<br\s*[\/]?>/gi, ' ');
          let span = document.createElement('span');
          span.classList.add('prereq-badge');
          span.textContent = "Pre: " + reqName;
          prereqsContainer.appendChild(span);
        }
      });
    } else {
      let span = document.createElement('span');
      span.classList.add('prereq-badge');
      span.style.backgroundColor = '#4caf50'; // Verde amigable
      span.textContent = "Sin pre-requisitos";
      prereqsContainer.appendChild(span);
    }

    panel.classList.add('open');

    // Colores según la distancia del pre-requisito (Efecto gradiente térmico/profundidad)
    const coloresProfundidad = [
      'rgba(233, 30, 99, 0.9)',   // 0: (No se usa, es el ramo original)
      'rgba(233, 30, 99, 0.9)',   // 1: Rosa fuerte (Pre-requisito directo)
      'rgba(156, 39, 176, 0.85)', // 2: Púrpura
      'rgba(103, 58, 183, 0.85)', // 3: Índigo
      'rgba(63, 81, 181, 0.85)',  // 4: Azul oscuro
      'rgba(33, 150, 243, 0.85)', // 5: Celeste
      'rgba(0, 188, 212, 0.85)',  // 6: Cian
      'rgba(0, 150, 136, 0.85)'   // 7+: Verde Esmeralda
    ];

    // 2. Encender solo los pre-requisitos y el ramo seleccionado
    ramosInvolucradosIds.forEach(id => {
      let bx = document.getElementById(id);
      if(bx) {
        bx.classList.remove('dimmed');

        // PINTAR LA BARRA DE SCT DEL COLOR CORRESPONDIENTE
        let sctDiv = bx.querySelector('.course-sct');
        if (sctDiv) {
          let prof = mapaProfundidad.get(id) || 0;
          let colorIndex = Math.min(prof, coloresProfundidad.length - 1);
          // Al ramo clickeado original (0) le dejamos su color rosa original,
          // de lo contrario usamos el color de profundidad
          sctDiv.style.backgroundColor = coloresProfundidad[prof === 0 ? 1 : colorIndex];
        }
      }
    });

    // MOSTRAR/OCULTAR LÍNEAS
    lineasGlobales.forEach(item => {
      // Si las líneas están activas Y ambos (origen y destino) son parte de la ruta consultada
      if (lineasHabilitadas && ramosInvolucradosIds.includes(item.destino) && ramosInvolucradosIds.includes(item.origen)) {

        let prof = mapaProfundidad.get(item.origen);
        let colorIndex = Math.min(prof, coloresProfundidad.length - 1);

        // Actualizamos el color en base a su nivel antes de mostrarlo
        item.linea.setOptions({ color: coloresProfundidad[colorIndex] });
        item.linea.show('draw', { duration: 600, timing: 'ease-out' });
      } else {
        item.linea.hide(); // Ocultar el resto
      }
    });

  } else {
    // Si se hizo click fuera de un ramo (en la malla), encender toda la malla de nuevo
    document.querySelectorAll('.course-box').forEach(div => {
      div.classList.remove('dimmed');
      div.classList.remove('active-origin'); // Limpiar también el rastro de click

      // Restaurar el color original de los SCT (CSS)
      let sctDiv = div.querySelector('.course-sct');
      if (sctDiv) sctDiv.style.backgroundColor = '';
    });
    lineasGlobales.forEach(item => item.linea.hide('fade'));
    document.getElementById('infoPanel').classList.remove('open'); // Ocultar panel
  }
});

// Evento para cerrar el panel lateral usando el botón X
document.getElementById('closePanel').addEventListener('click', () => {
  document.querySelectorAll('.course-box').forEach(div => {
    div.classList.remove('dimmed');
    div.classList.remove('active-origin');
    let sctDiv = div.querySelector('.course-sct');
    if (sctDiv) sctDiv.style.backgroundColor = '';
  });
  lineasGlobales.forEach(item => item.linea.hide('fade'));
  document.getElementById('infoPanel').classList.remove('open');
});

// TEST: Devolver lista de courseBox por lista prereqs

// NUEVO: Calcular profundidad de prerrequisitos para coloreado usando la red limpia
function getPrerequisitosConProfundidad(idInicial) {
  let mapa = new Map(); // id -> profundidad

  function explorar(id, profundidadActual) {
    // Si ya lo visitamos en una profundidad MENOR O IGUAL, no lo volvemos a procesar
    if (!id || (mapa.has(id) && mapa.get(id) <= profundidadActual)) return;

    mapa.set(id, profundidadActual);

    let ramo = document.getElementById(id);
    // IMPORTANTE: Usamos prerequisitosReducidos para calcular la profundidad real y no "saltarnos" niveles
    if (ramo && ramo.dataset.prerequisitosReducidos) {
      let reqs = ramo.dataset.prerequisitosReducidos.split(',').filter(x=>x);
      reqs.forEach(reqId => explorar(reqId, profundidadActual + 1));
    }
  }

  explorar(idInicial, 0);
  return mapa;
}


// TEST: Encontrar course-box por ID

function findRamoById(idRamo) {
  const courseBox = document.getElementById(idRamo);
  return courseBox;
}

// Variable global para habilitar/deshabilitar el dibujo de líneas
let lineasHabilitadas = false;

// Función para cambiar el estado de las líneas desde cualquier parte o botón
function toggleLineas(estadoBool) {
  lineasHabilitadas = estadoBool;

  // Si las desactivamos, forzamos a ocultar inmediatamente cualquier línea visible
  if (!lineasHabilitadas) {
    lineasGlobales.forEach(item => item.linea.hide('fade'));
  }
}

// Función para dibujar todas las líneas de pre-requisitos de la malla
let lineasGlobales = []; // Guardamos las referencias a las líneas por si necesitamos modificarlas luego

function dibujarLineasPrerequisitos() {
  const ramos = Array.from(document.querySelectorAll('.course-box'));

  // 1. Mapeo de pre-requisitos originales
  const mapaPrereqs = new Map();
  ramos.forEach(ramo => {
    const reqs = ramo.dataset.prerequisitos ? ramo.dataset.prerequisitos.split(',').filter(x => x) : [];
    mapaPrereqs.set(ramo.id, reqs);
  });

  // 2. Función auxiliar para obtener TODOS los pre-requisitos de forma recursiva
  function getAllPrereqs(id, visitados = new Set()) {
    const reqs = mapaPrereqs.get(id) || [];
    reqs.forEach(reqId => {
      if (!visitados.has(reqId)) {
        visitados.add(reqId);
        getAllPrereqs(reqId, visitados);
      }
    });
    return visitados;
  }

  // 3. Reducción Transitiva: Limpiar líneas redundantes
  const mapaReducido = new Map();
  ramos.forEach(ramo => {
    const directReqs = mapaPrereqs.get(ramo.id) || [];
    const redundantReqs = new Set();

    directReqs.forEach(reqId => {
      // Todos los pre-requisitos de mis pre-requisitos directos son "redundantes" para una conexión directa
      const subReqs = getAllPrereqs(reqId);
      subReqs.forEach(sub => redundantReqs.add(sub));
    });

    // Guardamos solo los pre-requisitos estrictamente necesarios
    const essentialReqs = directReqs.filter(id => !redundantReqs.has(id));
    mapaReducido.set(ramo.id, essentialReqs);

    // Inyectamos esto en el DOM para que el sistema de clics y colores lo use
    ramo.dataset.prerequisitosReducidos = essentialReqs.join(',');
  });

  // 4. Dibujar las líneas basándonos ÚNICAMENTE en la red limpia
  ramos.forEach(ramo => {
    const reqs = mapaReducido.get(ramo.id);
    if (reqs) {
      reqs.forEach(reqId => {
        const elementoOrigen = document.getElementById(reqId);
        const elementoDestino = ramo;

        if (elementoOrigen && elementoDestino) {
          const linea = new LeaderLine(elementoOrigen, elementoDestino, {
            color: 'rgba(233, 30, 99, 0.8)',
            size: 2,
            path: 'straight',
            startSocket: 'auto',
            endSocket: 'auto',
            startSocketGravity: 10,
            endSocketGravity: 10,
            endPlug: 'behind',
            hide: true
          });

          lineasGlobales.push({
            origen: reqId,
            destino: ramo.id,
            linea: linea
          });
        }
      });
    }
  });

  // Forzar a nivel DOM que todos los SVG creados por LeaderLine tengan un z-index altísimo
  // Asegurándonos de que superen cualquier clase con animación o hover.
  setTimeout(() => {
    document.querySelectorAll('.leader-line').forEach(svg => {
      svg.style.setProperty('z-index', '50', 'important');
      svg.style.setProperty('pointer-events', 'none', 'important');
    });
  }, 100);
}
