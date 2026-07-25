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

## Pasar a JSON

Para pasar a un JSON, quizá la estructura ideal sea:

```
{
  "facultad": "",
  "carrera: "",
  "malla":{
    "nivel1":
    [
      {
      "ramo": "",
      "sct":    ,
      "descripcion": "",
      "pre-requisitos": []
      }
    ]
  }
}
```
