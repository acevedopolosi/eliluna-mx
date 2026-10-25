// Genera las páginas HTML estáticas de eliluna.mx con encabezado y pie compartidos.
const fs = require("fs");
const path = require("path");
const OUT = path.join(__dirname, "..");

const FB = "https://www.facebook.com/EliSanLuna";

const ico = {
  escuela: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10 12 5 2 10l10 5 10-5Z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/></svg>',
  personas: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  ciudad: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M5 21V7l7-4 7 4v14"/><path d="M9 21v-6h6v6"/></svg>',
  hoja: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6"/></svg>',
  usuario: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
  cabildo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 22h18"/><path d="M6 18V11"/><path d="M10 18V11"/><path d="M14 18V11"/><path d="M18 18V11"/><path d="m12 2 9 5H3Z"/></svg>',
  mapa: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
  noticias: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8Z"/></svg>',
  telefono: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"/></svg>',
  facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.25-1.5 1.5-1.5h1.6V4.4a21 21 0 0 0-2.3-.1c-2.3 0-3.8 1.4-3.8 3.9v2.3H8v3h2.5V21h3Z"/></svg>',
  reloj: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  bus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="16" height="15" rx="2"/><path d="M4 11h16"/><path d="M8 18v3"/><path d="M16 18v3"/><circle cx="8" cy="14.5" r=".5"/><circle cx="16" cy="14.5" r=".5"/></svg>',
  semaforo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="7" y="2" width="10" height="20" rx="3"/><circle cx="12" cy="7" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="17" r="1.5"/></svg>',
  balanza: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18"/><path d="M5 21h14"/><path d="m3 13 3-7 3 7a3 3 0 0 1-6 0Z"/><path d="m15 13 3-7 3 7a3 3 0 0 1-6 0Z"/><path d="M6 6h12"/></svg>',
};

const paginas = [
  { archivo: "index.html", nav: "Inicio" },
  { archivo: "quien-soy.html", nav: "Quién soy" },
  { archivo: "cabildo.html", nav: "Cabildo" },
  { archivo: "territorio.html", nav: "Territorio" },
  { archivo: "noticias.html", nav: "Últimas noticias" },
  { archivo: "contacto.html", nav: "Contacto" },
];

function encabezado(actual) {
  const links = paginas
    .map((p) => `<li><a href="${p.archivo === "index.html" ? "./" : p.archivo}"${p.archivo === actual ? ' aria-current="page"' : ""}>${p.nav}</a></li>`)
    .join("\n          ");
  return `<a class="saltar" href="#contenido">Saltar al contenido</a>
  <header class="encabezado">
    <div class="contenedor">
      <a class="logo" href="./" aria-label="Elizabeth Luna, inicio">
        <span class="logo-firma">Elizabeth</span>
        <span class="logo-apellido">Luna</span>
      </a>
      <button class="menu-boton" aria-expanded="false" aria-controls="menu">Menú</button>
      <nav class="nav" id="menu" aria-label="Principal">
        <ul>
          ${links}
        </ul>
      </nav>
    </div>
  </header>`;
}

const pie = `<footer class="pie">
    <div class="contenedor">
      <div class="pie-rejilla">
        <div>
          <a class="logo" href="./" aria-label="Elizabeth Luna, inicio">
            <span class="logo-firma">Elizabeth</span>
            <span class="logo-apellido">Luna</span>
          </a>
          <p class="mt" style="margin-top:16px">Regidora del H. Ayuntamiento de El Marqués, Querétaro. Administración 2024–2027.</p>
          <div class="redes">
            <a href="${FB}" target="_blank" rel="noopener" aria-label="Facebook">${ico.facebook}</a>
          </div>
        </div>
        <div>
          <h4>Secciones</h4>
          <ul>
            ${paginas.map((p) => `<li><a href="${p.archivo === "index.html" ? "./" : p.archivo}">${p.nav}</a></li>`).join("\n            ")}
          </ul>
        </div>
        <div>
          <h4>Contacto</h4>
          <ul>
            <li>Prensa: <a href="tel:+524426141762">(442) 614 1762</a></li>
            <li><a href="${FB}" target="_blank" rel="noopener">facebook.com/EliSanLuna</a></li>
            <li><a href="contacto.html">Enviar un mensaje</a></li>
          </ul>
        </div>
      </div>
      <div class="pie-legal">© <span data-anio>2026</span> Elizabeth Luna · eliluna.mx</div>
    </div>
  </footer>`;

