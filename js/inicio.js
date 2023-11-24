$(document).ready(function () {
  /*A la escucha todos los elemtos "a" con el fin de aplicar las funciones resaltar y restaurar 
  en caso de hacer mouseover o mouseout respectivamente sobre ellos*/
  const enlaces = document.querySelectorAll("a");
  for (let element of enlaces) {
    element.addEventListener("mouseover", resaltar);
    element.addEventListener("mouseout", restaurar);
  }

  //A la escucha los botones mass y menoss que mueven los pensamientos
  mass.addEventListener("click", cambiar);
  menoss.addEventListener("click", cambiar);
});
const youtube = document.getElementById("youtube");
youtube.addEventListener("click", ir);
const facebook = document.getElementById("facebook");
facebook.addEventListener("click", ir);

function ir(e) {
  if (e.target == youtube) {
    window.location.href =
      "https://www.youtube.com/channel/UCqoTEbXwDBR8CxZm4JFHJpA";
  } else {
    window.location.href =
      "https://www.facebook.com/profile.php?id=100041344513159";
  }
}

let i = 0;

function cambiar(e) {
  let exitador1 = e.target == mass || e.target == imgMas;
  if (exitador1) {
    ++i;
    if (i > 10) {
      i = 0;
    }
  } else if (e.target == menoss || e.target == imgMenos) {
    --i;
    if (i < 0) {
      i = 10;
    }
  }
  const imagen = pensamientos[i];
  const parrafo = document.getElementById("texto");
  parrafo.innerHTML = imagen;
}

/* Funciones que agregaga o quitan el estilo a los botones de navegación
al hacer mouseover o mouseout sobre ellos */
function resaltar(e) {
  $(`"#links #${e.target}").addClass("resaltar"`);
}

function restaurar(e) {
  $(`"#links #${e.target}").removeClass("resaltar"`);
}

/* Arreglo con todos los pensamientos 
la idea es que en un futuro estén en una base de datos*/

const pensamientos = [
  `Bienvenidos,<br>
me hace muy feliz<br>
vuestra presencia <br>
en esta tu página.<br><br>
Deseo disfruten <br>
de esta muestra <br>
de mi obra literaria.<br>`,

  `La amaba tanto...<br>  
         la necesitaba tanto...<br>
        la deseaba tanto...<br>  
        que cerre los ojos<br>   
        y la amé.`,

  `A veces...</br>
        cuando lo pierdes todo,</br>
        te das cuenta que todo</br>
        no vale nada.</br>
        Porque cuando no tienes</br>
        nada, a veces...</br>
        lo tienes todo.`,

  `La sonrisa que más </br>
        ilumina es la que florece</br>
        en la oscuridad de la</br>
        adversidad.`,

  `Cuando eres feliz</br>
        no evitas la tristeza,</br>
        solo la vives</br>
        y la dejas marchar.`,

  `Como espesa y suave</br>
            neblina fuiste </br>
            atravesando las grietas</br>
            y rendijas de mi alma</br>
            hasta que te adueñaste</br>
            de toda ella.`,

  `Por infinitas que sean</br>
            las penumbras un solo haz</br>
            de luz las hace palidecer;</br>
            por profundas que sean</br>
            las tristezas una sola sonrisa</br>
            las hace palidecer.`,

  `Cuando el desánimo entre</br>
            tu mente y la desesperanza </br>
            aflija tu corazón;</br>
            recuerda que la única </br>
            manera de fracasar es </br>
            si dejas de luchar.`,

  `         Como las ramas unen las hojas al árbol,<br />
            como las raices unen el árbol a la tierra;<br />
            así..., los recuerdos, nos unen a las personas,<br />
            así..., nos unen a la vida.
          `,

  `
          Ella… se durmió en mis ojos;<br />
          su rostro… se tornó pensar;<br />
          su voz… se aferró a mi alma;<br />
          su risa…, sonata en mi pecho es.<br />
        `,

  `
        A veces...;<br>
        la mirada se monta<br>
        en un sentimiento;<br>
        y vuela a tierras lejanas.<br>
      `,
];
