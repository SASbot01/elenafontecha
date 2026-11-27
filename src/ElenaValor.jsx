import { useEffect, useRef, useState } from 'react'
import './elena/elena.css'
import {
  VIDEO_SRC, VIDEO_POSTER, VIDEO_MINUTOS, VIDEO_EMBED, PREGUNTA_GANCHO, CTA, CTA_BAJO,
  TE_LLEVAS, PARA_TI, NO_ES_PARA_TI, CIFRAS, TRAYECTORIA,
} from './elena/contenido'
import Autodiagnostico from './elena/Autodiagnostico.jsx'
import { dos, IcoPlay, IcoCheck, IcoFlecha } from './elena/comun.jsx'

// Embudo de Elena Fontecha (repo SASbot01/elenafontecha): un solo camino.
//
//   ① Landing: el vídeo (una única VSL) y UN botón, repetido.
//   ② Autodiagnóstico: a pantalla completa, una pregunta por pantalla.
//   ③ La lectura: su resultado y un único siguiente paso.
//
// Reglas del embudo (no romperlas al añadir cosas):
// · Lo primero que se ve tiene que bastar para convertir: titular, vídeo y
//   botón caben sin hacer scroll. Lo de debajo solo resuelve dudas.
// · Un único botón en toda la landing (CTA). Nada de «ver vídeo» + «hacer el
//   autodiagnóstico»: el vídeo ya está delante.
// · Sin menú en la cabecera y sin enlaces en el pie: nada que saque a la
//   persona del camino. La política de privacidad se enlaza donde la ley la
//   pide, en la casilla de consentimiento del formulario.
//
// El autodiagnóstico (./elena/Autodiagnostico.jsx) envía el lead al CRM de
// Elena en HELM (pipeline «Funnel 1»). Textos en ./elena/contenido.js;
// preguntas y ramas en ./elena/diagnostico.js.

const IMG = '/elena'
const ANIO = new Date().getFullYear()
// El autodiagnóstico tiene su propia dirección: sirve para enlazarlo directo
// (correos, Skool) y para que «atrás» en el navegador vuelva a la landing.
const HASH = '#autodiagnostico'
const enQuiz = () => window.location.hash === HASH

// Aparición suave de los bloques marcados con data-ap al entrar en pantalla.
function useAparecer(ref) {
  useEffect(() => {
    const raiz = ref.current
    if (!raiz) return undefined
    const els = raiz.querySelectorAll('[data-ap]')
    const sinMovimiento = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (!('IntersectionObserver' in window) || sinMovimiento) {
      els.forEach((el) => el.classList.add('is-in'))
      return undefined
    }
    raiz.classList.add('ef-anima')
    const io = new IntersectionObserver((entradas) => {
      entradas.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target) }
      })
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.06 })
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [ref])
}

// El vídeo: archivo propio con los controles del navegador (sin enlaces de
// salida). Hasta que se le da al play se ve el póster con un botón grande.
function Video({ refVideo }) {
  const [empezado, setEmpezado] = useState(false)

  if (VIDEO_SRC) {
    return (
      <div className="ef-video">
        <video
          ref={refVideo}
          src={VIDEO_SRC}
          poster={VIDEO_POSTER}
          controls={empezado}
          playsInline
          preload="metadata"
          onPlay={() => setEmpezado(true)}
        />
        {empezado ? null : (
          <button
            type="button"
            className="ef-video__poster"
            onClick={() => refVideo.current?.play()}
            aria-label="Reproducir el vídeo de Elena Fontecha"
          >
            <span className="ef-video__play"><IcoPlay /></span>
            <span className="ef-video__dur">{VIDEO_MINUTOS} min</span>
          </button>
        )}
      </div>
    )
  }

  const src = VIDEO_EMBED ? `${VIDEO_EMBED}${VIDEO_EMBED.includes('?') ? '&' : '?'}autoplay=1&rel=0` : ''
  return (
    <div className="ef-video">
      {empezado && src ? (
        <iframe
          src={src}
          title="Elena Fontecha"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          className={`ef-video__poster${VIDEO_EMBED ? '' : ' is-pronto'}`}
          onClick={() => VIDEO_EMBED && setEmpezado(true)}
          aria-label={VIDEO_EMBED ? 'Reproducir el vídeo de Elena Fontecha' : 'El vídeo de Elena Fontecha estará disponible muy pronto'}
        >
          <img src={`${IMG}/arco-16x9.webp`} alt="" width="1600" height="900" />
          <span className="ef-video__velo" />
          <span className="ef-video__play"><IcoPlay /></span>
          {VIDEO_EMBED ? null : <span className="ef-video__rotulo"><span className="ef-tag">El vídeo, muy pronto</span></span>}
        </button>
      )}
    </div>
  )
}

