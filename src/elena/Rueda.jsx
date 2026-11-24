import { CENTRO, METODO } from './contenido.js'

// La rueda del Método CENTRO: un ciclo de seis pasos con la persona en el
// centro (figura humana, como en el diagrama de Elena). Cada letra se puede
// pulsar y abre su paso en la lista de al lado.
export default function Rueda({ activa, setActiva }) {
  const C = 200
  const R = 152
  const ang = (i, d = 0) => ((-90 + i * 60 + d) * Math.PI) / 180
  const pt = (a, r = R) => [C + r * Math.cos(a), C + r * Math.sin(a)]
  const arco = (i) => {
    const [x0, y0] = pt(ang(i, 13))
    const [x1, y1] = pt(ang(i + 1, -15))
    return `M${x0.toFixed(1)} ${y0.toFixed(1)} A${R} ${R} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)}`
  }
  const tecla = (i) => (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiva(i) }
  }
  return (
    <svg viewBox="0 0 400 400" className="ef-rueda" role="group" aria-label={`${METODO}: seis pasos en ciclo alrededor de la persona`}>
      <defs>
        <marker id="ef-punta" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M1 1 L8 5 L1 9" className="ef-rueda__punta" />
        </marker>
      </defs>
      {CENTRO.map((_, i) => (
        <path key={i} d={arco(i)} className="ef-rueda__arco" markerEnd="url(#ef-punta)" />
      ))}
      <circle cx={C} cy={C} r="100" className="ef-rueda__centro" />
      <circle cx={C} cy={C} r="88" className="ef-rueda__anillo" />
      <g className="ef-rueda__figura" aria-hidden="true">
        <circle cx={C} cy={C - 46} r="14" />
        <path d={`M${C - 44} ${C - 32} Q${C - 22} ${C - 12} ${C - 9} ${C - 14} L${C - 9} ${C + 4} L${C - 30} ${C + 50} Q${C - 26} ${C + 54} ${C - 22} ${C + 50} L${C} ${C + 14} L${C + 22} ${C + 50} Q${C + 26} ${C + 54} ${C + 30} ${C + 50} L${C + 9} ${C + 4} L${C + 9} ${C - 14} Q${C + 22} ${C - 12} ${C + 44} ${C - 32} Q${C + 20} ${C - 20} ${C} ${C - 22} Q${C - 20} ${C - 20} ${C - 44} ${C - 32} Z`} />
      </g>
      <text x={C} y={C + 72} textAnchor="middle" className="ef-rueda__eyebrow">LA PERSONA</text>
      {CENTRO.map((e, i) => {
        const [x, y] = pt(ang(i))
        const on = i === activa
        return (
          <g
            key={e.nombre}
            transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})`}
            className={`ef-rueda__nodo${on ? ' is-on' : ''}`}
            role="button"
            tabIndex={0}
            aria-pressed={on}
            aria-label={`${e.letra} · ${e.nombre}`}
            onClick={() => setActiva(i)}
            onKeyDown={tecla(i)}
          >
            <circle r="27" />
            <text textAnchor="middle" dy="7" className="ef-rueda__letra">{e.letra}</text>
          </g>
        )
      })}
    </svg>
  )
}