function documento({ archivo, titulo, descripcion, cuerpo }) {
  return `<!doctype html>
<html lang="es-MX">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${titulo}</title>
  <meta name="description" content="${descripcion}">
  <meta name="theme-color" content="#8c1d3f">
  <link rel="canonical" href="https://eliluna.mx/${archivo === "index.html" ? "" : archivo}">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="es_MX">
  <meta property="og:title" content="${titulo}">
  <meta property="og:description" content="${descripcion}">
  <meta property="og:url" content="https://eliluna.mx/${archivo === "index.html" ? "" : archivo}">
  <meta property="og:image" content="https://eliluna.mx/img/eli-luna.jpg">
  <link rel="icon" href="img/favicon.svg" type="image/svg+xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Yellowtail&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  ${encabezado(archivo)}

  <main id="contenido">
${cuerpo}
  </main>

  ${pie}

  <script src="js/main.js"></script>
</body>
</html>
`;
}

function cabecera(titulo, texto) {
  return `    <section class="cabecera">
      <div class="contenedor">
        <div class="miga"><a href="./">Inicio</a> / ${titulo}</div>
        <h1>${titulo}</h1>
        <p>${texto}</p>
      </div>
    </section>`;
}

const formulario = `<form class="formulario" data-whatsapp>
            <div class="fila">
              <div class="campo">
                <label for="nombre">Nombre</label>
                <input id="nombre" name="nombre" required autocomplete="name">
              </div>
              <div class="campo">
                <label for="telefono">Teléfono (opcional)</label>
                <input id="telefono" name="telefono" type="tel" autocomplete="tel">
              </div>
            </div>
            <div class="fila">
              <div class="campo">
                <label for="colonia">Colonia o comunidad</label>
                <input id="colonia" name="colonia" placeholder="Ej. La Cañada">
              </div>
              <div class="campo">
                <label for="tema">Tema</label>
                <select id="tema" name="tema">
                  <option value="">Selecciona…</option>
                  <option>Educación y escuelas</option>
                  <option>Servicios públicos</option>
                  <option>Desarrollo urbano y fraccionamientos</option>
                  <option>Transporte y movilidad</option>
                  <option>Programas sociales y becas</option>
                  <option>Medio ambiente</option>
                  <option>Cultura y deporte</option>
                  <option>Otro</option>
                </select>
              </div>
            </div>
            <div class="campo">
              <label for="mensaje">¿Cómo te puedo ayudar?</label>
              <textarea id="mensaje" name="mensaje" required></textarea>
            </div>
            <button class="boton" type="submit">Enviar por WhatsApp</button>
            <p class="nota">Al enviar se abrirá WhatsApp con tu mensaje listo. Tus datos solo se usan para darle seguimiento a tu petición.</p>
          </form>`;

function cajaContacto(titulo = "¿Tienes una petición o propuesta?") {
  return `        <div class="contacto-caja">
          <div>
            <h2>${titulo}</h2>
            <p>Mi oficina tiene las puertas abiertas. Escríbeme y con gusto atiendo, doy seguimiento o canalizo tu petición con el área que corresponda.</p>
            <ul class="contacto-datos">
              <li>${ico.telefono}<span>Prensa: <a href="tel:+524426141762">(442) 614 1762</a></span></li>
              <li>${ico.facebook}<span><a href="${FB}" target="_blank" rel="noopener">facebook.com/EliSanLuna</a></span></li>
              <li>${ico.mapa}<span>H. Ayuntamiento de El Marqués, Querétaro</span></li>
            </ul>
          </div>
          ${formulario}
        </div>`;
}

