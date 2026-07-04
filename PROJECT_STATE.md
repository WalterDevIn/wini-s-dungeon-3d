# PROJECT_STATE — Wini-s-dungeon-3d

## Versión actual

Wini-s-dungeon-3d vPreliminar

## Hito implementado

Hito 3 — Conexión cliente-servidor

## Estado

Cerrado.

## Qué funciona

- Existe estructura mínima separada de cliente y servidor.
- Desde la raíz, `npm install` instala el workspace del cliente, el workspace del servidor y las dependencias del proyecto.
- Desde la raíz, `npm run dev` levanta cliente y servidor en paralelo.
- El servidor HTTP mínimo arranca y muestra en consola `Server running on http://localhost:3000`.
- El servidor Socket.IO queda adjunto al servidor HTTP.
- Al abrir el cliente, el cliente intenta conectarse al servidor Socket.IO.
- Cuando el cliente conecta, el servidor crea un `sessionId`.
- El servidor responde el evento `SESSION_CREATED`.
- El cliente muestra `Conectado como sesión <sessionId>`.
- El servidor registra en consola una conexión nueva con `Client connected: <sessionId>`.
- La pantalla de entrada guest local del Hito 2 sigue existiendo.

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
5. El cliente muestra inicialmente `Conectando con servidor...`.
6. Luego muestra `Conectado como sesión <sessionId>`.
7. En la consola del servidor aparece `Client connected: <sessionId>`.
8. El botón `Entrar como guest` sigue respondiendo localmente, sin crear guest real en servidor.

## Archivos relevantes

- `package.json`
- `client/package.json`
- `client/index.html`
- `client/src/main.js`
- `client/src/screens/menuScreen.js`
- `client/src/ui/screenRouter.js`
- `client/src/net/socketClient.js`
- `server/package.json`
- `server/src/index.js`
- `server/src/net/protocol.js`
- `server/src/net/socketServer.js`

## Pendientes / limitaciones

- No hay login real.
- No hay guest real del servidor.
- No hay personaje.
- No hay mundo servidor.
- No hay snapshots.
- No hay multiplayer visible entre pestañas.
- No hay Three.js.
- No hay gameplay.

## Próximo hito sugerido

Hito 4 — Guest real + personaje default.
