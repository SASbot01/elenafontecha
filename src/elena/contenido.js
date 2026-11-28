// Contenido de la landing VSL de Elena Fontecha.
//
// Todo sale de material suyo: su método (el Método CENTRO, la
// pregunta central, la integración vida + liderazgo), su web elenafontecha.com
// (trayectoria y credenciales), su Instagram @elenafontechaoficial (la
// primera conversación gratis) y su bio de marca. Sin testimonios: aún no hay
// permiso para usar nombres ni frases de clientes.
//
// Palabras que su marca prohíbe y que aquí NO aparecen: transformación,
// empoderamiento, potencial, reinvención, mejor versión, despertar, difuso,
// «por inercia», «ha dejado de elegir», «herramientas» como etiqueta.

// ── Para rellenar ────────────────────────────────────────────────────────
// El vídeo (VSL): el embudo lleva UNO solo, arriba del todo.
// · VIDEO_SRC: archivo propio en public/video/ (sin enlaces de salida ni
//   vídeos recomendados: no dispersa el tráfico). Es el que se usa.
// · VIDEO_EMBED: alternativa, un reproductor externo con /embed/… (Wistia,
//   Vimeo). Solo se usa si VIDEO_SRC está vacío.
// Los dos vacíos = póster con «El vídeo, muy pronto».
export const VIDEO_SRC = '/video/vsl-elena.mp4'
export const VIDEO_POSTER = '/video/vsl-elena-poster.jpg'
export const VIDEO_MINUTOS = 9
export const VIDEO_EMBED = ''
// Su Calendly de primera conversación (el de su web). Se abre con nombre y
// correo ya rellenos.
export const CALENDLY = 'https://calendly.com/elena-fontecha/quieres-informacion'
// Lo que dura esa conversación en su Calendly (se dice junto al botón).
export const CALENDLY_MINUTOS = 30
// Comunidad de Elena en Skool: «Las Seis Estaciones».
export const SKOOL = 'https://www.skool.com/las-seis-estaciones-9783'
// Adonde lleva la landing de la formación gratis al enviar el formulario.
export const SKOOL_ABOUT = 'https://www.skool.com/las-seis-estaciones-9783/about'
// ── Tras el formulario ─────────────────────────────────────────────────────
// 1) El lead magnet se entrega ahí mismo, en la web (no depende de que llegue
//    un correo). `url` es un archivo de public/ (p. ej. '/descargas/guia.pdf')
//    o un enlace. Mientras esté vacío, el bloque NO sale en la web publicada;
//    en local se ve el hueco, marcado como pendiente.
export const LEAD_MAGNET = {
  titulo: 'Aquí tienes tu guía',
  texto: 'Es tuya: ábrela ahora y guárdala para volver a ella cuando quieras.',
  boton: 'Abrir la guía',
  url: '',
}
// 2) El aviso: en cuántas horas contacta su equipo con quien envía el formulario.
export const CONTACTO_HORAS = 24
// 3) Un botón más, por rama, solo si se quiere (por defecto, ninguno: el
//    siguiente paso es que su equipo contacta). Uno como mucho: si hay dos
//    botones, no se pulsa ninguno.
//   'contacto'     → sin botón
//   'conversacion' → reservar en su Calendly (se abre dentro de la página)
//   'comunidad'    → entrar en Skool
export const SIGUIENTE_PASO = { persona: 'contacto', empresa: 'contacto' }
// Endpoint de formularios de HELM: guarda el lead en el CRM de Elena.
export const API_FORMULARIOS = 'https://helm.s4sf.net/api/formularios'
// ───────────────────────────────────────────────────────────────────────────

export const REDES = [
  { nombre: 'Instagram', url: 'https://www.instagram.com/elenafontechaoficial/' },
  { nombre: 'LinkedIn', url: 'https://www.linkedin.com/in/elenafontecha-coach-mentora-senioradvisor-juridico-ocio-inmobiliario/' },
  { nombre: 'TikTok', url: 'https://www.tiktok.com/@elenafontechaoficial' },
  { nombre: 'elenafontecha.com', url: 'https://elenafontecha.com' },
]
// La política de privacidad vive en esta misma web (legales/politica-privacidad/).
// Es el enlace de la casilla de consentimiento del formulario.
export const PRIVACIDAD = '/legales/politica-privacidad/'

export const PREGUNTA_GANCHO = '¿Sigo queriendo la vida que estoy construyendo con mi manera de vivir y de actuar?'

// El único botón de la landing, repetido debajo de cada bloque.
export const CTA = 'Hacer el autodiagnóstico'
export const CTA_BAJO = 'Para ti o para tu equipo · Unos cinco minutos'

// Qué se lleva quien responde el autodiagnóstico (bloque 1 de la landing).
export const TE_LLEVAS = [
  ['Una lectura de tu momento', 'Según lo que respondas, para ti o para tu equipo o tu empresa. Es una foto, no una sentencia.'],
  ['Por dónde empezar', 'Tu punto de partida en el Método CENTRO: cuál de sus seis pasos te pide más atención ahora.'],
  ['Elena lo lee personalmente', 'No es un algoritmo: tus respuestas las lee ella. Y en menos de 24 horas su equipo se pone en contacto contigo.'],
]

// Las preguntas del autodiagnóstico (con sus ramas) viven en ./diagnostico.js.

export const PARA_TI = [
  'Tienes una trayectoria consolidada y responsabilidades de liderazgo.',
  'Te van bien las cosas y, aun así, quieres revisar qué significa el éxito para ti en esta etapa.',
  'Cada decisión tiene sentido por separado, pero el conjunto ya no responde del todo a tus prioridades.',
  'Quieres mirar a la vez tu vida y tu manera de dirigir, sin separar una de otra.',
]