const fbPage = (alto = 700) => `<div class="fb-caja">
          <div class="fb-page" data-href="${FB}" data-tabs="timeline" data-width="500" data-height="${alto}"
               data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="false">
            <blockquote cite="${FB}" class="fb-xfbml-parse-ignore"><a href="${FB}">Elizabeth Luna en Facebook</a></blockquote>
          </div>
          <div class="fb-respaldo">
            <p>Sigue mis actividades diarias en Facebook.</p>
            <a class="boton" href="${FB}" target="_blank" rel="noopener">${ico.facebook} Ver en Facebook</a>
          </div>
        </div>`;


const galeria = (fotos) => `<div class="galeria">
          ${fotos.map(([f, alt]) => `<figure><img src="img/${f}" alt="${alt}" loading="lazy"></figure>`).join("\n          ")}
        </div>`;

const FOTOS = [
  ["territorio-vecinos.jpg", "Elizabeth Luna con vecinas y vecinos en una reunión comunitaria"],
  ["territorio-grupo.jpg", "Elizabeth Luna con un grupo numeroso de ciudadanas y ciudadanos"],
  ["territorio-oficina.jpg", "Elizabeth Luna atendiendo en su oficina"],
  ["territorio-desayuno.jpg", "Reunión de trabajo con ciudadanos alrededor de una mesa"],
  ["territorio-reunion.jpg", "Elizabeth Luna escuchando en una reunión con mujeres de la comunidad"],
  ["territorio-evento.jpg", "Elizabeth Luna conviviendo en un evento público"],
];

