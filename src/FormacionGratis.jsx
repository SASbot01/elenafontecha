import { useEffect, useRef, useState } from 'react'
import './elena/elena.css'
import { REDES, PRIVACIDAD, SKOOL_ABOUT, CENTRO } from './elena/contenido'
import Autodiagnostico from './elena/Autodiagnostico.jsx'
import Rueda from './elena/Rueda.jsx'
import { dos, ir, IcoFlecha } from './elena/comun.jsx'

// Landing de la formación gratuita de Elena (/formacion-gratis/).
//
// Habla del lead magnet: las dos clases gratuitas «Si no decides tú, decide tu
// rutina», los cuadernos de trabajo del Método CENTRO y la comunidad de Skool.
// Lleva el mismo autodiagnóstico que la home (mismo formulario de HELM, con
// origen «Landing formación gratis»), pero al enviarlo no enseña la lectura:
// lleva a la página «acerca de» de la comunidad en Skool (SKOOL_ABOUT).

const IMG = '/elena'
const ANIO = new Date().getFullYear()

const INCLUYE = [
  ['Clase 1 · El qué y el para qué', 'Qué quieres conservar, qué quieres cambiar y qué valor hay detrás. Con pausas para escribir. 47 minutos.'],
  ['Clase 2 · El cómo', 'Lo que te dices cuando lo piensas, el miedo y la zona de confort, y una acción concreta con fecha. 38 minutos.'],
  ['Cuadernos de trabajo', 'Once recursos descargables de Elena, ordenados por las letras del Método CENTRO.'],
  ['La comunidad', 'Las Seis Estaciones, en Skool: un sitio para seguir trabajando con Elena y con personas en tu mismo momento.'],
]

// Qué pasos del Método CENTRO recorre cada clase.
const RECORRE = [
  { clase: 'Clase 1', letras: [0, 1], txt: 'Mirar de frente lo que hoy ocupa tu vida y elegir qué conservar y qué cambiar, sabiendo para qué.' },
  { clase: 'Clase 2', letras: [3, 4], txt: 'Revisar lo que te frena y convertir lo elegido en un primer paso proporcionado, con fecha y con apoyos.' },
]

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

