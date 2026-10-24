# Portafolio de Brian Chaparro

Sitio estático con Astro 7 y Tailwind CSS 4. El formulario de contacto usa un
servidor Express 5 con Nodemailer.

## Requisitos

- Node.js 22.23.4 o superior (validado con Node.js 24.15.0).
- pnpm 10.34.8, indicado en `packageManager` de ambos `package.json`.

## Desarrollo

```sh
pnpm install --frozen-lockfile
pnpm dev
```

El sitio se sirve en `http://localhost:4321`.

Para ejecutar el servidor de contacto:

```sh
pnpm --dir server install --frozen-lockfile
pnpm --dir server start
```

Configurar `EMAIL_USER` y `EMAIL_PASS` en `server/.env`; `PORT` es opcional y
por defecto vale `3000`. El frontend envía el formulario a `/contact` en el
mismo origen. En producción, `vercel.json` dirige esa ruta al servidor; durante
el desarrollo con ambos procesos, se necesita un proxy equivalente para probar
el formulario desde el navegador.

## Validación

```sh
pnpm build
pnpm preview
pnpm audit
pnpm --dir server audit
```

`pnpm build` comprueba los tipos con `astro check` y genera el sitio en `dist/`.

## Dependencias

Todos los rangos de dependencias conservan `^`. Los dos archivos
`pnpm-lock.yaml` fijan las versiones resueltas para instalaciones reproducibles.
Se mantiene TypeScript 6 porque `@astrojs/check` 0.9.12 admite TypeScript 5 y 6,
pero todavía no TypeScript 7.

Tailwind usa `@tailwindcss/vite` y `src/styles/global.css`, siguiendo la
[integración de Astro](https://docs.astro.build/en/guides/styling/#tailwind).
Las clases y las animaciones afectadas se adaptaron según la
[guía de migración a Tailwind 4](https://tailwindcss.com/docs/upgrade-guide).
Tailwind 4 requiere Safari 16.4+, Chrome 111+ o Firefox 128+.

Para actualizar dentro de los rangos declarados y refrescar también las
dependencias transitivas:

```sh
pnpm update --depth Infinity
pnpm --dir server update --depth Infinity
```