/* ======================= INICIO ======================= */
const inicio = `    <section class="portada">
      <div class="contenedor">
        <div>
          <span class="etiqueta">Regidora de El Marqués · 2024–2027</span>
          <h1><span class="firma">Elizabeth</span> Luna</h1>
          <p class="firma-lema">La Cañada, mi origen. El Marqués, mi misión. México, nuestro futuro.</p>
          <p class="lema">Trabajo de puertas abiertas para que la educación, la participación ciudadana y un desarrollo ordenado lleguen a todas las comunidades de El Marqués.</p>
          <div class="acciones">
            <a class="boton" href="#contacto">Escríbeme</a>
            <a class="boton boton-secundario" href="quien-soy.html">Conóceme</a>
          </div>
        </div>
        <div class="portada-foto">
          <img src="img/eli-oficina.jpg" alt="Elizabeth Luna, Regidora de El Marqués, en su oficina" width="1050" height="1400">
        </div>
      </div>
    </section>

    <div class="contenedor">
      <div class="cifras">
        <div class="cifra"><strong>+500</strong><span>personas atendidas en el primer año</span></div>
        <div class="cifra"><strong>2 ha</strong><span>gestionadas para el CBTIS 304 en Los Héroes</span></div>
        <div class="cifra"><strong>1,500</strong><span>estudiantes beneficiados por el nuevo plantel</span></div>
        <div class="cifra"><strong>60%</strong><span>del territorio cubierto por la ruta propuesta</span></div>
      </div>
    </div>

    <section class="seccion">
      <div class="contenedor">
        <div class="seccion-titulo">
          <span class="sobre">Mi trabajo</span>
          <h2>Una regidora cercana a su gente</h2>
          <p>Licenciada en Desarrollo Humano para la Sustentabilidad y Maestra en Administración de Negocios. Fundadora de Morena en El Marqués y hoy Presidenta de la Comisión de Educación y Cultura.</p>
        </div>
        <div class="rejilla">
          <a class="tarjeta" href="quien-soy.html">
            <div class="icono">${ico.usuario}</div>
            <h3>Quién soy</h3>
            <p>Mi formación, mi trayectoria y por qué decidí servir a El Marqués.</p>
            <span class="mas">Leer más →</span>
          </a>
          <a class="tarjeta" href="cabildo.html">
            <div class="icono">${ico.cabildo}</div>
            <h3>Cabildo</h3>
            <p>Las comisiones que presido e integro, y las propuestas que impulso en el Ayuntamiento.</p>
            <span class="mas">Ver comisiones →</span>
          </a>
          <a class="tarjeta" href="territorio.html">
            <div class="icono">${ico.mapa}</div>
            <h3>Territorio</h3>
            <p>Gestiones en las comunidades: escuelas, centros comunitarios, transporte y espacios naturales.</p>
            <span class="mas">Recorrer →</span>
          </a>
          <a class="tarjeta" href="noticias.html">
            <div class="icono">${ico.noticias}</div>
            <h3>Últimas noticias</h3>
            <p>Actividades, recorridos y acuerdos más recientes.</p>
            <span class="mas">Ver noticias →</span>
          </a>
        </div>
      </div>
    </section>

    <section class="seccion seccion-alt">
      <div class="contenedor">
        <div class="seccion-titulo">
          <span class="sobre">Temas eje</span>
          <h2>Lo que impulso</h2>
        </div>
        <div class="rejilla">
          <div class="tarjeta eje">
            <div class="icono">${ico.escuela}</div>
            <h3>Educación como motor de cambio</h3>
            <p>Contacto permanente con las comunidades escolares para gestionar recursos y mejorar sus entornos.</p>
          </div>
          <div class="tarjeta eje">
            <div class="icono">${ico.personas}</div>
            <h3>Puertas abiertas</h3>
            <p>Atención personal a cada ciudadana y ciudadano, y acercamiento de los programas del Gobierno de México.</p>
          </div>
          <div class="tarjeta eje">
            <div class="icono">${ico.ciudad}</div>
            <h3>Desarrollo urbano y movilidad</h3>
            <p>Transparencia en los desarrollos inmobiliarios y mejor transporte para todo el municipio.</p>
          </div>
          <div class="tarjeta eje">
            <div class="icono">${ico.hoja}</div>
            <h3>Sustentabilidad, cultura y género</h3>
            <p>Educación ambiental, protección de nuestro patrimonio natural y cultural, y prevención de la violencia.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="seccion">
      <div class="contenedor">
        <div class="seccion-titulo">
          <span class="sobre">En territorio</span>
          <h2>Caminando El Marqués</h2>
          <p>Reuniones con vecinas y vecinos, atención en oficina y trabajo en comunidad.</p>
        </div>
        ${galeria(FOTOS.slice(0, 3))}
        <p class="mt"><a class="boton boton-secundario" href="territorio.html">Ver más del territorio</a></p>
      </div>
    </section>

    <section class="seccion seccion-alt">
      <div class="contenedor">
        <div class="seccion-titulo">
          <span class="sobre">En Facebook</span>
          <h2>Mis publicaciones más recientes</h2>
          <p>Todos los días comparto recorridos, gestiones y actividades con las comunidades de El Marqués. Sígueme para estar al tanto.</p>
        </div>
        <div class="noticias" data-publicaciones="3"></div>
        <p class="mt">
          <a class="boton" href="${FB}" target="_blank" rel="noopener">${ico.facebook} Sígueme en Facebook</a>
          <a class="boton boton-secundario" href="noticias.html">Todas las noticias</a>
        </p>
      </div>
    </section>

    <section class="seccion" id="contacto">
      <div class="contenedor">
${cajaContacto()}
      </div>
    </section>`;

