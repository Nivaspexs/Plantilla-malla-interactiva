// TEST para animaciones

const tarjetas = document.querySelectorAll('div.course-box');

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
