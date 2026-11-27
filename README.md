# Elena Fontecha · web con VSL y autodiagnóstico

Embudo de **Elena Fontecha** (desarrollo personal y liderazgo, integrados). Un solo camino:

1. **Landing:** titular, el vídeo (una única VSL) y **un botón**, «Hacer el autodiagnóstico», repetido debajo de cada bloque.
2. **Autodiagnóstico:** a pantalla completa, una pregunta por pantalla (dirección propia: `/#autodiagnostico`). Capta el lead.
3. **La lectura:** su resultado y **un único siguiente paso**. Para una persona, entrar en la comunidad gratuita (Skool); para un equipo o una empresa, reservar la primera conversación, con su Calendly dentro de la página.

### Reglas del embudo

No romperlas al añadir cosas:

- **Lo primero que se ve tiene que bastar para convertir.** Titular, vídeo y botón caben sin hacer scroll, en móvil y en escritorio. Lo de debajo solo resuelve dudas.
- **Un único botón.** Nada de «ver vídeo» + «hacer el autodiagnóstico»: el vídeo ya está delante. Tras la lectura, también un solo paso.
- **Sin menú en la cabecera y sin enlaces en el pie.** Nada que saque a la persona del camino: ni redes, ni web, ni secciones. La política de privacidad se enlaza donde la ley la pide, en la casilla de consentimiento del formulario.
- **Un solo vídeo.** El embudo no lleva más VSL en los pasos siguientes.

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
| Textos de la página, el botón (`CTA`), Calendly, Skool, **el vídeo** (`VIDEO_SRC`) | `src/elena/contenido.js` |
| El siguiente paso tras la lectura, por rama (`SIGUIENTE_PASO`) | `src/elena/contenido.js` |
| Preguntas, ramas y clasificación del autodiagnóstico | `src/elena/diagnostico.js` |
| Estructura de la página | `src/ElenaValor.jsx` |
| El Método CENTRO (letras, textos) y su rueda (hoy solo en la formación gratis) | `src/elena/contenido.js` (`CENTRO`) y `src/elena/Rueda.jsx` |
| Landing de la formación gratis (`/formacion-gratis/`, lleva a Skool al enviar) | `src/FormacionGratis.jsx` y `formacion-gratis/index.html` |
| El asistente, la lectura y la agenda | `src/elena/Autodiagnostico.jsx` (textos de las lecturas en `diagnostico.js`) |
| Estilos (burdeos `#4F1828`, Montserrat) | `src/elena/elena.css` |
| Fotos | `public/elena/` |
| El vídeo y su póster | `public/video/` |
| Imagen al compartir y dominio | `public/og.jpg` y `VITE_SITE_URL` en `.env` |

**Marca de Elena:** burdeos `#4F1828`, Montserrat, fondo blanco y tono editorial anti-autoayuda.

**Palabras prohibidas**, que no deben aparecer nunca: transformación, empoderamiento, potencial, reinvención, mejor versión, despertar, difuso, «por inercia», «ha dejado de elegir» y «herramientas» como etiqueta. Tampoco se usan testimonios hasta tener su permiso.

## El vídeo

Va alojado en la propia web: `public/video/vsl-elena.mp4` (720p, unos 46 MB) con su póster `vsl-elena-poster.jpg`. Se reproduce con los controles del navegador, sin enlaces de salida ni vídeos recomendados.

Para cambiarlo, comprime el nuevo y sustituye los dos archivos (GitHub no admite archivos de más de 100 MB y avisa a partir de 50):

```bash
ffmpeg -i original.mp4 -vf scale=1280:720 -c:v libx264 -preset slow -crf 26 -g 60 -pix_fmt yuv420p \
  -c:a aac -b:a 96k -movflags +faststart public/video/vsl-elena.mp4
ffmpeg -ss 2 -i original.mp4 -frames:v 1 -vf scale=1280:720 -q:v 7 public/video/vsl-elena-poster.jpg
```

Si el tráfico crece, conviene pasarlo a un alojamiento de vídeo (Wistia, donde ya están las clases gratuitas): se deja `VIDEO_SRC` vacío y se pega su dirección `/embed/…` en `VIDEO_EMBED`.

## Cómo llega el lead al CRM

El autodiagnóstico envía un `POST` a `https://helm.s4sf.net/api/formularios` con `{ slug: 'elenafontecha', form, nombre, email, telefono, empresa?, respuestas, meta }`. La primera pregunta decide el formulario:

| Rama | `form` | Embudo / etapa en HELM |
|---|---|---|
| «Para mí» | `valor` | Funnel 1 / Lead · persona |
| «Para mi equipo o mi empresa» | `valor-empresa` | Funnel 1 / Lead · empresa |

Etapas de «Funnel 1»: Lead · persona · Lead · empresa → En nutrición → Conversación reservada → Propuesta → Cliente / Descartado.

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

- Ajustar `VITE_SITE_URL` al dominio definitivo.
- Medición: no hay píxel. Al ponerlo, los eventos van en la carga (vista), el envío del autodiagnóstico (lead) y la reserva en Calendly (`calendly.event_scheduled`, que ya se escucha en `Autodiagnostico.jsx`).