export default function FormacionGratis() {
  const raiz = useRef(null)
  const [activa, setActiva] = useState(0)
  const [conSombra, setConSombra] = useState(false)
  useAparecer(raiz)

  useEffect(() => {
    const alScroll = () => setConSombra(window.scrollY > 8)
    alScroll()
    window.addEventListener('scroll', alScroll, { passive: true })
    return () => window.removeEventListener('scroll', alScroll)
  }, [])

  const e = CENTRO[activa]

  return (
    <div className="ef-root" ref={raiz}>
      <header className={`ef-header${conSombra ? ' is-sombra' : ''}`}>
        <div className="ef-wrap ef-header__in">
          <a className="ef-wordmark" href="/">Elena Fontecha</a>
          <button type="button" className="ef-btn ef-btn--sm" onClick={() => ir('acceso')}>Acceder gratis</button>
        </div>
      </header>

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="ef-hero">
        <div className="ef-wrap ef-hero__grid">
          <div className="ef-hero__txt">
            <p className="ef-eyebrow">Formación gratuita · Método CENTRO</p>
            <h1 className="ef-h1">Si no decides tú, <em>decide tu rutina.</em></h1>
            <p className="ef-lead">
              Dos clases gratuitas con Elena Fontecha para revisar qué quieres conservar, qué
              quieres vivir de otra manera y cómo dar el primer paso. Revisar tu vida no
              significa que tengas que cambiarla: a veces confirmas, a veces ajustas una parte.
            </p>
            <div className="ef-hero__ctas">
              <button type="button" className="ef-btn" onClick={() => ir('acceso')}>
                Quiero acceder gratis <IcoFlecha />
              </button>
            </div>
            <p className="ef-hero__cred">
              <strong>Con papel y bolígrafo, a tu ritmo.</strong> Las clases tienen pausas para
              escribir y una hoja de trabajo para guardar lo que descubras.
            </p>
          </div>
          <figure className="ef-hero__foto">
            <span className="ef-hero__bloque" aria-hidden="true" />
            <img src={`${IMG}/retrato.webp`} alt="Elena Fontecha" width="640" height="800" fetchPriority="high" />
            <figcaption className="ef-hero__tag">
              <span className="ef-tag">Aunque nada cambie, si yo cambio, todo cambia.</span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ── Qué incluye ──────────────────────────────────────────────── */}
      <section className="ef-section ef-section--rosa">
        <div className="ef-wrap">
          <div className="ef-centro" data-ap>
            <p className="ef-eyebrow">Qué incluye</p>
            <h2 className="ef-h2">Todo gratis, <em>dentro de la comunidad de Elena.</em></h2>
          </div>
          <ol className="ef-pasos ef-pasos--4" data-ap>
            {INCLUYE.map(([t, d], i) => (
              <li key={t}>
                <span className="ef-pasos__n">{dos(i + 1)}</span>
                <p className="ef-pasos__t">{t}</p>
                <p className="ef-pasos__d">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── El Método CENTRO ─────────────────────────────────────────── */}
      <section className="ef-section" id="metodo">
        <div className="ef-wrap">
          <div className="ef-metodo__head" data-ap>
            <p className="ef-eyebrow">El método</p>
            <h2 className="ef-h2">Método <span className="ef-centro-palabra">CENTRO</span>. <em>Un ciclo con la persona en el centro.</em></h2>
            <p className="ef-p">
              <strong>C</strong>onocerse, <strong>E</strong>legir tu rumbo, <strong>N</strong>ombrar tus sistemas,{' '}
              <strong>T</strong>razar tu plan, <strong>R</strong>esolver y actuar y <strong>O</strong>bservar y ajustar.
              Las dos clases gratuitas recorren cuatro de esas letras.
            </p>
          </div>
          <div className="ef-metodo__grid">
            <div className="ef-metodo__rueda" data-ap>
              <Rueda activa={activa} setActiva={setActiva} />
              <p className="ef-metodo__hint">Pulsa una letra</p>
            </div>
            <div data-ap>
              <div className="ef-est__item is-on">
                <div className="ef-est__btn" style={{ cursor: 'default' }}>
                  <span className="ef-est__n">{e.letra}</span>
                  <span className="ef-est__t">{e.nombre}</span>
                </div>
                <div className="ef-est__body">
                  <p className="ef-est__q">«{e.pregunta}»</p>
                  <p className="ef-p ef-p--sm">{e.vida}</p>
                </div>
              </div>
              <ul className="ef-recorre">
                {RECORRE.map((r) => (
                  <li key={r.clase}>
                    <p className="ef-mini">{r.clase} · {r.letras.map((k) => CENTRO[k].letra).join(' + ')}</p>
                    <p>{r.txt}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Acceso: el mismo autodiagnóstico, que lleva a Skool ─────── */}
      <section className="ef-section ef-section--crema" id="acceso">
        <div className="ef-wrap">
          <div className="ef-centro" data-ap>
            <p className="ef-eyebrow">Acceso gratuito</p>
            <h2 className="ef-h2">Unas preguntas <em>y entras.</em></h2>
            <p className="ef-p">
              Cuéntale a Elena en qué momento estás: así las clases te llegan con contexto. Al
              terminar entrarás en la comunidad, donde están las clases y los cuadernos.
            </p>
          </div>
          <div className="ef-form-grid" style={{ marginTop: '52px' }}>
            <aside className="ef-form-aside" data-ap>
              <img src={`${IMG}/arco-4x5.webp`} alt="Elena Fontecha" loading="lazy" width="720" height="900" />
              <p className="ef-form-aside__tag"><span className="ef-tag">Este es tu momento.</span></p>
            </aside>
            <div id="diagnostico-tarjeta">
              <Autodiagnostico destino={SKOOL_ABOUT} origen="Landing formación gratis" />
            </div>
          </div>
        </div>
      </section>

      <footer className="ef-footer">
        <div className="ef-wrap ef-footer__in">
          <div>
            <a className="ef-wordmark ef-wordmark--pie" href="/">Elena Fontecha</a>
            <p className="ef-footer__tag">Desarrollo personal y liderazgo · Método CENTRO</p>
          </div>
          <nav className="ef-footer__redes" aria-label="Redes">
            {REDES.map((r) => (
              <a key={r.url} href={r.url} target="_blank" rel="noopener noreferrer">{r.nombre}</a>
            ))}
          </nav>
        </div>
        <div className="ef-wrap ef-footer__legal">
          <span>© {ANIO} Elena Fontecha</span>
          <a href={PRIVACIDAD} target="_blank" rel="noopener noreferrer">Política de privacidad</a>
        </div>
      </footer>
    </div>
  )
}
