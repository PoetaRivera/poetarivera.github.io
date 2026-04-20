let poemaActual = 0;

document.addEventListener("DOMContentLoaded", function () {
  const lb1 = document.getElementById("libro1");
  if (lb1) lb1.addEventListener("mouseover", ponertitulo);
  document.querySelectorAll("#amor1 li, #desamor1 li, #deseo1 li, #vida1 li").forEach(el => el.addEventListener("mouseover", presentar));

  const lb2 = document.getElementById("libro2");
  if (lb2) lb2.addEventListener("mouseover", ponertitulo);
  document.querySelectorAll("#amor2 li, #intimidad li, #anoranza li, #vida2 li").forEach(el => el.addEventListener("mouseover", presentar));

  const lb3 = document.getElementById("libro3");
  if (lb3) lb3.addEventListener("mouseover", ponertitulo);
  document.querySelectorAll("#amor3 li, #varios li").forEach(el => el.addEventListener("mouseover", presentar));

  // Búsqueda en tiempo real
  const inputBuscar = document.getElementById("inputBuscar");
  if (inputBuscar) {
    inputBuscar.addEventListener("input", function () {
      const termino = this.value.toLowerCase().trim();
      document.querySelectorAll("#menus li[id^='p']").forEach(li => {
        li.style.display = termino === "" || li.textContent.toLowerCase().includes(termino) ? "" : "none";
      });
    });
  }

  // Recuperar último poema visitado
  const ultimo = localStorage.getItem("ultimoPoema");
  if (ultimo) cargarPoema(parseInt(ultimo));
});

const libros = [
  { libro: "libro1", titulo: "Voces del alma", src: "./poemas/vocesdelalma/imagenvocesdelalma.html" },
  { libro: "libro2", titulo: "El perfume de la espera", src: "./poemas/elperfumedelaespera/imagenelperfumedelaespera.html" },
  { libro: "libro3", titulo: "Relatos y poemas", src: "./poemas/relatosypoemas/imagenrelatosypoemas.html" },
];

function ponertitulo(e) {
  let i = 3;
  if (e.target.id == "libro1") i = 0;
  else if (e.target.id == "libro2") i = 1;
  else if (e.target.id == "libro3") i = 2;
  try {
    const enlace1 = document.getElementById("enlace1");
    if (enlace1) enlace1.outerHTML = `<h2 id="enlace1">Libro: ${libros[i].titulo}</h2>`;
    const texto = document.getElementById("texto");
    if (texto) texto.outerHTML = `<iframe id="texto" title="Texto de poema" src="${libros[i].src}"></iframe>`;
  } catch (e) {}
}

const vocesDelAlma = {
  p1:"comosabersilaamas", p2:"cuandomisojostecontemplan", p3:"quisieraserungranpoeta",
  p4:"eres", p5:"unidosporlapoesia", p6:"asiesella", p7:"teextrano", p8:"envano",
  p9:"hedeolvidarte", p10:"brisadeoctubre", p11:"teame1", p12:"instanteprimero",
  p13:"amandote1", p14:"amandote2", p15:"haymomentos", p16:"noterindas",
  p17:"lafelicidad", p18:"elmendigo", p19:"undia",
};

const elPerfumeDeLaEspera = {
  p20:"amantesenelalmendro", p21:"subitosoplo", p22:"lejania", p23:"enmiventana",
  p24:"ansiosoespero", p25:"estadistancia", p26:"amandose1", p27:"amandose3",
  p28:"ellayel", p29:"sombrafurtiva", p30:"riomio", p31:"aquiyolaespero",
  p32:"fuistemia", p33:"suenosdeshojados", p34:"mivaquera", p35:"supartida",
  p36:"susonrisa", p37:"ame", p38:"quizateolvideundia", p39:"siduermeustedprimero",
  p40:"volviendoasonar", p41:"somos", p42:"lanina",
};

const relatosYPoemas = {
  p43:"amores", p44:"hayamores", p45:"ella", p46:"conlamirada",
  p47:"unamorquenuncallego", p48:"noche", p49:"sefue", p50:"elarribo",
  p51:"ninodelacalle", p52:"corazondetorogoz", p53:"quiza", p54:"suenostruncados",
  p55:"ellallevaunhijo", p56:"suenostruncados", p57:"micentroamerica",
};

const audiosvocesdelalma = [3, 10, 13, 16, 17];
const audioselperfumedelaespera = [20, 21, 23, 26, 28];

function cargarPoema(n) {
  poemaActual = n;
  const pi = "p" + n;
  const texto = document.getElementById("texto");
  const hayaudio = document.getElementById("hayaudio");
  const audio = document.getElementById("audio");

  if (n < 20) {
    const ruta = vocesDelAlma[pi];
    if (texto) texto.outerHTML = `<iframe id="texto" title="Texto de poema" height="600px" width="400px" src="./poemas/vocesdelalma/${ruta}.html"></iframe>`;
    for (const a of audiosvocesdelalma) {
      if (a == n) {
        if (hayaudio) hayaudio.outerHTML = '<div id="hayaudio">Espero te guste</div>';
        if (audio) audio.outerHTML = `<audio controls autoplay id="audio"><source src="audios/vocesdelalma/${ruta}.mp3" type="audio/mpeg"/>Tu navegador no admite mp3</audio>`;
        break;
      }
    }
  } else if (n > 19 && n < 43) {
    const ruta = elPerfumeDeLaEspera[pi];
    if (texto) texto.outerHTML = `<iframe id="texto" title="Texto de poema" height="600px" width="400px" src="./poemas/elperfumedelaespera/${ruta}.html"></iframe>`;
    for (const a of audioselperfumedelaespera) {
      if (a == n) {
        if (hayaudio) hayaudio.outerHTML = '<div id="hayaudio">Espero te guste</div>';
        if (audio) audio.outerHTML = `<audio controls autoplay id="audio"><source src="audios/elperfumedelaespera/${ruta}.mp3" type="audio/mpeg"/>Tu navegador no admite mp3</audio>`;
        break;
      }
    }
  } else if (n > 42) {
    const ruta = relatosYPoemas[pi];
    if (texto) texto.outerHTML = `<iframe id="texto" title="Texto de poema" height="600px" width="400px" src="./poemas/relatosypoemas/${ruta}.html"></iframe>`;
  }

  // Guardar en localStorage
  localStorage.setItem("ultimoPoema", n);

  // Scroll suave al área del poema
  setTimeout(() => {
    document.getElementById("modulo1")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 100);

  // Actualizar botón de compartir
  actualizarCompartir(n);
}

function actualizarCompartir(n) {
  const li = document.querySelector(`[id='p${n}']`);
  const titulo = li ? li.textContent.trim() : "Poema de Nelson Rivera";
  const url = "https://poetarivera.github.io/mipoesia.html";
  const texto = `"${titulo}" — poema de Nelson Rivera 🌿 ${url}`;

  const btnWhatsapp = document.getElementById("btnWhatsapp");
  const btnTwitter = document.getElementById("btnTwitter");
  const contenedor = document.getElementById("compartir-poema");

  if (btnWhatsapp) btnWhatsapp.href = `https://wa.me/?text=${encodeURIComponent(texto)}`;
  if (btnTwitter) btnTwitter.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(texto)}`;
  if (contenedor) contenedor.classList.add("visible");
}

function anteriorPoema() {
  if (poemaActual > 1) cargarPoema(poemaActual - 1);
}

function siguientePoema() {
  if (poemaActual > 0 && poemaActual < 57) cargarPoema(poemaActual + 1);
}

function presentar(e) {
  cargarPoema(parseInt(e.target.id.replace(/p/g, "")));
}
