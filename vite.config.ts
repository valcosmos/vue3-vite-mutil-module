import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { join, resolve } from 'path'
import { readdirSync } from 'fs'

const project_pages = {}
const entryPath = resolve(__dirname, './src/modules')
const entrys = readdirSync(entryPath).reduce((obj, dirname) => {
  obj[dirname] = join(entryPath, dirname)
  return obj
}, {})

Object.keys(entrys).forEach((pageName) => {
  project_pages[pageName] = resolve(__dirname, `src/modules/${pageName}/index.html`)
})

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  let pages = {}
  const env = loadEnv(mode, process.cwd())
  const isDev = mode === 'development'

  console.log(env.VITE_APP_MODULE)
  

  if (isDev) {
    pages = { ...project_pages }
  } else {
    if (env.VITE_APP_MODULE) {
      pages[env.VITE_APP_MODULE] = project_pages[env.VITE_APP_MODULE]
    } else {
      pages = { ...project_pages }
    }
  }

  console.log(pages)

  return {
    root: env.VITE_APP_ROOTPATH,
    build: {
      rollupOptions: {
        input: pages,
        output: { dir: './dist' }
      }
    },
    plugins: [vue()]
  }
})
