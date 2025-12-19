const rutaServidor = "https://comentarios-taupe.vercel.app"; // Ruta del backend en Vercel

//#################################################################################################
//  Muestra los comentarios guardados en la base de datos
function mostrarMe(ruta) {
  const rutaServidor = ruta;

  // Definicion de funcion muestra un comentario
  const crearNuevoComentario = (comentario) => {
    const linea = document.createElement("ul");
    const contenido = `<li class="li-comentarios">
        <div class="div-comentarios" id="msg">
            <strong>${comentario.author}</strong> <small>(${comentario.metadata?.country || 'Mundo'})</small><br>
            ${comentario.content}
        </div>
      </li>`;
    linea.innerHTML = contenido;
    return linea;
  };

  // Definicion de funcion obtener comentarios
  const getComentarios = () => {
    // Usamos el appId 'poetarivera-web' hardcoded por ahora
    return fetch(rutaServidor + "/api/comments/poetarivera-web").then((Response) => {
      return Response.json();
    });
  };

  // Comienza ejecucion de codigo
  const miDiv = document.querySelector("[data-table]");
  // Limpiar antes de mostrar para no duplicar si se llama varias veces (opcional, pero buena práctica)
  miDiv.innerHTML = '';

  getComentarios()
    .then((datos) => {
      if (Array.isArray(datos)) {
        datos.forEach((comentarios) => {
          const nuevaLinea = crearNuevoComentario(comentarios);
          miDiv.appendChild(nuevaLinea);
        });
      }
    })
    .catch((error) => {
      console.error(error);
      alert("Ocurrio error al cargar comentarios");
    });
}

//#################################################################################################
//  Funcion OCULTAR comentarios
function ocultarMe() {
  const padreUl = document.querySelector("#comentarios");

  padreUl.firstChild ? eliminar() : alert("No hay comentarios que ocultar");

  function eliminar() {
    while (padreUl.firstChild) {
      padreUl.firstChild.remove();
    }
  }
}

//#################################################################################################
//Funcion guardar usuario y comentario
function guardarMe(nombre, pais, password, comentario, ruta) {
  const rutaServidor = ruta;

  // URL del nuevo backend
  const url = `${rutaServidor}/api/comments/poetarivera-web`;

  // Preparamos payload
  const body = {
    author: nombre,
    content: comentario,
    metadata: { country: pais }
  };

  const opciones = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  };

  // Hacemos la peticion post
  return fetch(url, opciones)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Comentario guardado:", data);
      const mensajeEl = document.getElementById("mensaje");
      if (mensajeEl) mensajeEl.innerHTML = "Tu comentario se ha guardado exitosamente.";

      // Limpiar formulario opcionalmente
      document.getElementById("comentario").value = "";
      document.getElementById("nombre").value = "";
      document.getElementById("pais").value = "";
    })
    .catch((error) => {
      console.error(error);
      const mensajeEl = document.getElementById("mensaje");
      if (mensajeEl) mensajeEl.innerHTML = "Error al enviar el comentario. Intenta más tarde.";
    });
}

let nombre, pais, password, comentario;
const mensajeNombre = "Nombre: 3-12 caracteres alfanuméricos";
const mensajePais = "País: 3-12 caracteres alfanuméricos";

//----------------------------------------------------------------
//Botones a la escucha
const bMostrar = document.getElementById("btnMostrar");
bMostrar.addEventListener("click", mostrar);

const bOcultar = document.getElementById("btnOcultar");
bOcultar.addEventListener("click", ocultar);

const bGuardar = document.getElementById("btnGuardar");
bGuardar.addEventListener("click", guardar);

//------------------------------------------------------------------
//Inputs a la escucha
const nombreEl = document.getElementById("nombre");
nombreEl.addEventListener("blur", validar);

const paisEl = document.getElementById("pais");
paisEl.addEventListener("blur", validar);

// El campo password se ignorará, pero si existe en el DOM no debería romper nada.
// const passwordEl = document.getElementById("password"); 
// if(passwordEl) passwordEl.addEventListener("blur", validar);

const comentarioEl = document.getElementById("comentario");

//------------------------------------------------------------------
//Funciones
function validar(e) {
  if (e.target == nombreEl && "" != nombreEl.value) {
    validaString(nombreEl.value, mensajeNombre, 0);
  } else if (e.target == paisEl && "" != paisEl.value) {
    validaString(paisEl.value, mensajePais, 1);
  }
  // Password validation removed
}

function mostrar() {
  mostrarMe(rutaServidor);
}

function ocultar() {
  ocultarMe(rutaServidor);
}

function guardar() {
  const formulario = document.querySelector("#formulario");
  formulario.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  nombre = nombreEl.value;
  pais = paisEl.value;
  // password = passwordEl ? passwordEl.value : "";
  comentario = comentarioEl.value;

  // Validar básico antes de enviar
  if (!nombre || !pais || !comentario) {
    alert("Por favor completa nombre, país y comentario.");
    return;
  }

  guardarMe(nombre, pais, null, comentario, rutaServidor);
}

/*
Función que valida nombre y pais
1_Mínimo 3 caracteres y máximo de 12.
2_Sin espacios en blanco (para nombre), pais permite espacios? Asumiremos que sí para pais.
3_Solo caracteres alfanuméricos incluyendo ñ y tildes. */
function validaString(cadena, mensaje, npp) {
  let micadena = cadena;
  let mimensaje = mensaje;
  let minpp = npp;
  const mensajeEl = document.getElementById("mensaje");
  let regex;

  if (minpp == 0) {
    regex = /^[a-zA-Z0-9ñáéíóúü]{3,12}$/; // reglas para nombre;
  } else if (minpp == 1) {
    regex = /^[ a-zA-Z0-9ñáéíóúü]{3,12}$/; // reglas para pais;
  }

  if (regex && !regex.test(micadena)) {
    mensajeEl.innerHTML = mimensaje;
  } else {
    // Si es válido, quizás limpiar mensaje error?
    if (mensajeEl.innerHTML == mimensaje) mensajeEl.innerHTML = "";
  }
}
