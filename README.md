# Elena Fontecha · web con VSL y autodiagnóstico

Landing de **Elena Fontecha** (desarrollo personal y liderazgo, integrados).

- Arriba, su pregunta central y el vídeo (VSL).
- Debajo, un **autodiagnóstico ramificado** que capta el lead, le da una lectura personalizada y le lleva a reservar la **primera conversación gratuita** en su Calendly.

Agencia Silvestre AI · CRM en HELM.

## Arrancar

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # dist/ (sitio estático)
```

Es una web estática (Vite + React): se despliega tal cual en Vercel, sin variables secretas.

## Qué se edita y dónde

| Quiero cambiar… | Archivo |
|---|---|
| Textos de la página, enlaces, Calendly, WhatsApp, **el vídeo** (`VIDEO_EMBED`) | `src/elena/contenido.js` |
| Preguntas, ramas y clasificación del autodiagnóstico | `src/elena/diagnostico.js` |
| Estructura de la página | `src/ElenaValor.jsx` |
| El asistente y las lecturas finales | `src/elena/Autodiagnostico.jsx` |
| Estilos (burdeos `#4F1828`, Montserrat) | `src/elena/elena.css` |
| Fotos | `public/elena/` |
| Imagen al compartir y dominio | `public/og.jpg` y `VITE_SITE_URL` en `.env` |

**Marca de Elena:** burdeos `#4F1828`, Montserrat, fondo blanco y tono editorial anti-autoayuda.

**Palabras prohibidas**, que no deben aparecer nunca: transformación, empoderamiento, potencial, reinvención, mejor versión, despertar, difuso, «por inercia», «ha dejado de elegir» y «herramientas» como etiqueta. Tampoco se usan testimonios hasta tener su permiso.

## Cómo llega el lead al CRM

El autodiagnóstico envía un `POST` a `https://helm.s4sf.net/api/formularios` con `{ slug: 'elenafontecha', form, nombre, email, telefono, empresa?, respuestas, meta }`. La primera pregunta decide el formulario:

| Rama | `form` | Embudo / etapa en HELM |
|---|---|---|
| «Para mí» | `valor` | Captación (leads) / Lead (autodiagnóstico) |
| «Para mi equipo o mi empresa» | `valor-empresa` | Empresas y equipos / Contacto |

Cada lead llega con su **perfil** calculado:

- **Personas:** Rodri, Laura en momento silencioso o de impacto, o alta dirección.
- **Empresas:** su perfil de empresa.

Además llega la estación de entrada (personas) o la recomendación (empresas), y marcas como «energía al límite».

El envío va como `text/plain` a propósito. Así es una petición simple y no dispara la comprobación CORS previa, que el servidor de HELM no contesta para dominios de fuera. La API lo lee como JSON igualmente.

### Regla: preguntas y CRM van juntos

La API **descarta cualquier respuesta cuya clave no esté declarada** en el formulario de HELM. Si cambias una clave o una opción en `diagnostico.js`:

1. `npm run formularios`. Regenera `helm/helm_formulario_valor_elenafontecha.sql` desde `diagnostico.js`.
2. Aplícalo en HELM: con `node scripts/gen-form-valor-elena.mjs --json` y el runner de supabase del minipc, o pidiéndoselo a Alex.

Los dos formularios **ya están creados en producción** con las preguntas actuales.

## Pendiente

- Pegar el vídeo en `VIDEO_EMBED`. Mientras esté vacío, sale su foto con «El vídeo, muy pronto».
- Ajustar `VITE_SITE_URL` al dominio definitivo.