/* ======================= QUIÉN SOY ======================= */
const quienSoy = `${cabecera("Quién soy", "Soy Elizabeth Luna, Regidora de El Marqués por Morena. Creo en una política cercana, de puertas abiertas y con resultados en territorio.")}

    <section class="seccion">
      <div class="contenedor bloque-foto">
        <img src="img/eli-retrato.jpg" alt="Retrato de Elizabeth Luna" width="868" height="796">
        <div>
          <span class="sobre" style="color:var(--guinda);font-weight:700;font-size:.82rem;letter-spacing:.1em;text-transform:uppercase">Perfil</span>
          <h2>Judith Elizabeth Sánchez Luna</h2>
          <p>Soy Licenciada en <strong>Desarrollo Humano para la Sustentabilidad</strong> y Maestra en <strong>Administración de Negocios</strong>. Mi formación me ha enseñado que el desarrollo de una comunidad se mide por la calidad de vida de su gente y por el cuidado de su entorno.</p>
          <p>Nací en La Cañada, El Marqués. Soy fundadora de Morena, activa desde 2012, y presidí el primer Comité Municipal de Morena en El Marqués. Desde entonces he trabajado en la organización comunitaria, con las juventudes y con la transparencia, hasta llegar al Cabildo para el periodo 2024–2027.</p>
          <p>Como regidora, atiendo personalmente a las y los ciudadanos para resolver y canalizar sus peticiones. En mi primer año atendí a <strong>más de 500 personas</strong>.</p>
          <p class="mt"><a class="boton" href="contacto.html">Escríbeme</a></p>
        </div>
      </div>
    </section>

    <section class="seccion seccion-alt">
      <div class="contenedor rejilla-2">
        <div>
          <div class="seccion-titulo"><span class="sobre">Trayectoria</span><h2>Mi camino en la vida pública</h2></div>
          <ul class="lista-linea">
            <li><strong>Fundadora de Morena</strong></li>
            <li><strong>Presidenta del primer Comité Municipal de Morena</strong> en El Marqués</li>
            <li><strong>Coordinadora</strong> en la Secretaría Estatal de Jóvenes Morena Querétaro</li>
            <li><strong>Consejera Estatal</strong> de Morena Querétaro y <strong>Congresista Nacional</strong> de Morena</li>
            <li><strong>Titular de la Unidad de Transparencia</strong> en Morena Querétaro</li>
            <li class="actual"><strong>Regidora en El Marqués</strong> por Morena, 2024–2027</li>
          </ul>
        </div>
        <div>
          <div class="seccion-titulo"><span class="sobre">Formación</span><h2>Estudios</h2></div>
          <div class="tarjeta" style="margin-bottom:16px">
            <div class="icono">${ico.hoja}</div>
            <h3>Licenciatura en Desarrollo Humano para la Sustentabilidad</h3>
          </div>
          <div class="tarjeta">
            <div class="icono">${ico.escuela}</div>
            <h3>Maestría en Administración de Negocios</h3>
          </div>
        </div>
      </div>
    </section>`;

/* ======================= CABILDO ======================= */
const cabildo = `${cabecera("Cabildo", "Mi trabajo en el H. Ayuntamiento de El Marqués: comisiones, consejos y propuestas para el periodo 2024–2027.")}

    <section class="seccion">
      <div class="contenedor rejilla-2">
        <div>
          <div class="seccion-titulo"><span class="sobre">Responsabilidades</span><h2>Comisiones y consejos</h2>
            <p>Presido la comisión dedicada a la educación y la cultura y participo en espacios clave para la familia, la participación ciudadana y la planeación del municipio.</p>
          </div>
        </div>
        <ul class="lista-check tarjeta">
          <li><span class="rol">Presidenta</span>Comisión de Educación y Cultura</li>
          <li><span class="rol">Integrante</span>Comisión de la Familia</li>
          <li><span class="rol">Integrante</span>Comisión de Participación Ciudadana</li>
          <li><span class="rol">Consejera</span>Instituto Municipal de Planeación</li>
          <li><span class="rol">Integrante</span>Consejo Municipal contra las Adicciones</li>
          <li><span class="rol">Integrante</span>Grupo Municipal para la Prevención del Embarazo en Adolescentes</li>
        </ul>
      </div>
    </section>

    <section class="seccion seccion-alt">
      <div class="contenedor">
        <div class="seccion-titulo"><span class="sobre">Propuestas</span><h2>Lo que he llevado al Cabildo</h2></div>
        <div class="rejilla">
          <div class="tarjeta eje">
            <div class="icono">${ico.semaforo}</div>
            <h3>Semáforo de Desarrollos</h3>
            <p>Una herramienta en tiempo real para que la ciudadanía conozca el estatus legal de los desarrollos inmobiliarios y así evitar fraudes.</p>
          </div>
          <div class="tarjeta eje">
            <div class="icono">${ico.bus}</div>
            <h3>Nueva ruta Las Lajitas – La Piedad</h3>
            <p>Propuesta de una ruta de transporte para cubrir más del 60% del territorio municipal.</p>
          </div>
          <div class="tarjeta eje">
            <div class="icono">${ico.hoja}</div>
            <h3>Programa Integral de Educación Ambiental</h3>
            <p>Con incidencia directa en el sector industrial, las escuelas, los fraccionamientos y los propios procesos del municipio.</p>
          </div>
          <div class="tarjeta eje">
            <div class="icono">${ico.balanza}</div>
            <h3>Capacitación obligatoria en género</h3>
            <p>Para las y los servidores públicos del municipio, con el fin de prevenir la violencia institucional y social.</p>
          </div>
          <div class="tarjeta eje">
            <div class="icono">${ico.mapa}</div>
            <h3>Protección del Cerro del Baptisterio</h3>
            <p>Impulso a su protección como zona natural y tradicional del municipio.</p>
          </div>
          <div class="tarjeta eje">
            <div class="icono">${ico.personas}</div>
            <h3>Día de las Danzas Chichimecas</h3>
            <p>Rescate de esta celebración como parte de la identidad cultural de El Marqués.</p>
          </div>
        </div>
      </div>
    </section>`;

