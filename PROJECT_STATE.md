# PROJECT_STATE — Wini-s-dungeon-3d

## Versión actual

Wini-s-dungeon-3d vPreliminar

## Hito implementado

Hito 1 — Proyecto arranca

## Estado

Cerrado.

## Qué funciona

- Existe estructura mínima separada de cliente y servidor.
- Desde la raíz, `npm install` instala el workspace del cliente, el workspace del servidor y las dependencias de desarrollo raíz.
- Desde la raíz, `npm run dev` levanta cliente y servidor en paralelo.
- El cliente muestra el texto exacto `Wini-s-dungeon-3d vPreliminar`.
- El servidor HTTP mínimo arranca y muestra en consola `Server running on http://localhost:3000`.

## Cómo probar

Desde la raíz del repositorio:

```bash
npm install
npm run dev
```

Verificar:

1. La instalación termina sin errores.
2. El servidor informa en consola que está corriendo en `http://localhost:3000`.
3. El cliente informa la URL de Vite, por defecto `http://localhost:5173`.
4. Al abrir el cliente se ve `Wini-s-dungeon-3d vPreliminar`.

## Archivos relevantes

- `package.json`
- `client/package.json`
- `client/index.html`
- `client/src/main.js`
- `server/package.json`
- `server/src/index.js`

## Pendientes / limitaciones

- No hay sockets.
- No hay login real.
- No hay guest.
- No hay multiplayer.
- No hay Three.js.
- No hay mundo servidor.
- No hay gameplay.

## Próximo hito sugerido

Hito 2 — Pantalla de entrada guest.
