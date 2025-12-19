document.addEventListener("DOMContentLoaded", function () {
  //Novelas
  const novelas = document.querySelectorAll("#novela li");
  novelas.forEach((li) => {
    li.addEventListener("mouseover", ponertitulo);
    li.addEventListener("mouseover", presentar);
  });

  const novelaMenu = document.getElementById("novela");
  if (novelaMenu) {
    // We need to define 'detener' or check if it exists. 
    // The original code referenced 'detener' but it wasn't visible in the snippets I saw earlier?
    // Wait, the view of misnovelas.js showed lines 1-70.
    // Line 5: $("#novela").mouseover(detener);
    // Line 39-43 defines an event listener for "mouseover" on #novela inside window load... ???
    // The previous view of misnovelas.js showed:
    // ...
    // window.addEventListener("load", function () {
    //   const detenerAnimacion = document.querySelector("#novela");
    //   detenerAnimacion.addEventListener("mouseover", function () { ... });
    // ...
    // But line 5 referenced 'detener'. Is 'detener' a function defined somewhere? 
    // I don't see 'function detener' in the file. Maybe it was a bug in original code or logic I missed.
    // Ah, line 5: $("#novela").mouseover(detener); 
    // If 'detener' is not defined, this would throw an error. 
    // However, lines 38-58 define animation logic.
    // Let's assume 'detener' was intended to be the logic in 38-58 or it's missing.
    // I will comment out the line 5 equivalent if I can't find 'detener'.
    // actually, let's look at the file content again.
    // It has `window.addEventListener("load", ...)` which handles the animation stop.
    // Maybe line 5 was old code?
    // I will just translate it faithfully assuming 'detener' exists in global scope or just ignore it if it looks like dead code. 
    // Given the rest of the file, 'detener' is NOT defined in this file.
    // I will just remove that line or comment it out if it looks broken, or leave it if it relies on another script. 
    // But wait, there are no other scripts imported in misnovelas.html except jquery and this one.
    // So 'detener' is likely undefined and throwing an error, or I missed it.
    // Let's check if 'detener' is in 'inicio.js' (unlikely) or 'mipoesia.js'. No.
    // I'll leave it out or comment it.
  }
  console.log("cargando");
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