export const NO_ES_PARA_TI = [
  'Buscas que alguien confirme una decisión que ya has tomado.',
  'Esperas que «arreglen» a tu equipo sin revisar tu parte.',
  'Quieres resultados sin implicarte en el proceso.',
]

// El Método CENTRO de Elena: seis pasos en ciclo alrededor de la persona,
// cada uno con su plano personal y su plano de liderazgo. Antes se llamaban
// «las seis estaciones»; la comunidad de Skool conserva ese nombre.
export const METODO = 'Método CENTRO'
export const CENTRO = [
  {
    letra: 'C',
    nombre: 'Conocerse',
    vida: 'Comprender quién soy hoy y desde dónde actúo. Reconocer capacidades, necesidades y contradicciones; distinguir hechos de interpretaciones.',
    pregunta: '¿Qué necesito reconocer de mí y de mi situación, aunque resulte incómodo?',
    liderazgo: 'Autoconocimiento y manera de dirigir',
    liderazgoTxt: 'Observar cómo tus fortalezas, miedos y necesidades aparecen al escuchar, delegar, exigir o afrontar desacuerdos. Contrastar lo que pretendes con lo que otras personas experimentan.',
  },
  {
    letra: 'E',
    nombre: 'Elegir tu rumbo',
    vida: 'Dar sentido a la dirección deseada y definir qué significa el éxito en esta etapa: qué conservar, recuperar, ampliar, explorar, reducir o dejar.',
    pregunta: '¿Qué quiero realmente y para qué es importante en mi vida?',
    liderazgo: 'Dirección personal y contribución profesional',
    liderazgoTxt: 'Precisar qué quieres aportar, qué resultados consideras valiosos y qué clase de líder quieres ser. Examinar las tensiones entre tus prioridades y las de la organización.',
  },
  {
    letra: 'N',
    nombre: 'Nombrar tus sistemas',
    vida: 'Explorar los sistemas de los que formo parte, mis papeles, los compromisos que asumo y las expectativas que intervienen.',
    pregunta: '¿Cómo quiero estar en mis relaciones y qué necesito revisar, pedir o acordar?',
    liderazgo: 'Pertenencia y responsabilidad',
    liderazgoTxt: 'Revisar tu papel, tu autoridad, tu influencia y tus compromisos. Reconocer las necesidades de otros y las condiciones que facilitan o dificultan la colaboración.',
  },
  {
    letra: 'T',
    nombre: 'Trazar tu plan',
    vida: 'Conectar lo que quiero con prioridades, metas, recursos y circunstancias. Examinar alternativas, costes y efectos sobre las demás áreas.',
    pregunta: '¿Cómo puede tener lugar lo que quiero sin perder de vista el conjunto de mi vida?',
    liderazgo: 'Plan de vida y prioridades profesionales',
    liderazgoTxt: 'Relacionar las metas profesionales con el tiempo, la energía y los recursos disponibles. Considerar lo que tus prioridades, plazos y compromisos suponen para el equipo.',
  },
  {
    letra: 'R',
    nombre: 'Resolver y actuar',
    vida: 'Preparar decisiones, conversaciones, pruebas y hábitos que permitan avanzar y aprender.',
    pregunta: '¿Qué movimiento concreto tiene sentido ahora y qué necesito para hacerlo posible?',
    liderazgo: 'Acción personal y prácticas de liderazgo',
    liderazgoTxt: 'Traducir la reflexión en conversaciones, acuerdos, delegación y cambios observables. Distinguir qué puedes hacer tú, qué requiere negociación y qué exige una actuación colectiva.',
  },
  {
    letra: 'O',
    nombre: 'Observar y ajustar',
    vida: 'Valorar resultados, costes y aprendizajes; comprobar si las metas siguen teniendo sentido y ajustar el rumbo.',
    pregunta: '¿Sigo queriendo esto y qué necesito mantener, cambiar o dejar?',
    liderazgo: 'Revisión personal y efectos colectivos',
    liderazgoTxt: 'Valorar qué resultados se logran, cómo se producen y qué efectos tienen sobre las personas. Incorporar la mirada de otros y revisar las prácticas que se han vuelto automáticas.',
  },
]

export const CIFRAS = [
  { n: '+25', t: 'años de trayectoria directiva y en consejos' },
  { n: '60', t: 'personas en los equipos que formó y dirigió' },
  { n: '3', t: 'grandes compañías: PortAventura, Servihabitat y Haya Real Estate' },
]

// Franja de trayectoria: el logo de cada casa, todos en un solo color (el
// burdeos de la marca). `logo` es un archivo de public/elena/logos/ en negro
// sobre transparente que se usa como máscara: el color lo pone el CSS.
// `ancho` y `alto` son los del dibujo (dan la proporción) y `px` la altura a
// la que se pinta, ajustada a ojo para que todos pesen parecido. Sin `logo`
// sale el nombre en texto (Elara Asociados no tiene logo público).
export const TRAYECTORIA = [
  { nombre: 'PortAventura', logo: 'portaventura.svg', ancho: 171.5, alto: 150.4, px: 50 },
  { nombre: 'Servihabitat', logo: 'servihabitat.svg', ancho: 120, alto: 20, px: 21 },
  { nombre: 'Haya Real Estate', logo: 'haya-real-estate.svg', ancho: 54, alto: 89, px: 50 },
  { nombre: 'Elara Asociados' },
  { nombre: 'Fundación Mare Terra', logo: 'fundacion-mare-terra.png', ancho: 406, alto: 133, px: 40 },
]
