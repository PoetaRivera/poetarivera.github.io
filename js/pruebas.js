function validaString(cadena, coe) {
  const regexCadena = /^[a-zA-Z0-9ñáéíóúü]{3,12}$/; // expresión regular que valida un string con las reglas mencionadas anteriormente
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let regex;

  coe ? (regex = regexCadena) : (regex = regexEmail);

  if (regex.test(cadena)) {
    console.log("El string cumple con la expresión regular.");
    return true;
  } else {
    console.log("El string no cumple con la expresión regular.");
    return false;
  }
};
let cadena = "nelson@@.n.com";
let coe = false;
validaString(cadena, coe);
