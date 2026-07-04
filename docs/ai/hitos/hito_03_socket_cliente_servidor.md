# Contrato de Implementación — Hito 3: Conexión cliente-servidor

## Versión

Wini-s-dungeon-3d vPreliminar

## Objetivo cerrado

Probar que el cliente ya no está aislado y puede comunicarse realmente con el servidor mediante Socket.IO.

Al terminar este hito, al abrir el cliente en navegador debe ocurrir este flujo mínimo:

1. El cliente abre.
2. El cliente intenta conectarse al servidor por Socket.IO.
3. El servidor acepta la conexión.
4. El servidor crea un `sessionId` en memoria para esa conexión.
5. El servidor responde al cliente con el evento `SESSION_CREATED`.
6. El cliente muestra en pantalla un estado similar a:

```txt
Conectado como sesión <sessionId>
```

Este hito no implementa entrada guest real, account guest, personaje, mundo, sala 3D, movimiento ni multiplayer jugable. Solo prueba comunicación real cliente-servidor.

## Resultado observable

Después de ejecutar desde la raíz:

```bash
npm install
npm run dev
```

El usuario puede abrir el cliente en navegador y comprobar que:

- La pantalla del Hito 2 sigue existiendo.
- El cliente muestra algún estado de conexión visible.
- Cuando la conexión se completa, el estado visible pasa a `Conectado como sesión <sessionId>`.
- En la consola del servidor aparece un log de nueva conexión.
- El `sessionId` mostrado por el cliente proviene del servidor, no se inventa localmente en el cliente.

## Alcance incluido

- Agregar Socket.IO al servidor.
- Agregar Socket.IO client al cliente.
- Crear archivo de protocolo compartido por lado servidor o, si no se comparte entre paquetes, definir constantes claras de eventos en `server/src/net/protocol.js` y reflejarlas en el cliente sin inventar eventos extra.
- Crear `server/src/net/socketServer.js`.
- Crear `client/src/net/socketClient.js`.
- Integrar Socket.IO en `server/src/index.js` sin romper el servidor HTTP existente.
- Integrar el cliente socket desde la pantalla o desde `client/src/main.js` de forma mínima.
- Generar `sessionId` simple en servidor al conectar. Puede ser incremental o generado con `crypto.randomUUID()`.
- Enviar al cliente el evento `SESSION_CREATED` con payload mínimo:

```js
{
  sessionId: "..."
}
```

- Mostrar estado de conexión en la UI existente.
- Mostrar un log del servidor cuando se conecta un cliente.
- Mantener funcionando el flujo local del Hito 2: input de nombre y botón `Entrar como guest` con respuesta local.
- Actualizar scripts o configuración de desarrollo solo si es necesario para que cliente y servidor puedan comunicarse localmente.
- Actualizar `PROJECT_STATE.md` solo para registrar el cierre del hito cuando el Implementador termine.

## Fuera de alcance

Queda prohibido implementar o preparar en este hito:

- Combate.
- Loot.
- Dungeon procedural.
- Cadáver.
- Inventario.
- Login real.
- Account guest real.
- Persistencia.
- Base de datos.
- Personaje default.
- Selección de personaje.
- Evento `ENTER_AS_GUEST` real.
- Eventos `GUEST_READY` o `CHARACTER_READY`.
- Mundo servidor.
- ECS.
- Sala 3D.
- Three.js.
- Render 3D.
- Cilindros de jugador.
- Movimiento.
- Input de movimiento.
- Snapshots.
- Evento `WORLD_SNAPSHOT`.
- Evento `JOIN_DUNGEON`.
- Multiplayer jugable.
- Sincronización de dos pestañas.
- Reintentos complejos de conexión.
- Lobby.
- Rooms de Socket.IO.
- Autenticación.
- Cookies.
- Tokens.
- Arquitectura especulativa para hitos futuros.

## Archivos permitidos

El Implementador puede modificar estos archivos si existen:

```txt
package.json
package-lock.json
PROJECT_STATE.md
client/package.json
client/package-lock.json
client/src/main.js
client/src/screens/menuScreen.js
client/src/ui/screenRouter.js
client/src/net/socketClient.js
server/package.json
server/package-lock.json
server/src/index.js
server/src/net/socketServer.js
server/src/net/protocol.js
```

Solo si es estrictamente necesario para configuración de desarrollo local, también puede modificar:

```txt
client/index.html
```

## Archivos permitidos para crear

El Implementador puede crear únicamente estos archivos si no existen:

```txt
PROJECT_STATE.md
client/src/net/socketClient.js
server/src/net/socketServer.js
server/src/net/protocol.js
```

También puede crear las carpetas mínimas necesarias para contener esos archivos:

