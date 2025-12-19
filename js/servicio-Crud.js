const rutaServidor = "https://servidorcomentarios.onrender.com"; //ruta servidor
//#################################################################################################
//  Muestra los comentarios guardados en la base de datos
function mostrarMe(ruta) {
  const rutaServidor = ruta;
  // Definicion de funcion muestra un comentario
  const crearNuevoComentario = (comentario) => {
    const linea = document.createElement("ul");

    const contenido = `<li class="li-comentarios">
        <div class="div-comentarios" id="msg">${comentario}</div>
      </li>`;
    linea.innerHTML = contenido;
    return linea;
  };

  //Definicion de funcion obtener comentarios
  const getComentarios = () => {
    return fetch(rutaServidor + "/api/comentarios").then((Response) => {
      return Response.json();
    });
  };

  // Comienza ejecucion de codigo
  const miDiv = document.querySelector("[data-table]");
  getComentarios()
    .then((datos) => {
      datos.forEach((comentarios) => {
        const nuevaLinea = crearNuevoComentario(
          //comentarios.id,
          //comentarios.nombre,
          comentarios.comentario
        );
        miDiv.appendChild(nuevaLinea);
      });
    })
    .catch((error) => alert("ocurrio error"));
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
  //-----------------------------------------------------------
  // Definimos funcion guardar usuario
  function guardaUsuario(nombre, pais, password, ruta) {
    const rutaServidor = ruta;
    //Guardamos ruta hacia la coleccion en la base de datos
    const rutaUser = `${rutaServidor}/api/users`;

    //Guardamos datos de usuario
    const dataUser = { nombre, pais, password };

    // Guardamos cabecera
    const opcionesUser = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataUser),
    };

    // Hacemos la peticion post para guardar los datos de usuario
    return fetch(rutaUser, opcionesUser)
      .then((response) => {
        // Verificar el estado de la respuesta
        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status}`);
        }
        // Si la respuesta es exitosa, convertir la respuesta a JSON
        return response.json();
      })
      .then((dataUser) => {
        // Manejar los datos de respuesta del servidor
        console.log("Respuesta del servidor:", dataUser);
      })
      .catch((error) => {
        // Manejar errores
        console.log(error);
        const mensajeEl = document.getElementById("mensaje");
        if (mensajeEl) mensajeEl.innerHTML = "Error al conectar con el servidor. Intenta más tarde.";
      });
  }

  //--------------------------------------------------------------------
  //Definimos funcion guardar comentario
  function guardaComentario(password, comentario, ruta) {
    const rutaServidor = ruta;
    //Guardamos ruta hacia la coleccion en la base de datos
    const rutaComentarios = `${rutaServidor}/api/comentarios`;

    //Guardamos datos de comentario
    const dataComentarios = { comentario, password };

    // Guardamos cabecera
    const opcionesComentarios = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataComentarios),
    };

    // Hacemos la peticion post para guardar los datos del comentario
    return fetch(rutaComentarios, opcionesComentarios)
      .then((response) => {
        // Verificar el estado de la respuesta
        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status}`);
        }
        // Si la respuesta es exitosa, convertir la respuesta a JSON
        return response.json();
      })
      .then((dataComentarios) => {
        // Manejar los datos de respuesta del servidor
        console.log("Respuesta del servidor:", dataComentarios);
      })
      .catch((err) => {
        // Manejar errores
        console.log(err);
        const mensajeEl = document.getElementById("mensaje");
        if (mensajeEl) mensajeEl.innerHTML = "Error al enviar el comentario. Intenta más tarde.";
      });
  }

  //Si el usuario ya existe solo almacena el comentario;
  //de lo contrario, almacena tambien el usuario.
  function existeUsuario(usuarioE) {
    if (usuarioE == 1) {
      //Usuario no existe, por tanto, guarda usuario y comentario
      //Ejecuta funcion guardaUsuarios
      guardaUsuario(nombre, pais, password, rutaServidor)
        .then((respuesta) => { })
        .catch((err) => {
          console.log(err);
        });

      //Ejecuta funcion guardaComentarios
      guardaComentario(password, comentario, rutaServidor)
        .then((respuesta) => { })
        .catch((err) => {
          console.log(err);
        });
    } else if (usuarioE == 0) {
      //Usuario existe, por lo tanto, solo guarda comentario.
      //Ejecuta funcion guardaComentarios
      guardaComentario(password, comentario, rutaServidor)
        .then((respuesta) => { })
        .catch((err) => {
          console.log(err);
        });
    } else if (usuarioE == 2) {
      return;
    }
  }

  // verifica en la base de datos si el usuario ya existe
  // de ser asi retorna true de lo contrario false.
  const rutaServidorParametro = `${rutaServidor}/api/users/${password}`;
  console.log(rutaServidorParametro);
  let existencia;

  const obtenerExistencia = () => {
    return fetch(rutaServidorParametro).then((res) => {
      return res.json();
    });
  };
  //Comienza ejecución de código
  obtenerExistencia()
    .then((data) => {
      let miMensaje = document.getElementById("mensaje");
      if (data != null) {
        //Existe contraseña
        if (
          data.nombre.toLowerCase() === nombre.toLowerCase() &&
          data.pais.toLowerCase() === pais.toLowerCase() &&
          data.password == password
        ) {
          existencia = 0; //Existe usuario. Todo coincide.
          miMensaje.innerHTML = "Tu comentario se ha guardado";
        } else {
          existencia = 2; //contraseña coincide pero país o nombre no.
          miMensaje.innerHTML = "Nombre o País no coinciden";
        }
      } else {
        existencia = 1;
        miMensaje.innerHTML = "!Bienvenido!";
      }
      console.log(existencia);
      existeUsuario(existencia);
    })
    .catch((error) => {
      console.log(error);
      const mensajeEl = document.getElementById("mensaje");
      if (mensajeEl) mensajeEl.innerHTML = "Error al conectar con el servidor. Intenta más tarde.";
    });
}
let nombre, pais, password, comentario;
const mensajeNombre = "Nombre, solo carácteres alfanuméricos sin espacios";
const mensajePais = "País, solo carácters alfanuméricos";
const mensajePassword = "Password, solo carácteres alfanuméricos sin espacios";
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

