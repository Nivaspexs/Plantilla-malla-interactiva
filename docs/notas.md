# Con respecto a BD

La base de datos, que es en dónde se almacenan la siguiente info, pero que se introduzca a través de un JSON:
- Nombre Carrera
- Facultad
- Paleta de colores
- Ramos
  - Nombre
  - SCTs
  - Descripción
  - Lista Pre requisitos (como lo hizo Cirstóbal)

## Cómo organizar los datos

- Datos generales carrera
  - Niveles
    - Info ramos

Entonces finalmente sería bueno que la malla se vaya creando en función del JSON.

### Cómo lo maneja el proyecto de Cristóbal

Es una arreglo de objetos clave valor. Podemos pasar esto directamente a JSON plano, sin jerarquía, pero es preferible que sea anidado.

```
const ASIGNATURAS = [{"codigo": "ING050", "nombre": "Ingeniería y Sociedad", "creditos": "4.0", "nivel": 1, "prereqs": []}, ...];
```

## Funcionamiento del grid en la malla HTML

El grid está hecho en CSS Grid, desde


## Pasar a JSON

Para pasar a un JSON, quizá la estructura ideal sea:

```json
{
  "facultad": "Facultad de Ingeniería y Ciencias",
  "carrera: "Ingeniería Civil Telemática",
  "malla":{
    "nivel1":
    [
      {
      "ramo_nombre_html": "Ingeniería<br>y Sociedad",
      "codigo":"ING050", 
      "sct": 4   ,
      "descripcion": "Primer ramo del LIFIC",
      "pre-requisitos": []
      }
    ]
  }
}
```

Ahora voy a intentar cargar desde el JSON este ramo para que se visualice.

```js
            <div class="course-box" style="grid-column: 1; grid-row: 3;">
                <div class="course-name">Ingeniería<br>y Sociedad</div>
                <div class="course-sct">SCT: 4</div>
            </div>
```

### Código DOM

Este código permite que al cargar la página cargue o ejecute lo que está dentro

```js
document.addEventListener('DOMContentLoaded', () => {
});
```

Primero entonces hay que cargar el JSON:

```js
async function cargarJSON() {
  const respuesta = await fetch('malla_test.json');
  const malla = await respuesta.json();
  console.log(malla);
}
```

Y se llama en el DOMContentLoaded, pero ahora hay que posicionar los datos de la clase 'course-box', antes lo hacía ingresándolo manual como esto:

```js
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
```

Y se posiciona dentro del Grid así:

```js
 const contenedor = document.querySelector('.curriculum-grid');
  contenedor.appendChild(nuevoDiv);
```

#### DOM + JSON

El JSON está estructurado que por cada nivel
