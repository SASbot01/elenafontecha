import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Dos páginas: la landing VSL (/) y la de la formación gratis (/formacion-gratis/).
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        formacion: resolve(__dirname, 'formacion-gratis/index.html'),
      },
    },
  },
})
