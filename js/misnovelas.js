document.addEventListener("DOMContentLoaded", function () {
  const novelas = document.querySelectorAll("#novela li");
  novelas.forEach((li) => {
    li.addEventListener("mouseover", ponertitulo);
    li.addEventListener("mouseover", presentar);
  });
});

//coloca el titulo del libro.
function ponertitulo(e) {
  const n1 = document.getElementById("n1");
  const n2 = document.getElementById("n2");
  const tituloNovela = document.getElementById("titulonovela");

  if (e.target == n1) {
    tituloNovela.innerHTML = '<h2 >Habia una vez un alma</h2> <h3 >Capítulo I</h3>';
  } else if (e.target == n2) {
    tituloNovela.innerHTML = '<h2 >Un amor que nunca llegó</h2> <h3 >Capítulo I</h3>';
  }
}

//Coloca el primer capitulo de una novela u otra.
function presentar(e) {
  const texto = document.querySelector("#textonovela");
  const n1 = document.getElementById("n1");
  const n2 = document.getElementById("n2");

  if (e.target == n1) {
    texto.innerHTML =
      '<iframe id="mitexto" title="Texto de poema" height="400px" min-width="250px" src="novelas/habiaunavezunalma.html"> </iframe>';
  } else if (e.target == n2) {
    texto.innerHTML =
      '<iframe id="mitexto" title="Texto de poema" height="400px" min-width="250px" src="novelas/unamorquenuncallego.html"> </iframe>';
  }
}

// Nuevo codigo para animacion de portada de novelas.
// aparece una portada y un tiempo despues la otra y se repite sucesivamente.
// La animación se detiene con mouseover sobre el menu desplegable.
window.addEventListener("load", function () {
  let animacionInterval = setInterval(animacion, 8000);

  const detenerAnimacion = document.querySelector("#novela");
  detenerAnimacion.addEventListener("mouseover", function () {
    clearInterval(animacionInterval);
  });

  function animacion() {
    const contenedor = document.querySelector("#textonovela");
    contenedor.innerHTML = ""; // Limpia el contenido inicial

    unamorquenuncallego(contenedor);

    setTimeout(function () {
      habiaunavezunalma(contenedor);
    }, 4000); // Espera 2 segundos antes de mostrar la segunda imagen
  }
});

//Funciones que presentan una u otra imagen
function habiaunavezunalma(contenedor) {
  contenedor.innerHTML =
    '<img id="texto" src="imagenes/habiaunavezunalma175.jpg">';
}

function unamorquenuncallego(contenedor) {
  contenedor.innerHTML =
    '<img id="texto" src="imagenes/unamorquenuncallego175.jpg">';
}