/* ======================= TERRITORIO ======================= */
const territorio = `${cabecera("Territorio", "La política se hace caminando las comunidades. Estas son algunas de las gestiones que he impulsado en El Marqués.")}

    <section class="seccion">
      <div class="contenedor">
        <div class="rejilla">
          <div class="tarjeta lugar">
            <span class="zona">Los Héroes</span>
            <h3>CBTIS 304</h3>
            <p>Lideré la gestión de <strong>2 hectáreas</strong> para el nuevo plantel, que dará servicio a <strong>1,500 estudiantes</strong>.</p>
          </div>
          <div class="tarjeta lugar">
            <span class="zona">El Piojito · La Cañada</span>
            <h3>Centro Integrador de Desarrollo</h3>
            <p>Pieza clave en la gestión de este centro que acerca los programas del Gobierno de México a las familias.</p>
          </div>
          <div class="tarjeta lugar">
            <span class="zona">El Marqués</span>
            <h3>Oficina de Becas Benito Juárez</h3>
            <p>Gestión de una oficina en el municipio para que las y los estudiantes realicen sus trámites sin trasladarse lejos.</p>
          </div>
          <div class="tarjeta lugar">
            <span class="zona">Las Lajitas – La Piedad</span>
            <h3>Nueva ruta de transporte</h3>
            <p>Propuesta para conectar comunidades y cubrir más del 60% del territorio municipal.</p>
          </div>
          <div class="tarjeta lugar">
            <span class="zona">Los Héroes</span>
            <h3>Crucero frente al Tren México–Querétaro</h3>
            <p>He exigido atención prioritaria a este crucero ante las obras del tren, por la seguridad de quienes lo cruzan a diario.</p>
          </div>
          <div class="tarjeta lugar">
            <span class="zona">Cerro del Baptisterio</span>
            <h3>Zona natural y tradicional</h3>
            <p>Impulso a su protección para conservar su valor ambiental y cultural.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="seccion seccion-alt">
      <div class="contenedor">
        <div class="seccion-titulo"><span class="sobre">Galería</span><h2>En las comunidades</h2></div>
        ${galeria(FOTOS)}
      </div>
    </section>

    <section class="seccion">
      <div class="contenedor rejilla-2" style="align-items:center">
        <div>
          <div class="seccion-titulo">
            <span class="sobre">Organización comunitaria</span>
            <h2>Trabajo hombro con hombro</h2>
            <p>Fomento la organización de las comunidades con tequios, jornadas de reforestación e impulso a actividades extraescolares como equipos deportivos y bandas de guerra.</p>
          </div>
          <a class="boton" href="contacto.html">Invítame a tu comunidad</a>
        </div>
        <div class="mapa">
          <iframe title="Mapa del municipio de El Marqués, Querétaro" loading="lazy"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-100.45%2C20.50%2C-100.13%2C20.82&amp;layer=mapnik"></iframe>
          <small>Municipio de El Marqués, Querétaro · Mapa © colaboradores de OpenStreetMap</small>
        </div>
      </div>
    </section>`;

