document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("#relato li").forEach(function (el) {
    el.addEventListener("mouseover", presentar);
  });
});

const nombreRelato = {
  r1: "lagotita",
  r2: "el",
  r3: "unalmayyo",
  r4: "proximamente",
  r5: "proximamente",
  r6: "proximamente",
  r7: "proximamente",
};

function presentar(e) {
  const textorelatos = document.querySelector("#textorelatos");
  let pi = e.target.id.toString();
  let ruta = nombreRelato[pi];


  textorelatos.innerHTML =
    `<iframe id="mitexto" title="Texto de poema" height="600px" min-width="250px" src="./relatos/${ruta}.html"> </iframe>`;
}
