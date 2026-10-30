import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// base relativa: funciona em qualquer caminho do GitHub Pages (usuario.github.io/nome-do-repo/)
export default defineConfig({
  base: './',
  plugins: [vue(), tailwindcss()],
})
