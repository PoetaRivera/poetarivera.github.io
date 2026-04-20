(function () {
  const btn = document.createElement("button");
  btn.id = "btnTema";
  btn.title = "Cambiar tema";
  document.body.appendChild(btn);

  const aplicar = (modo) => {
    document.body.classList.toggle("light-mode", modo === "light");
    btn.textContent = modo === "light" ? "🌙" : "☀️";
  };

  const guardado = localStorage.getItem("tema") || "dark";
  aplicar(guardado);

  btn.addEventListener("click", () => {
    const nuevo = document.body.classList.contains("light-mode") ? "dark" : "light";
    localStorage.setItem("tema", nuevo);
    aplicar(nuevo);
  });
})();
