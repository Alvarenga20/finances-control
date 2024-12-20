import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Set base path if deploying to a subdirectory
    // base: '/your-subdirectory/',

    // Output chunking and manual chunking for better optimization
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Split large dependencies into their own chunks
          if (id.includes('node_modules/react')) {
            return 'react';
          }
          if (id.includes('node_modules/lodash')) {
            return 'lodash';
          }
        },
      },
    },
    // Optional: Set a higher chunk size warning limit if you don't want to worry about 500kB warnings
    chunkSizeWarningLimit: 1000, // Set this to 1000 kB, for example
  },
})