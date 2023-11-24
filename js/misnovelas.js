$(document).ready(function () {
  //Novelas
  $("#novela li").mouseover(ponertitulo);
  $("#novela li").mouseover(presentar);
  $("#novela").mouseover(detener);
  console.log("cargando");
});

//coloca el titulo del libro.
function ponertitulo(e) {
  if (e.target == n1) {
    $("#titulonovela").replaceWith(
      '<div id="titulonovela"><h2 >Habia una vez un alma</h2> <h3 >Capítulo I</h3></div>'
    );
  } else if (e.target == n2) {
    $("#titulonovela").replaceWith(
      '<div id="titulonovela"><h2 >Un amor que nunca llegó</h2> <h3 >Capítulo I</h3></div>'
    );
  }
}

//Coloca el primer capitulo de una novela u otra.
function presentar(e) {
  const texto = document.querySelector("#textonovela");

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
  //Código para detener animación
  const detenerAnimacion = document.querySelector("#novela");
  detenerAnimacion.addEventListener("mouseover", function () {
    clearInterval(animacionInterval);
  });

  //Código que realiza la animación
  const animacionInterval = this.setInterval(animacion, 8000);

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