/* ======================= NOTICIAS ======================= */
const noticias = `${cabecera("Últimas noticias", "Actividades, recorridos, gestiones y acuerdos de Cabildo.")}

    <section class="seccion">
      <div class="contenedor">
        <div class="noticias" data-publicaciones></div>
        <div class="tarjeta centro mt">
          <span class="sobre" style="color:var(--guinda);font-weight:700;font-size:.82rem;letter-spacing:.1em;text-transform:uppercase">Día a día</span>
          <h2>Sígueme en Facebook</h2>
          <p>Ahí publico al momento mis recorridos por las comunidades, sesiones de Cabildo y actividades con escuelas y vecinos.</p>
          <a class="boton" href="${FB}" target="_blank" rel="noopener">${ico.facebook} Ir a mi Facebook</a>
        </div>
      </div>
    </section>`;

/* ======================= CONTACTO ======================= */
const contacto = `${cabecera("Contacto", "Mi oficina es de puertas abiertas. Cuéntame tu petición, propuesta o invitación.")}

    <section class="seccion">
      <div class="contenedor">
${cajaContacto("Escríbeme")}
      </div>
    </section>

    <section class="seccion seccion-alt">
      <div class="contenedor rejilla">
        <div class="tarjeta">
          <div class="icono">${ico.reloj}</div>
          <h3>Atención ciudadana</h3>
          <p>Atiendo personalmente cada petición y la canalizo con el área que corresponda.</p>
        </div>
        <div class="tarjeta">
          <div class="icono">${ico.noticias}</div>
          <h3>Medios de comunicación</h3>
          <p>Para entrevistas y prensa: <a href="tel:+524426141762">(442) 614 1762</a></p>
        </div>
        <div class="tarjeta">
          <div class="icono">${ico.facebook}</div>
          <h3>Redes sociales</h3>
          <p><a href="${FB}" target="_blank" rel="noopener">facebook.com/EliSanLuna</a></p>
        </div>
      </div>
    </section>`;

const contenido = {
  "index.html": { titulo: "Elizabeth Luna · Regidora de El Marqués", descripcion: "Sitio oficial de Elizabeth Luna, Regidora de El Marqués, Querétaro, 2024–2027. Educación, participación ciudadana y desarrollo ordenado.", cuerpo: inicio },
  "quien-soy.html": { titulo: "Quién soy · Elizabeth Luna", descripcion: "Semblanza, formación y trayectoria de Elizabeth Luna, Regidora de El Marqués por Morena.", cuerpo: quienSoy },
  "cabildo.html": { titulo: "Cabildo · Elizabeth Luna", descripcion: "Comisiones, consejos y propuestas de Elizabeth Luna en el Ayuntamiento de El Marqués 2024–2027.", cuerpo: cabildo },
  "territorio.html": { titulo: "Territorio · Elizabeth Luna", descripcion: "Gestiones de Elizabeth Luna en las comunidades de El Marqués: CBTIS 304, Centro Integrador de Desarrollo, transporte y más.", cuerpo: territorio },
  "noticias.html": { titulo: "Últimas noticias · Elizabeth Luna", descripcion: "Actividades y noticias recientes de Elizabeth Luna, Regidora de El Marqués.", cuerpo: noticias },
  "contacto.html": { titulo: "Contacto · Elizabeth Luna", descripcion: "Escríbele a Elizabeth Luna, Regidora de El Marqués. Atención ciudadana de puertas abiertas.", cuerpo: contacto },
};

for (const [archivo, datos] of Object.entries(contenido)) {
  fs.writeFileSync(path.join(OUT, archivo), documento({ archivo, ...datos }), "utf8");
  console.log("ok", archivo);
}

fs.writeFileSync(path.join(OUT, "404.html"), documento({
  archivo: "404.html",
  titulo: "Página no encontrada · Elizabeth Luna",
  descripcion: "La página que buscas no existe.",
  cuerpo: `${cabecera("Página no encontrada", "La página que buscas no existe o cambió de dirección.")}
    <section class="seccion"><div class="contenedor centro"><a class="boton" href="/">Volver al inicio</a></div></section>`,
}).replace(/href="(css|js|img)\//g, 'href="/$1/').replace(/src="js\//, 'src="/js/'), "utf8");
console.log("ok 404.html");
