# Contrato de Implementación — Hito 4: Guest real + personaje default

## Versión

Wini-s-dungeon-3d vPreliminar

## Objetivo cerrado

Convertir el botón `Entrar como guest` en una acción real contra el servidor, sin hacer login completo.

Al terminar este hito, el flujo debe ser:

1. El cliente abre y se conecta al servidor como en Hito 3.
2. El servidor crea `sessionId` y responde `SESSION_CREATED`.
3. El usuario escribe un nombre.
4. El usuario aprieta `Entrar como guest`.
5. El cliente manda `ENTER_AS_GUEST` al servidor con el nombre escrito.
6. El servidor asocia esa conexión/sesión a una account guest en memoria.
7. El servidor crea o recupera un personaje default para esa account.
8. El servidor responde `GUEST_READY`.
9. El servidor responde `CHARACTER_READY`.
10. El cliente muestra una pantalla o panel de personaje con:

```txt
Personaje listo
Humano Guerrero
```

Este hito no implementa todavía mundo, sala 3D, movimiento, snapshots, selección real de personaje ni multiplayer visible.

## Resultado observable

Después de ejecutar desde la raíz:

```bash
npm install
npm run dev
```

El usuario puede abrir el cliente en navegador y comprobar que:

- El cliente se conecta al servidor y muestra `Conectado como sesión <sessionId>`.
- Puede escribir un nombre.
- Al apretar `Entrar como guest`, el cliente ya no solo muestra un mensaje local: manda `ENTER_AS_GUEST` al servidor.
- El servidor registra o puede registrar que creó una account guest.
- El servidor crea o recupera un personaje default asociado a esa account.
- El cliente recibe datos reales del servidor y muestra el personaje default `Humano Guerrero`.

## Alcance incluido

- Mantener funcionando la conexión Socket.IO del Hito 3.
- Agregar el evento cliente-servidor `ENTER_AS_GUEST`.
- Agregar los eventos servidor-cliente `GUEST_READY` y `CHARACTER_READY`.
- Ampliar `server/src/net/protocol.js` con las constantes mínimas nuevas.
- Crear `server/src/auth/sessionService.js`.
- Crear `server/src/auth/accountService.js`.
- Crear `server/src/characters/characterService.js`.
- Crear `client/src/screens/characterSelectScreen.js`.
- Actualizar `server/src/net/socketServer.js` para recibir `ENTER_AS_GUEST`.
- Actualizar `client/src/net/socketClient.js` para poder enviar `ENTER_AS_GUEST` y escuchar `GUEST_READY` / `CHARACTER_READY`.
- Actualizar `client/src/screens/menuScreen.js` para que el botón llame a la acción de red correspondiente.
- Actualizar `client/src/main.js` para coordinar el flujo entre pantalla de menú, socket client y pantalla de personaje.
- Usar persistencia en memoria. No usar base de datos.
- Crear account guest mínima:

```js
{
  id: "...",
  type: "guest",
  displayName: "Walter"
}
```

- Crear character mínimo:

```js
{
  id: "...",
  accountId: "...",
  name: "Walter",
  race: "human",
  class: "warrior",
  background: "generic"
}
```

- Mostrar al usuario una representación legible del personaje como `Humano Guerrero`.
- Decisión cerrada de nombres visibles:
  - `race: "human"` debe mostrarse como `Humano`.
  - `class: "warrior"` debe mostrarse como `Guerrero`.
  - El nombre del personaje puede mostrarse adicionalmente, pero el texto `Humano Guerrero` debe estar visible.
- Si el nombre enviado por el cliente está vacío o solo tiene espacios, el servidor debe normalizarlo a `Guest`.
- El servidor debe ser la fuente de verdad de account y character. El cliente solo muestra lo recibido.
- Actualizar `PROJECT_STATE.md` solo para registrar el cierre del hito cuando el Implementador termine.

## Fuera de alcance

Queda prohibido implementar o preparar en este hito:

- Combate.
- Loot.
- Dungeon procedural.
- Cadáver.
- Inventario.
- Login real.
- Passwords.
- Registro de usuario.
- OAuth.
- Cookies.
- JWT.
- Persistencia en SQLite o cualquier base de datos.
- Selección real entre varios personajes.
- Creación configurable de personaje.
- Razas o clases reales complejas.
- Estadísticas de personaje.
- Equipo.
- Mundo servidor.
- ECS.
- Sala 3D.
- Three.js.
- Render 3D.
- Cilindros de jugador.
- Movimiento.
- Input de movimiento.
- Snapshots.
- Evento `JOIN_DUNGEON`.
- Evento `WORLD_SNAPSHOT`.
- Multiplayer jugable.
- Sincronización de dos pestañas.
- Lobby.
- Rooms de Socket.IO.
- Arquitectura especulativa para hitos futuros.

