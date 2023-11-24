export let miExistencia;
//#################################################################################################
//  Muestra los comentarios guardados en la base de datos
export function mostrarMe(ruta) {
  const rutaServidor = ruta;
  // Definicion de funcion muestra un comentario
  const crearNuevoComentario = (comentario) => {
    const linea = document.createElement("ul");

    const contenido = `<li class="li-comentarios">
        <textarea class="textarea-comentarios" id="msg" name="user_message">${comentario}</textarea>
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
export function ocultarMe() {
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
// se ejecuta al ser llamada del sevicio-Crud que a su vez se ejecuta cuando
// se genera un click en el boton guardar.
export function guardarMe(nombre, pais, password, comentario, ruta) {
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
      });
  }

  //Si el usuario ya existe solo almacena el comentario;
  //de lo contrario, almacena tambien el usuario.
  function existeUsuario(usuarioE) {
    if (usuarioE == 1) {
      //Usuario no existe, por tanto, guarda usuario y comentario
      //Ejecuta funcion guardaUsuarios
      guardaUsuario(nombre, pais, password, rutaServidor)
        .then((respuesta) => {})
        .catch((err) => {
          console.log(err);
        });

      //Ejecuta funcion guardaComentarios
      guardaComentario(password, comentario, rutaServidor)
        .then((respuesta) => {})
        .catch((err) => {
          console.log(err);
        });
    } else if (usuarioE == 0) {
      //Usuario existe, por lo tanto, solo guarda comentario.
      //Ejecuta funcion guardaComentarios
      guardaComentario(password, comentario, rutaServidor)
        .then((respuesta) => {})
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
          data.nombre.equalIgnoreCase(nombre) &&
          data.pais.equalIgnoreCase(pais) &&
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
    });
}
