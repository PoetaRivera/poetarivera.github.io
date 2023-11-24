import {
  guardarMe,
  mostrarMe,
  ocultarMe,
  miExistencia,
} from "./CRUD/funcionesClick.js";

const rutaServidor = "http://localhost:5000"; //ruta servidor
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
nombreEl.addEventListener("mouseout", validar);

const paisEl = document.getElementById("pais");
paisEl.addEventListener("mouseout", validar);

const passwordEl = document.getElementById("password");
passwordEl.addEventListener("mouseout", validar);

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