## Archivos permitidos

El Implementador puede modificar estos archivos si existen:

```txt
PROJECT_STATE.md
client/src/main.js
client/src/net/socketClient.js
client/src/screens/menuScreen.js
client/src/screens/characterSelectScreen.js
client/src/ui/screenRouter.js
server/src/net/socketServer.js
server/src/net/protocol.js
server/src/auth/sessionService.js
server/src/auth/accountService.js
server/src/characters/characterService.js
```

Solo si es estrictamente necesario para mantener scripts o módulos funcionando, también puede modificar:

```txt
package.json
package-lock.json
client/package.json
client/package-lock.json
server/package.json
server/package-lock.json
```

## Archivos permitidos para crear

El Implementador puede crear únicamente estos archivos si no existen:

```txt
client/src/screens/characterSelectScreen.js
server/src/auth/sessionService.js
server/src/auth/accountService.js
server/src/characters/characterService.js
```

También puede crear las carpetas mínimas necesarias para contener esos archivos:

```txt
server/src/auth/
server/src/characters/
```

## Archivos prohibidos

No tocar ni crear archivos fuera de la lista permitida.

Prohibido especialmente crear o modificar:

```txt
docs/ai/vpreliminar_hitos_multiplayer_3d.txt
docs/ai/roles/PREPARADOR_DE_HITO.md
docs/ai/hitos/hito_01_proyecto_arranca.md
docs/ai/hitos/hito_02_pantalla_guest.md
docs/ai/hitos/hito_03_socket_cliente_servidor.md
docs/ai/hitos/hito_04_guest_real_personaje_default.md
server/src/world/*
server/src/simulation/*
server/src/ecs/*
server/src/game/*
client/src/render/*
client/src/game/*
client/src/world/*
client/src/ecs/*
client/src/input/*
client/src/domain/*
```

No crear ramas. El trabajo de vPreliminar se hace directo sobre la rama principal/default del repo.

## Capas tocadas

- server/net: protocolo y recepción de `ENTER_AS_GUEST`.
- server/auth: sesión en memoria y account guest.
- server/characters: personaje default en memoria.
- client/net: envío de `ENTER_AS_GUEST` y recepción de eventos de respuesta.
- client/screens: menú guest y pantalla/panel de personaje listo.
- client/app: coordinación simple del flujo.
- docs estado: `PROJECT_STATE.md` solo si se necesita registrar cierre del hito.

## Secuencia de implementación sugerida

1. Revisar que el Hito 3 funcione: conexión Socket.IO, `SESSION_CREATED`, estado visible y botón local.
2. Ampliar `server/src/net/protocol.js` con constantes mínimas:

```js
clientEvents.enterAsGuest = "ENTER_AS_GUEST"
serverEvents.guestReady = "GUEST_READY"
serverEvents.characterReady = "CHARACTER_READY"
```

Adaptar nombres y estilo al código existente, pero mantener strings exactos.

3. Crear `server/src/auth/sessionService.js` con almacenamiento en memoria por `sessionId` o por `socket.id`. Debe permitir asociar una conexión a una account guest.
4. Crear `server/src/auth/accountService.js` con una función para crear account guest en memoria. Nombre sugerido: `createGuestAccount(displayName)`.
5. Crear `server/src/characters/characterService.js` con una función para crear o recuperar personaje default por `accountId`. Nombre sugerido: `getOrCreateDefaultCharacter(account)`.
6. Decisión de recuperación: dentro de un mismo proceso de servidor, si se pide personaje para el mismo `accountId`, devolver el mismo personaje. No hace falta recuperar entre reinicios.
7. Actualizar `server/src/net/socketServer.js`:
   - Al conectar, seguir creando `sessionId` y emitiendo `SESSION_CREATED`.
   - Registrar la sesión en `sessionService`.
   - Escuchar `ENTER_AS_GUEST`.
   - Normalizar `displayName` a `Guest` si viene vacío.
   - Crear account guest.
   - Asociarla a la sesión.
   - Crear o recuperar character default.
   - Emitir `GUEST_READY` con `{ account }`.
   - Emitir `CHARACTER_READY` con `{ character }`.
8. Actualizar `client/src/net/socketClient.js`:
   - Exponer una función para enviar `ENTER_AS_GUEST` con `{ displayName }`.
   - Escuchar `GUEST_READY`.
   - Escuchar `CHARACTER_READY`.
