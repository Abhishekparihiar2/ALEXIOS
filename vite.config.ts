import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// Stub plugin: @vitejs/plugin-react injects a React Refresh preamble that
// tries to dynamically import '/@react-refresh'. Figma Make's proxy cannot
// serve that virtual module, causing a "Failed to fetch dynamically imported
// module" error. Stubbing it out lets the import succeed without side-effects.
const reactRefreshStub = {
  name: 'react-refresh-stub',
  resolveId(id: string) {
    if (id === '/@react-refresh' || id === '@react-refresh') {
      return '\0react-refresh-stub';
    }
  },
  load(id: string) {
    if (id === '\0react-refresh-stub') {
      return 'export default { injectIntoGlobalHook: () => {}, register: () => {}, signature: () => (t) => t }';
    }
  },
};


function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

export default defineConfig({
  plugins: [
    figmaAssetResolver(),
    reactRefreshStub,
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
