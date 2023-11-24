$(document).ready(function () {
  //libro:Voces del alma/sección amor
  $("#libro1").mouseover(ponertitulo);
  $("#amor1 li").mouseover(presentar);
  $("#desamor1 li").mouseover(presentar);
  $("#deseo1 li").mouseover(presentar);
  $("#vida1 li").mouseover(presentar);

  $("#libro2").mouseover(ponertitulo);
  $("#amor2 li").mouseover(presentar);
  $("#intimidad li").mouseover(presentar);
  $("#anoranza li").mouseover(presentar);
  $("#vida2 li").mouseover(presentar);

  $("#libro3").mouseover(ponertitulo);
  $("#amor3 li").mouseover(presentar);
  $("#varios li").mouseover(presentar);
});

const libros = [
  {
    libro: "libro1",
    titulo: "Voces del alma",
    src: "./poemas/vocesdelalma/imagenvocesdelalma.html",
  },
  {
    libro: "libro2",
    titulo: "El perfume de la espera",
    src:  "./poemas/elperfumedelaespera/imagenelperfumedelaespera.html",
  },
  {
    libro: "libro3",
    titulo: "Relatos y poemas",
    src: "./poemas/relatosypoemas/imagenrelatosypoemas.html",
  },
];

//Cambia el titulo del libro y la portada según el menú
function ponertitulo(e) {
  let i = 3;
  if (e.target == libro1) {
    i = 0;
  } else if (e.target == libro2) {
    i = 1;
  } else if (e.target == libro3) {
    i = 2;
  }

  try {
    const miTitulo = libros[i].titulo;
   // const miTitulo1 = miTitulo.replace(/ /g, "");
    const ruta = libros[i].src;

    $("#enlace1").replaceWith(`<h2 id="enlace1">Libro: ${miTitulo} </h2>`);
    $("#texto").replaceWith(
      `<iframe id="texto" title="Texto de poema"  src="${ruta}"> </iframe>`
    );
  } catch (error) {}
}

const vocesDelAlma = {
  p1: "comosabersilaamas",
  p2: "cuandomisojostecontemplan",
  p3: "quisieraserungranpoeta",
  p4: "eres",
  p5: "unidosporlapoesia",
  p6: "asiesella",
  p7: "teextrano",
  p8: "envano",
  p9: "hedeolvidarte",
  p10: "brisadeoctubre",
  p11: "teame1",
  p12: "instanteprimero",
  p13: "amandote1",
  p14: "amandote2",
  p15: "haymomentos",
  p16: "noterindas",
  p17: "lafelicidad",
  p18: "elmendigo",
  p19: "undia",
};

const elPerfumeDeLaEspera = {
  p20: "amantesenelalmendro",
  p21: "subitosoplo",
  p22: "lejania",
  p23: "enmiventana",
  p24: "ansiosoespero",
  p25: "estadistancia",
  p26: "amandose1",
  p27: "amandose3",
  p28: "ellayel",
  p29: "sombrafurtiva",
  p30: "riomio",
  p31: "aquiyolaespero",
  p32: "fuistemia",
  p33: "suenosdeshojados",
  p34: "mivaquera",
  p35: "supartida",
  p36: "susonrisa",
  p37: "ame",
  p38: "quizateolvideundia",
  p39: "siduermeustedprimero",
  p40: "volviendoasonar",
  p41: "somos",
  p42: "lanina",
};

const relatosYPoemas = {
  p43: "amores",
  p44: "hayamores",
  p45: "ella",
  p46: "conlamirada",
  p47: "unamorquenuncallego",
  p48: "noche",
  p49: "sefue",
  p50: "elarribo",
  p51: "ninodelacalle",
  p52: "corazondetorogoz",
  p53: "quiza",
  p54: "suenostruncados",
  p55: "ellallevaunhijo",
  p56: "suenostruncados",
  p57: "micentroamerica",
};

const audiosvocesdelalma = [3, 10, 13, 16, 17];
const audioselperfumedelaespera = [20,21,23,26,28];

function presentar(e) {
  let pi = e.target.id.toString();
  let piNumero = parseInt(pi.replace(/p/g, ""));

  if (piNumero < 20) {
    let ruta = vocesDelAlma[pi];
    $("#texto").replaceWith(
      `<iframe id="texto" title="Texto de poema" height="600px" width="400px" src="./poemas/vocesdelalma/${ruta}.html"> </iframe>`
    );

    audiosvocesdelalma.forEach((elemento) => {
     
      if ((elemento == piNumero)) {
       
        $("#hayaudio").replaceWith(' <div id="hayaudio">Espero te guste</div>');
        $("#audio").replaceWith(
          `<audio controls autoplay id="audio"> <source  src="audios/vocesdelalma/${ruta}.mp3" type="audio/mpeg" autoplay /> Tu navegador no admite mp3  </audio>`
        );
      }else{}
    });
  } else if (piNumero > 19  && piNumero < 43) {
    let ruta = elPerfumeDeLaEspera[pi];
    $("#texto").replaceWith(
      `<iframe id="texto" title="Texto de poema" height="600px" width="400px" src="./poemas/elperfumedelaespera/${ruta}.html"> </iframe>`
    );

    audioselperfumedelaespera.forEach((elemento) => {
     
      if ((elemento == piNumero)) {

        $("#hayaudio").replaceWith(' <div id="hayaudio">Espero te guste</div>');
        $("#audio").replaceWith(
          `<audio controls autoplay id="audio"> <source  src="audios/elperfumedelaespera/${ruta}.mp3" type="audio/mpeg" autoplay /> Tu navegador no admite mp3  </audio>`
        );
      }else{}
    });

  } else if(piNumero > 42){
    let ruta = relatosYPoemas[pi];
    
    $("#texto").replaceWith(
      `<iframe id="texto" title="Texto de poema" height="600px" width="400px" src="./poemas/relatosypoemas/${ruta}.html"> </iframe>`
    );
  }

 
 
}
