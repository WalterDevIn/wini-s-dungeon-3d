# PROJECT_STATE — Wini-s-dungeon-3d

## Versión actual

Wini-s-dungeon-3d vPreliminar

## Hito implementado

Hito 4 — Guest real + personaje default

## Estado

Cerrado con fix de botón guest.

## Fix aplicado

- `client/src/main.js` ya pasaba `onEnterAsGuest(displayName)` a `createMenuScreen`.
- `client/src/screens/menuScreen.js` no estaba recibiendo ni llamando ese callback, por lo que el botón podía volver a comportarse como mensaje local.
- Se corrigió `client/src/screens/menuScreen.js` para recibir `{ onEnterAsGuest }`.
- Al apretar `Entrar como guest`, la pantalla ahora llama `onEnterAsGuest(nameInput.value)`.
- El cliente envía el texto crudo al servidor; si está vacío o contiene solo espacios, la normalización a `Guest` queda en `server/src/auth/accountService.js`.
- El botón queda deshabilitado hasta recibir `SESSION_CREATED`, evitando intentos antes de que exista sesión conectada.

## Qué funciona

- Existe estructura mínima separada de cliente y servidor.
- Desde la raíz, `npm install` instala el workspace del cliente, el workspace del servidor y las dependencias del proyecto.
- Desde la raíz, `npm run dev` levanta cliente y servidor en paralelo.
- El Hito 3 sigue funcionando: el cliente se conecta al servidor y recibe `SESSION_CREATED`.
- El cliente muestra `Conectado como sesión <sessionId>`.
- Al apretar `Entrar como guest`, el cliente envía `ENTER_AS_GUEST` al servidor con el nombre escrito.
- El servidor recibe `ENTER_AS_GUEST`.
- El servidor normaliza nombres vacíos o con espacios a `Guest`.
- El servidor crea una account en memoria con `type: "guest"` y `displayName` normalizado.
- El servidor asocia la account guest a la sesión en memoria.
- El servidor crea o recupera un personaje default asociado a esa account.
- El servidor emite `GUEST_READY` con `{ account }`.
- El servidor emite `CHARACTER_READY` con `{ character }`.
- El cliente renderiza la pantalla de personaje usando el payload recibido por `CHARACTER_READY`.
- El cliente muestra `Personaje listo`.
- El cliente muestra `Humano Guerrero`.

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
5. El cliente muestra `Conectado como sesión <sessionId>`.
6. Escribir `Walter` en el input.
7. Apretar `Entrar como guest`.
8. En consola del servidor aparece `ENTER_AS_GUEST received: <sessionId>`.
9. En consola del servidor aparece `Guest account created: <accountId> (Walter)`.
10. En consola del servidor aparece `Default character ready: <characterId> (Walter)`.
11. El cliente muestra `Personaje listo`.
12. El cliente muestra `Humano Guerrero`.
13. Recargar la pestaña.
14. Dejar el input vacío o con espacios.
15. Apretar `Entrar como guest`.
16. En consola del servidor aparece `Guest account created: <accountId> (Guest)`.
17. El cliente sigue mostrando un personaje válido.
18. No aparece sala 3D, mundo, snapshot, movimiento, inventario, combate ni multiplayer jugable.

## Archivos relevantes

- `client/src/main.js`
- `client/src/net/socketClient.js`
- `client/src/screens/menuScreen.js`
- `client/src/screens/characterSelectScreen.js`
- `client/src/ui/screenRouter.js`
- `server/src/net/socketServer.js`
- `server/src/net/protocol.js`
- `server/src/auth/sessionService.js`
- `server/src/auth/accountService.js`
- `server/src/characters/characterService.js`

## Pendientes / limitaciones

- No hay login real.
- No hay password, OAuth, cookies ni JWT.
- No hay base de datos ni persistencia en disco.
- No hay selección real entre varios personajes.
- No hay creación configurable de personaje.
- No hay mundo servidor.
- No hay sala 3D.
- No hay snapshots.
- No hay movimiento.
- No hay multiplayer jugable.
- No hay Three.js.
- No hay gameplay.

## Próximo hito sugerido

Hito 5 — Entrar a una sala 3D local.
