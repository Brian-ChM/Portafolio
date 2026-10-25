import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

const contactProxy = {
  "/contact": {
    target: process.env.CONTACT_API_URL || "http://127.0.0.1:3000",
    changeOrigin: true,
  },
};

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    server: { proxy: contactProxy },
    preview: { proxy: contactProxy },
  },
});