```txt
client/src/net/
server/src/net/
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
server/src/auth/*
server/src/characters/*
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

- server/app: integración del servidor HTTP con Socket.IO.
- server/net: inicialización de sockets y constantes de protocolo.
- client/net: cliente Socket.IO mínimo.
- client/screens: estado visual de conexión en la pantalla existente.
- client/app: montaje o inicialización mínima del socket.
- raíz/package scripts: solo si hace falta ajustar dependencias o puertos.
- docs estado: `PROJECT_STATE.md` solo si se necesita registrar cierre del hito.

## Secuencia de implementación sugerida

1. Revisar que el resultado del Hito 2 funciona antes de tocar red.
2. Instalar las dependencias necesarias:
   - `socket.io` en `server/package.json`.
   - `socket.io-client` en `client/package.json`.
3. Definir en `server/src/net/protocol.js` las constantes mínimas:

```js
export const SERVER_EVENTS = {
  SESSION_CREATED: "SESSION_CREATED",
};
```

Si el proyecto usa CommonJS, adaptar la sintaxis al estilo existente. No mezclar sistemas de módulos innecesariamente.

4. Crear `server/src/net/socketServer.js` con una función explícita para montar Socket.IO sobre el servidor HTTP existente. Nombre sugerido: `attachSocketServer`.
5. En `socketServer.js`, al recibir `connection`:
   - Crear un `sessionId`.
   - Loguear en consola la conexión con el `sessionId`.
   - Emitir `SESSION_CREATED` al socket conectado con `{ sessionId }`.
6. Actualizar `server/src/index.js` para:
   - Crear o reutilizar el servidor HTTP.
   - Adjuntar Socket.IO.
   - Mantener el log de servidor corriendo.
7. Crear `client/src/net/socketClient.js` con una función mínima para conectar al servidor. Nombre sugerido: `createSocketClient`.
8. En el cliente, escuchar:
   - `connect` para mostrar estado conectado a socket si se desea.
   - `SESSION_CREATED` para recibir el `sessionId` real del servidor.
   - `disconnect` para mostrar estado desconectado si ocurre.
9. Integrar el estado de conexión en la pantalla del Hito 2 sin convertir el botón guest en acción de red.
10. Asegurar configuración de CORS o URL del servidor si cliente y servidor corren en puertos distintos.
11. Ejecutar `npm install` desde la raíz.
12. Ejecutar `npm run dev` desde la raíz.
13. Abrir el cliente en navegador.
14. Verificar que aparece `Conectado como sesión <sessionId>`.
15. Verificar que el servidor loguea la conexión.
16. Verificar que el botón `Entrar como guest` sigue mostrando solo mensaje local.
17. Si existe o se crea `PROJECT_STATE.md`, registrar de forma breve que el Hito 3 quedó cerrado, con fecha y prueba manual ejecutada.

## Prueba manual obligatoria

Desde la raíz del repo:

```bash
npm install
npm run dev
```

Verificar obligatoriamente:

1. El servidor arranca sin errores.
2. El cliente abre en navegador.
3. La pantalla del Hito 2 sigue mostrando:

```txt
Wini-s-dungeon-3d vPreliminar
Nombre:
[ input ]
[ Entrar como guest ]
```

4. El cliente muestra un estado de conexión visible.
5. El cliente llega a mostrar:

```txt
Conectado como sesión <sessionId>
```

6. El `sessionId` no está hardcodeado en cliente.
7. En consola del servidor se ve una conexión nueva.
8. Escribir `Walter` en el input.
9. Apretar `Entrar como guest`.
10. Verificar que sigue apareciendo el mensaje local:

```txt
Entrando como guest: Walter
```

11. Verificar que apretar el botón no manda todavía `ENTER_AS_GUEST` ni crea personaje.
12. Verificar que no aparece personaje, sala 3D, mundo, snapshot, movimiento ni gameplay.
13. Abrir una segunda pestaña opcionalmente solo para confirmar que cada pestaña recibe su propio `sessionId`; no debe existir sincronización de jugadores todavía.

## Criterio de cierre

El Hito 3 se considera cerrado solo si se cumplen todas estas condiciones:

- `npm install` funciona desde la raíz.
- `npm run dev` funciona desde la raíz.
- El servidor arranca con Socket.IO integrado.
- El cliente se conecta realmente al servidor.
- El servidor crea un `sessionId` por conexión.
- El servidor emite `SESSION_CREATED` al cliente conectado.
- El cliente muestra `Conectado como sesión <sessionId>` usando el payload recibido.
- La consola del servidor muestra al menos un log de conexión nueva.
- La pantalla local del Hito 2 sigue funcionando.
- El botón `Entrar como guest` sigue siendo local.
- No se implementó guest real, personaje, mundo, snapshots, 3D ni multiplayer jugable.
- No se creó ninguna rama.
- No se tocaron archivos fuera de los permitidos.

## Riesgos / notas

- Este hito prueba comunicación real, no autenticación.
- `SESSION_CREATED` no significa account guest; solo identifica una conexión temporal.
- El `sessionId` puede vivir solo en memoria y morir al reiniciar el servidor.
- No adelantar `ENTER_AS_GUEST`: corresponde al Hito 4.
- No adelantar `JOIN_DUNGEON` ni `WORLD_SNAPSHOT`: corresponden al Hito 6.
- No adelantar movimiento servidor: corresponde al Hito 7.
- No adelantar dos pestañas sincronizadas: corresponde al Hito 8.
- Mantener el protocolo mínimo. En este hito solo son obligatorios `connect` y `SESSION_CREATED`.
- Si CORS o puertos generan problemas, resolverlos de la forma mínima necesaria, sin rediseñar la arquitectura.
- Si hay que elegir entre una solución elegante y una solución mínima verificable, elegir la mínima verificable.
