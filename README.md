# Plantilla-malla-interactiva

Propuesta de proyecto de agrupación "IEEE SB UFRO" que consta de la creación de mallas interactivas para INELE.

### Tecnologías utilizadas

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)


### Estado del proyecto

Actualmente el proyecto se encuentra en fase temprana teniendo proncipalmente el estilo de la malla de referencia en PDF en HTML.
La siguiente imagen es la malla en HTML.

![Malla en HTML](images/malla_html.png)

Además se están realizando diseños de base de datos y explorando formas visualmente acordes para visaulizar los pre requisitos de los ramos.

### Estructura del proyecto

```mermaid
graph TD
    Root["📁 Malla (Raíz)"]
    
    Root --> HTML["📄 index.html<br><i>(Página principal de la aplicación)</i>"]
    Root --> README["📄 README.md<br><i>(Información y documentación general)</i>"]
    
    Root --> CSS["📁 css"]
    CSS --> CSS_File["📄 style.css<br><i>(Hoja de estilos de la aplicación)</i>"]
    
    Root --> Data["📁 data"]
    Data --> Data_File["📄 malla.json<br><i>(Datos estructurados de la malla interactiva)</i>"]
    
    Root --> Docs["📁 docs"]
    Docs --> Docs_File["📄 estructura_proyecto.md<br><i>(Este archivo)</i>"]
    
    Root --> Img["📁 images<br><i>(Imágenes y recursos gráficos)</i>"]
    
    Root --> JS["📁 js"]
    JS --> JS_File["📄 script.js<br><i>(Lógica principal y comportamiento)</i>"]
    
    Root --> Test["📁 test"]
    Test --> Test_Files["📄 Archivos de prueba<br><i>(Tests, bd.json, index_test.html, etc.)</i>"]

    classDef folder fill:#e1f5fe,stroke:#0288d1,stroke-width:2px;
    classDef file fill:#f9fbe7,stroke:#afb42b,stroke-width:1px;
    
    class Root,CSS,Data,Docs,Img,JS,Test folder;
    class HTML,README,CSS_File,Data_File,Docs_File,JS_File,Test_Files file;
```

### To-do

- [x] Crear repositorio común
- [x] Adaptar referencia de malla PDF a HTML inicial
- [ ] Crear base de datos de los ramos (Puede ser una lista, sqlite, localstorage, etc)
  - [ ] Programar funciones CRUD
  - [ ] Rescatar bd de proyecto Cristóbal como base para estándar
  - [ ] Programar la bd con la interfaz para que sea fácilmente adaptable a otras carreras
- [ ] Desarrollar Interactividad básica (como ver info de cada ramo)
  - [ ] Adaptar proyecto para implementar funciones JS
  - [ ] Que las cajas de ramo reaccionen ante el cursor
- [ ] Implementar Pre-requisitos de cada ramo
  - [ ] Visualizar conexión con ramos pre requisitos.
- [x] Testear en iFrame para exportar a una web externa

#### Opcionales

- [ ] Agregar diferenciación de ramos Caso Telemática (Ej: Rama electrónica, software, redes, etc...)
  - [ ] Adaptar sub clases de los elementos "course-box"



### Autores 
- Cristóbal Suarez
- Patricio Calisto 
- Nicolás Vásquez
