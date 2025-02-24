import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sitemap from "vite-plugin-sitemap";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: "https://saiteja.site", 
      dynamicRoutes: ["/mines", "/sms",], 
    }),
  ],
  server:{
    proxy:{
      "/api":{
        target:"http://localhost:5000",
        changeOrigin:true,
        rewrite:(path)=>path.replace(/^\/api/,"")
      },
      "/ws":{
        target:"ws://localhost:5000",
        ws:true,
        changeOrigin:true
      }
    },
    allowedHosts:["saiteja.site"]
  }
})