const passwordEl = document.getElementById("password");
passwordEl.addEventListener("blur", validar);

const comentarioEl = document.getElementById("comentario");
//------------------------------------------------------------------
//Funciones
function validar(e) {
  if (e.target == nombreEl && "" != nombreEl.value) {
    validaString(nombreEl.value, mensajeNombre, 0);
  } else if (e.target == paisEl && "" != paisEl.value) {
    validaString(paisEl.value, mensajePais, 1);
  } else if (e.target == passwordEl && "" != passwordEl.value) {
    validaString(passwordEl.value, mensajePassword, 2);
  }
}

function mostrar() {
  mostrarMe(rutaServidor);
}

function ocultar() {
  ocultarMe(rutaServidor);
}

//Funci
function guardar() {
  const formulario = document.querySelector("#formulario");
  formulario.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  nombre = nombreEl.value;
  pais = paisEl.value;
  password = passwordEl.value;
  comentario = comentarioEl.value;
  guardarMe(nombre, pais, password, comentario, rutaServidor);
}

/*
Función que valida nombre, password y email.
reglas de validación tanto para nombre como para password:
1_Mínimo 3 caracteres y máximo de 12.
2_Sin espacios en blanco.
3_Solo caracteres alfanuméricos incluyendo ñ y tildes. */
function validaString(cadena, mensaje, npp) {
  let micadena = cadena;
  let mimensaje = mensaje;
  let minpp = npp;
  const mensajeEl = document.getElementById("mensaje");
  let regex;
  if (minpp == 0) {
    regex = /^[a-zA-Z0-9ñáéíóúü]{3,12}$/; // reglas para nombre;
    if (!evaluacion(micadena)) {
      mensajeEl.innerHTML = mimensaje;
    } else {
    }
  } else if (minpp == 1) {
    regex = /^[ a-zA-Z0-9ñáéíóúü]{3,12}$/; // reglas para pais;
    if (!evaluacion(micadena)) {
      mensajeEl.innerHTML = mimensaje;
    } else {
    }
  } else if (minpp == 2) {
    regex = /^[a-zA-Z0-9ñáéíóúü]{3,12}$/; // reglas para password;
    if (!evaluacion(micadena)) {
      mensajeEl.innerHTML = mimensaje;
    } else {
    }
  }

  function evaluacion(cadena) {
    let escadena = cadena;
    if (regex.test(escadena)) {
      return true;
    } else {
      return false;
    }
  }
}
