import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Las páginas de la web: la landing VSL (/), la de la formación gratis
// (/formacion-gratis/) y las tres legales (/legales/…), que son HTML sin JavaScript.
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        formacion: resolve(__dirname, 'formacion-gratis/index.html'),
        privacidad: resolve(__dirname, 'legales/politica-privacidad/index.html'),
        avisoLegal: resolve(__dirname, 'legales/aviso-legal/index.html'),
        cookies: resolve(__dirname, 'legales/politica-cookies/index.html'),
      },
    },
  },
})
