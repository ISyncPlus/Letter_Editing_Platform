import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  optimizeDeps: {
    include: [
      'pako',
      'pako/lib/zlib/inflate.js',
      'pako/lib/zlib/deflate.js',
      'pako/lib/zlib/zstream.js',
      'pako/lib/zlib/constants.js'
    ]
  },
  resolve: {
    alias: {
      // Ensure pako subpaths resolve predictably for react-pdf
      'pako/lib/zlib/inflate.js': 'pako/lib/zlib/inflate.js',
      'pako/lib/zlib/deflate.js': 'pako/lib/zlib/deflate.js',
      'pako/lib/zlib/zstream.js': 'pako/lib/zlib/zstream.js',
      'pako/lib/zlib/constants.js': 'pako/lib/zlib/constants.js'
    }
  }
})
