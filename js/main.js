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

  // Publicaciones de Facebook que se muestran en "Últimas noticias".
  // Para agregar una: en Facebook abre la publicación > "..." > "Copiar enlace" (o "Insertar")
  // y pega aquí la dirección. Las más nuevas van arriba. La publicación debe ser pública.
  publicaciones: [
    // "https://www.facebook.com/EliSanLuna/posts/XXXXXXXXXXXX",
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

/* ---------- Publicaciones de Facebook en "Últimas noticias" ---------- */
const contenedorPosts = document.querySelector("[data-publicaciones]");
if (contenedorPosts && CONFIG.publicaciones.length) {
  contenedorPosts.innerHTML = CONFIG.publicaciones
    .map(
      (url) => `<article class="noticia">
        <div class="fb-post" data-href="${url}" data-width="500" data-show-text="true"></div>
      </article>`
    )
    .join("");
}

/* ---------- SDK de Facebook (solo si la página lo usa) ---------- */
if (document.querySelector(".fb-page, .fb-post")) {
  const raiz = document.createElement("div");
  raiz.id = "fb-root";
  document.body.prepend(raiz);
  const s = document.createElement("script");
  s.async = true;
  s.defer = true;
  s.crossOrigin = "anonymous";
  s.src = "https://connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v21.0";
  document.body.appendChild(s);

  // Si el recuadro de Facebook no carga (bloqueadores, perfil no compatible),
  // se queda visible el botón de respaldo "Ver en Facebook".
  setTimeout(() => {
    document.querySelectorAll(".fb-page").forEach((el) => {
      const ok = el.querySelector("iframe") && el.offsetHeight > 150;
      const respaldo = el.parentElement.querySelector(".fb-respaldo");
      if (ok && respaldo) respaldo.hidden = true;
    });
  }, 6000);
}