// El único botón de la landing, con su línea de debajo.
function Cta({ onClick, claro = false }) {
  return (
    <div className="ef-cta">
      <button type="button" className={`ef-btn ef-btn--xl${claro ? ' ef-btn--claro' : ''}`} onClick={onClick}>
        {CTA} <IcoFlecha />
      </button>
      <p className="ef-cta__bajo">{CTA_BAJO}</p>
    </div>
  )
}

export default function ElenaValor() {
  const raiz = useRef(null)
  const video = useRef(null)
  const [quiz, setQuiz] = useState(enQuiz) // false = landing · true = autodiagnóstico
  const [pasadoHero, setPasadoHero] = useState(false)

  useAparecer(raiz)

  useEffect(() => {
    const tituloAntes = document.title
    document.title = 'Elena Fontecha · Desarrollo personal y liderazgo, integrados'
    return () => { document.title = tituloAntes }
  }, [])

  // «Atrás» y «adelante» del navegador cambian entre landing y autodiagnóstico.
  useEffect(() => {
    const alCambiar = () => setQuiz(enQuiz())
    window.addEventListener('popstate', alCambiar)
    window.addEventListener('hashchange', alCambiar)
    return () => {
      window.removeEventListener('popstate', alCambiar)
      window.removeEventListener('hashchange', alCambiar)
    }
  }, [])

  // Al cambiar de pantalla se empieza arriba (no en la carga: ahí manda el navegador).
  const primera = useRef(true)
  useEffect(() => {
    if (primera.current) { primera.current = false; return }
    window.scrollTo(0, 0)
  }, [quiz])

  // La barra fija de móvil no duplica el botón del hero: sale al pasarlo.
  useEffect(() => {
    const alScroll = () => setPasadoHero(window.scrollY > window.innerHeight * 0.7)
    alScroll()
    window.addEventListener('scroll', alScroll, { passive: true })
    return () => window.removeEventListener('scroll', alScroll)
  }, [])

  // Si al autodiagnóstico se ha llegado pulsando el botón, «atrás» deshace ese
  // paso; si se entró directo por su enlace, se cambia la dirección sin salir.
  const empujado = useRef(false)

  function empezar() {
    video.current?.pause()
    if (!enQuiz()) { window.history.pushState(null, '', HASH); empujado.current = true }
    setQuiz(true)
  }

  // «Atrás» en la primera pregunta: de vuelta a la landing (y al vídeo).
  function volver() {
    if (empujado.current) { empujado.current = false; window.history.back(); return }
    window.history.replaceState(null, '', window.location.pathname + window.location.search)
    setQuiz(false)
  }

  return (
    <div className="ef-root" ref={raiz}>
      {/* Cabecera: solo el nombre. Sin menú ni botones. */}
      <header className="ef-top">
        <div className="ef-wrap">
          <span className="ef-wordmark">Elena Fontecha</span>
        </div>
      </header>

      {/* ── ① Landing ────────────────────────────────────────────────── */}
      <div hidden={quiz}>
        {/* Lo que se ve sin hacer scroll: titular, vídeo y el botón. */}
        <section className="ef-vsl">
          <div className="ef-wrap ef-vsl__in">
            <p className="ef-vsl__pre">Para quien funciona bien y quiere revisar el rumbo</p>
            <h1 className="ef-vsl__h1">
              Acompaño a personas y equipos a decidir qué quieren conseguir <em>y a encontrar su manera de hacerlo.</em>
            </h1>
            <p className="ef-vsl__sub">
              <span className="ef-vsl__sub-largo">
                Se puede construir una trayectoria sólida sin detenerse a comprobar si seguimos
                queriendo lo que construimos.{' '}
              </span>
              Mira el vídeo y haz el autodiagnóstico.
            </p>
            <div className="ef-vsl__video"><Video refVideo={video} /></div>
            <Cta onClick={empezar} />
            <p className="ef-vsl__cred">
              <strong>Elena Fontecha.</strong> +25 años de trayectoria directiva. Ex Directora General
              Adjunta Ejecutiva y Secretaria del Consejo de Administración de PortAventura.
            </p>
          </div>
        </section>

        <div className="ef-franja" aria-label="Trayectoria">
          <div className="ef-wrap ef-franja__in">
            <span className="ef-franja__k">Trayectoria</span>
            {TRAYECTORIA.map((t) => <span key={t} className="ef-franja__v">{t}</span>)}
          </div>
        </div>

        {/* Bloque 1 · Qué te llevas */}
        <section className="ef-section">
          <div className="ef-wrap">
            <div className="ef-centro" data-ap>
              <p className="ef-eyebrow">Qué te llevas</p>
              <h2 className="ef-h2">Tu lectura, <em>en unos cinco minutos.</em></h2>
            </div>
            <ol className="ef-pasos" data-ap>
              {TE_LLEVAS.map(([t, d], i) => (
                <li key={t}>
                  <span className="ef-pasos__n">{dos(i + 1)}</span>
                  <p className="ef-pasos__t">{t}</p>
                  <p className="ef-pasos__d">{d}</p>
                </li>
              ))}
            </ol>
            <Cta onClick={empezar} />
          </div>
        </section>

        {/* Bloque 2 · Quién acompaña (la prueba) */}
        <section className="ef-section ef-section--crema">
          <div className="ef-wrap ef-autor">
            <figure className="ef-autor__foto" data-ap>
              <img src={`${IMG}/de-pie-4x5.webp`} alt="Elena Fontecha" loading="lazy" width="720" height="900" />
              <figcaption className="ef-autor__pie"><span className="ef-tag">Coach, mentora y senior advisor</span></figcaption>
            </figure>
            <div className="ef-autor__txt" data-ap>
              <p className="ef-eyebrow">Quién acompaña</p>
              <h2 className="ef-h2">Elena <em>Fontecha</em></h2>
              <p className="ef-p">
                Durante más de 25 años he dirigido equipos y liderado cambios. Fui Directora General
                Adjunta Ejecutiva y Secretaria del Consejo de Administración de PortAventura, diseñé el
                área de Gestión Patrimonial de Servihabitat y de Haya Real Estate, y fundé Elara
                Asociados.
              </p>
              <blockquote className="ef-quote">«En la vida corporativa no hace falta sufrir tanto.»</blockquote>
              <div className="ef-cifras">
                {CIFRAS.map((c) => (
                  <div key={c.t} className="ef-cifra">
                    <span className="ef-cifra__n">{c.n}</span>
                    <span className="ef-cifra__t">{c.t}</span>
                  </div>
                ))}
              </div>
              <Cta onClick={empezar} />
            </div>
          </div>
        </section>

        {/* Bloque 3 · Para quién es */}
        <section className="ef-section">
          <div className="ef-wrap ef-split">
            <div className="ef-split__a" data-ap>
              <p className="ef-eyebrow">Para quién es</p>
              <h2 className="ef-h2">Para quien funciona bien y, aun así, <em>quiere revisar el rumbo.</em></h2>
              <p className="ef-p">
                No hace falta estar en crisis. Este trabajo sirve tanto para confirmar lo que quieres
                conservar como para abrir cambios pequeños o profundos.
              </p>
            </div>
            <div className="ef-split__b" data-ap>
              <ul className="ef-check">
                {PARA_TI.map((t) => (
                  <li key={t}><span className="ef-check__i"><IcoCheck /></span><span>{t}</span></li>
                ))}
              </ul>
              <div className="ef-nop">
                <p className="ef-mini">No es para ti si…</p>
                <ul>{NO_ES_PARA_TI.map((t) => <li key={t}>{t}</li>)}</ul>
              </div>
            </div>
          </div>
        </section>

        {/* Cierre: la pregunta y, otra vez, el mismo botón */}
        <section className="ef-final">
          <div className="ef-wrap ef-centro" data-ap>
            <p className="ef-final__q">«{PREGUNTA_GANCHO}»</p>
            <Cta onClick={empezar} claro />
          </div>
        </section>

        {/* Barra fija en móvil: el mismo botón, siempre a mano al bajar */}
        <div className={`ef-fija${pasadoHero ? '' : ' is-oculta'}`}>
          <button type="button" className="ef-btn ef-btn--full" onClick={empezar}>
            {CTA} <IcoFlecha />
          </button>
        </div>
      </div>

      {/* ── ② Autodiagnóstico y ③ la lectura ─────────────────────────── */}
      {/* Montado siempre: si vuelve al vídeo, no pierde lo respondido. */}
      <main className="ef-quiz" hidden={!quiz}>
        <div className="ef-wrap ef-quiz__in">
          <Autodiagnostico onSalir={volver} />
        </div>
      </main>

      {/* Pie: sin enlaces. */}
      <footer className="ef-pie">
        <div className="ef-wrap">© {ANIO} Elena Fontecha · Desarrollo personal y liderazgo</div>
      </footer>
    </div>
  )
}
