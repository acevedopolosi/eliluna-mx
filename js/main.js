/* ==========================================================
   CONFIGURACIÓN — edita aquí los datos que cambian seguido
   ========================================================== */
const CONFIG = {
  // Número que recibe los mensajes del formulario de contacto (WhatsApp).
  // Formato: 52 + 10 dígitos, sin espacios ni signos.
  // [PENDIENTE] Por ahora es el número de prensa de la ficha; cámbialo si atención ciudadana usa otro.
  whatsapp: "524426141762",

  // Página de Facebook que se muestra en Inicio y en Últimas noticias.
  facebook: "https://www.facebook.com/EliSanLuna",

  // Publicaciones de Facebook que se muestran en Inicio (las 3 primeras) y en "Últimas noticias".
  // Para agregar una: en Facebook abre la publicación o el reel > "Copiar enlace"
  // y pega aquí la dirección. Las más nuevas van arriba. La publicación debe ser pública.
  publicaciones: [
    "https://www.facebook.com/EliSanLuna/posts/pfbid02mh5zmLNATjdgHjnPiCFVCpvwyAXxPgizeaoa9SCreLa1rnjEetcL23AS4ZRkB8Mvl", // La Pradera
    "https://www.facebook.com/reel/2065528884165392", // Cabildo: áreas de donación
    "https://www.facebook.com/reel/1134847229031867", // Divino Niño, barrio del Socavón
  ],
};

/* ---------- Menú en celular ---------- */
const menuBoton = document.querySelector(".menu-boton");
const nav = document.querySelector(".nav");
if (menuBoton && nav) {
  menuBoton.addEventListener("click", () => {
    const abierto = nav.classList.toggle("abierto");
    menuBoton.setAttribute("aria-expanded", abierto);
    menuBoton.textContent = abierto ? "Cerrar" : "Menú";
  });
}

/* ---------- Año del pie ---------- */
document.querySelectorAll("[data-anio]").forEach((el) => {
  el.textContent = new Date().getFullYear();
});

/* ---------- Formulario de contacto → WhatsApp ---------- */
document.querySelectorAll("form[data-whatsapp]").forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const d = new FormData(form);
    const lineas = [
      "Hola, Eli. Te escribo desde eliluna.mx",
      "",
      `*Nombre:* ${d.get("nombre")}`,
      d.get("colonia") ? `*Colonia/comunidad:* ${d.get("colonia")}` : "",
      d.get("telefono") ? `*Teléfono:* ${d.get("telefono")}` : "",
      d.get("tema") ? `*Tema:* ${d.get("tema")}` : "",
      "",
      d.get("mensaje"),
    ].filter((l, i, arr) => l !== "" || arr[i - 1] !== "");
    const url = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(lineas.join("\n"))}`;
    window.open(url, "_blank", "noopener");
  });
});

/* ---------- Publicaciones de Facebook ---------- */
document.querySelectorAll("[data-publicaciones]").forEach((caja) => {
  const limite = Number(caja.dataset.publicaciones) || CONFIG.publicaciones.length;
  caja.innerHTML = CONFIG.publicaciones
    .slice(0, limite)
    .map((url) => {
      const tipo = /\/(reel|videos)\//.test(url) ? "fb-video" : "fb-post";
      return `<article class="noticia"><div class="${tipo}" data-href="${url}" data-width="auto" data-show-text="true"></div></article>`;
    })
    .join("");
});

/* ---------- SDK de Facebook (solo si la página lo usa) ---------- */
if (document.querySelector(".fb-post, .fb-video")) {
  const raiz = document.createElement("div");
  raiz.id = "fb-root";
  document.body.prepend(raiz);
  const s = document.createElement("script");
  s.async = true;
  s.defer = true;
  s.crossOrigin = "anonymous";
  s.src = "https://connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v21.0";
  document.body.appendChild(s);
}
