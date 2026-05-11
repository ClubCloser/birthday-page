import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { port: 3000 },
  preview: { port: Number(process.env.PORT) || 4173, host: true, allowedHosts: ['all'] },
})