9. Actualizar `client/src/screens/menuScreen.js`:
   - Mantener input y botón.
   - Al click, no limitarse a mensaje local.
   - Llamar callback `onEnterAsGuest(displayName)` o equivalente.
   - Puede mostrar estado transitorio `Entrando como guest...`, pero no debe inventar personaje.
10. Crear `client/src/screens/characterSelectScreen.js`:
   - Debe renderizar datos recibidos del servidor.
   - Debe mostrar `Personaje listo`.
   - Debe mostrar `Humano Guerrero`.
   - Puede mostrar el nombre del personaje adicionalmente.
   - No debe mostrar botón funcional de entrar al mundo todavía, salvo texto deshabilitado o nota no interactiva.
11. Actualizar `client/src/main.js` para coordinar:
   - Montar menu.
   - Conectar socket.
   - Pasar callback de entrada guest al menú.
   - Al recibir `CHARACTER_READY`, montar pantalla de personaje.
12. Ejecutar `npm install` desde la raíz.
13. Ejecutar `npm run dev` desde la raíz.
14. Ejecutar la prueba manual obligatoria.
15. Si existe o se crea `PROJECT_STATE.md`, registrar de forma breve que el Hito 4 quedó cerrado, con fecha y prueba manual ejecutada.

## Prueba manual obligatoria

Desde la raíz del repo:

```bash
npm install
npm run dev
```

Verificar obligatoriamente:

1. El servidor arranca sin errores.
2. El cliente abre en navegador.
3. El cliente muestra `Conectado como sesión <sessionId>`.
4. La pantalla muestra el título:

```txt
Wini-s-dungeon-3d vPreliminar
```

5. La pantalla muestra input de nombre y botón:

```txt
Entrar como guest
```

6. Escribir `Walter` en el input.
7. Apretar `Entrar como guest`.
8. Verificar en consola del servidor que se procesó `ENTER_AS_GUEST` o que se creó una account guest.
9. Verificar que el cliente muestra una pantalla o panel con:

```txt
Personaje listo
Humano Guerrero
```

10. Verificar que el personaje mostrado proviene del payload del servidor, no de datos hardcodeados únicamente en cliente.
11. Recargar la pestaña.
12. Dejar el input vacío o solo con espacios.
13. Apretar `Entrar como guest`.
14. Verificar que el servidor normaliza el nombre a `Guest` y el cliente sigue mostrando un personaje válido.
15. Verificar que no aparece sala 3D, mundo, snapshot, movimiento ni gameplay.
16. Verificar que no existe selección real entre varios personajes.
17. Verificar que no se creó base de datos ni persistencia en disco.

## Criterio de cierre

El Hito 4 se considera cerrado solo si se cumplen todas estas condiciones:

- `npm install` funciona desde la raíz.
- `npm run dev` funciona desde la raíz.
- El Hito 3 sigue funcionando: cliente conectado y `SESSION_CREATED` recibido.
- El cliente envía `ENTER_AS_GUEST` al apretar `Entrar como guest`.
- El servidor recibe `ENTER_AS_GUEST`.
- El servidor crea una account con `type: "guest"` y `displayName` normalizado.
- El servidor crea o recupera un character default asociado a esa account.
- El servidor emite `GUEST_READY`.
- El servidor emite `CHARACTER_READY`.
- El cliente muestra `Personaje listo`.
- El cliente muestra `Humano Guerrero`.
- El cliente no inventa el personaje sin payload del servidor.
- La persistencia es solo en memoria.
- No se implementó mundo, sala 3D, snapshots, movimiento, inventario, combate ni multiplayer jugable.
- No se creó ninguna rama.
- No se tocaron archivos fuera de los permitidos.

## Riesgos / notas

- Este hito transforma `guest` de intención local a flujo real servidor-cliente.
- `GUEST_READY` debe representar account guest, no personaje.
- `CHARACTER_READY` debe representar personaje default, no entrada al mundo.
- El personaje default existe solo para cerrar el flujo previo al mundo.
- No usar SQLite todavía. El documento de hitos permite persistencia en memoria en este hito.
- No adelantar Hito 5: todavía no hay sala 3D local.
- No adelantar Hito 6: todavía no hay world servidor ni snapshots.
- No adelantar Hito 7: todavía no hay input ni movimiento servidor.
- No adelantar Hito 8: todavía no hay dos pestañas sincronizadas.
- Si hay que elegir entre una solución elegante y una solución mínima verificable, elegir la mínima verificable.
