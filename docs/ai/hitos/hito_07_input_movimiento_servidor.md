# Contrato de Implementación — Hito 7: Input cliente + movimiento servidor

## Versión

Wini-s-dungeon-3d vPreliminar

## Objetivo cerrado

Demostrar autoridad del servidor sobre el movimiento del jugador.

Al terminar este hito, el cliente debe detectar input básico de movimiento, enviar intención al servidor con `PLAYER_INPUT`, el servidor debe actualizar la posición de la entidad correspondiente y luego emitir un `WORLD_SNAPSHOT` con la nueva posición. El cliente debe renderizar la nueva posición recibida en snapshot.

Flujo obligatorio:

1. Cliente detecta WASD.
2. Cliente manda `PLAYER_INPUT`.
3. Servidor recibe input.
4. Servidor actualiza posición de la entidad del jugador.
5. Servidor manda `WORLD_SNAPSHOT`.
6. Cliente renderiza nueva posición.

Criterio conceptual: si el servidor no actualiza la posición, el cliente no se mueve.

## Resultado observable

Después de ejecutar desde la raíz:

```bash
npm install
npm run dev
```

El usuario puede comprobar:

- Puede entrar como guest.
- Puede ver `Personaje listo` y `Humano Guerrero`.
- Puede apretar `Entrar a la mazmorra`.
- El cliente recibe snapshot inicial y muestra el cilindro.
- Al apretar `W`, el cliente manda `PLAYER_INPUT`.
- El servidor recibe ese input.
- El servidor cambia la posición de la entidad.
- El servidor emite nuevo `WORLD_SNAPSHOT`.
- El cilindro se mueve solo cuando llega el snapshot actualizado.

## Alcance incluido

- Agregar evento cliente-servidor `PLAYER_INPUT`.
- Ampliar `server/src/net/protocol.js` con `PLAYER_INPUT`.
- Ampliar `client/src/net/socketClient.js` para enviar `PLAYER_INPUT`.
- Crear `server/src/world/systems/inputBuffer.js`.
- Crear `server/src/world/systems/movementSystem.js`.
- Actualizar `server/src/net/socketServer.js` para recibir input del cliente y guardarlo/aplicarlo en servidor.
- Actualizar `server/src/world/ecsWorld.js` para permitir actualizar posición de entidades.
- Actualizar `server/src/world/systems/snapshotSystem.js` si hace falta para reflejar posiciones actualizadas.
- Crear `client/src/input/playerInput.js`.
- Actualizar `client/src/screens/gameScreen.js` o `client/src/main.js` para conectar input local con `socketClient.sendPlayerInput(...)`.
- Mantener render de entidades desde `WORLD_SNAPSHOT`.
- Mantener cámara rotable del Hito 5.
- Usar movimiento mínimo y determinista en servidor.
- Decisión cerrada de ejes para este hito:
  - `forward` mueve sobre eje Z negativo.
  - `back` mueve sobre eje Z positivo.
  - `left` mueve sobre eje X negativo.
  - `right` mueve sobre eje X positivo.
- Decisión cerrada de velocidad: valor simple fijo en servidor, por ejemplo `0.12` unidades por input/tick recibido.
- El payload mínimo de `PLAYER_INPUT` debe ser:

```js
{
  forward: true,
  back: false,
  left: false,
  right: false,
  cameraYaw: 0
}
```

- `cameraYaw` puede enviarse y registrarse, pero no es obligatorio usarlo todavía para movimiento relativo a cámara. Movimiento por ejes de mundo es suficiente para cerrar el hito.
- Actualizar `PROJECT_STATE.md` solo para registrar el cierre del hito cuando el Implementador termine.

## Fuera de alcance

Queda prohibido implementar o preparar en este hito:

- Combate.
- Loot.
- Dungeon procedural.
- Cadáver.
- Inventario.
- Login real.
- Persistencia en disco.
- Base de datos.
- Selección real entre varios personajes.
- Creación configurable de personaje.
- Stats de personaje.
- Enemigos.
- IA.
- Colisiones.
- Física de objetos.
- Animaciones complejas.
- Pathfinding.
- Ataques.
- Interacciones.
- Predicción cliente.
- Reconciliación cliente-servidor.
- Interpolación avanzada.
- Movimiento local autoritativo del cliente.
- Movimiento de cámara complejo.
- Multiplayer jugable como criterio final.
- Dos pestañas sincronizadas como cierre de vPreliminar.
- Rooms de Socket.IO complejas.
- Dungeon generado.
- UI avanzada.
- Arquitectura especulativa para hitos futuros.

## Archivos permitidos

El Implementador puede modificar estos archivos si existen:

```txt
PROJECT_STATE.md
client/src/main.js
client/src/net/socketClient.js
client/src/screens/gameScreen.js
client/src/input/playerInput.js
client/src/render/threeRenderer.js
server/src/net/socketServer.js
server/src/net/protocol.js
server/src/world/ecsWorld.js
server/src/world/worldInstanceService.js
server/src/world/systems/inputBuffer.js
server/src/world/systems/movementSystem.js
server/src/world/systems/snapshotSystem.js
```

Solo si es estrictamente necesario para mantener módulos o scripts funcionando, también puede modificar:

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
client/src/input/playerInput.js
server/src/world/systems/inputBuffer.js
server/src/world/systems/movementSystem.js
```

También puede crear la carpeta mínima necesaria:

```txt
client/src/input/
```

## Archivos prohibidos

No tocar ni crear archivos fuera de la lista permitida.

Prohibido especialmente modificar:

```txt
docs/ai/vpreliminar_hitos_multiplayer_3d.txt
docs/ai/roles/PREPARADOR_DE_HITO.md
docs/ai/hitos/*
server/src/auth/*
server/src/characters/*
server/src/simulation/*
server/src/ecs/*
server/src/game/*
client/src/screens/menuScreen.js
client/src/screens/characterSelectScreen.js
client/src/ui/screenRouter.js
client/src/world/*
client/src/ecs/*
client/src/domain/*
```

No crear ramas. El trabajo de vPreliminar se hace directo sobre la rama principal/default del repo.

## Capas tocadas

- client/input: captura de WASD.
- client/net: envío de `PLAYER_INPUT`.
- client/screens: conexión del input con la pantalla de juego.
- client/render: actualización visual por snapshot, no por movimiento local.
- server/net: recepción de `PLAYER_INPUT`.
- server/world: input buffer, movimiento y snapshot actualizado.
- docs estado: `PROJECT_STATE.md` solo si se necesita registrar cierre del hito.

## Secuencia de implementación sugerida

1. Revisar que el Hito 6 funcione: `JOIN_DUNGEON`, `DUNGEON_JOINED`, `WORLD_SNAPSHOT` y cilindro desde snapshot.
2. Ampliar `server/src/net/protocol.js` con:

```js
clientEvents.playerInput = "PLAYER_INPUT"
```

3. Crear `client/src/input/playerInput.js` con captura mínima de teclas:
   - `keydown` y `keyup`.
   - Estado booleano para `forward`, `back`, `left`, `right`.
   - WASD como teclas principales.
   - Opcionalmente flechas, solo si no amplía complejidad.
4. En la pantalla de juego, iniciar captura de input al montar y limpiarla al desmontar si ya existe cleanup.
5. Enviar input al servidor cuando cambia el estado o en un intervalo simple mientras la pantalla está activa. Decisión recomendada: enviar en intervalos de 50 ms mientras alguna tecla está presionada, y enviar estado final al soltar.
6. Ampliar `client/src/net/socketClient.js` con función `sendPlayerInput(input)`.
7. Crear `server/src/world/systems/inputBuffer.js` para guardar último input por character/entity o socket/session.
8. Crear `server/src/world/systems/movementSystem.js` para aplicar movimiento al entity asociado.
9. Actualizar `server/src/world/ecsWorld.js` con funciones mínimas para:
   - buscar entidad por `characterId`.
   - actualizar `position`.
10. Actualizar `server/src/net/socketServer.js`:
   - escuchar `PLAYER_INPUT`.
   - identificar la sesión/personaje del socket.
   - guardar/aplicar input.
   - ejecutar movement system.
   - emitir `WORLD_SNAPSHOT` actualizado.
11. Mantener `snapshotSystem` como fuente del snapshot.
12. Verificar que el cliente no cambia posición localmente al apretar tecla; solo actualiza cuando llega snapshot.
13. Ejecutar prueba manual obligatoria.
14. Registrar cierre en `PROJECT_STATE.md` si corresponde.

## Prueba manual obligatoria

Desde la raíz:

```bash
npm install
npm run dev
```

Verificar obligatoriamente:

1. El servidor arranca sin errores.
2. El cliente abre en navegador.
3. El cliente muestra `Conectado como sesión <sessionId>`.
4. Escribir `Walter`.
5. Apretar `Entrar como guest`.
6. Verificar que el cliente muestra:

```txt
Personaje listo
Humano Guerrero
```

7. Apretar `Entrar a la mazmorra`.
8. Verificar que aparece sala 3D y cilindro desde snapshot.
9. Apretar `W`.
10. Verificar que el cliente manda `PLAYER_INPUT` o log equivalente.
11. Verificar que el servidor recibe `PLAYER_INPUT` o log equivalente.
12. Verificar que el servidor cambia la posición de la entidad.
13. Verificar que llega un nuevo `WORLD_SNAPSHOT`.
14. Verificar que el cilindro se mueve.
15. Soltar `W` y verificar que deja de moverse.
16. Probar `A`, `S` y `D`.
17. Confirmar que si no llega snapshot actualizado, el cliente no mueve la entidad por cuenta propia.
18. Confirmar que no aparece inventario, combate, loot, enemigos ni dungeon procedural.
19. Confirmar que no se implementó objetivo final de dos pestañas sincronizadas.

## Criterio de cierre

El Hito 7 se considera cerrado solo si se cumplen todas estas condiciones:

- `npm install` funciona desde la raíz.
- `npm run dev` funciona desde la raíz.
- El flujo de Hito 6 sigue funcionando.
- El cliente captura WASD.
- El cliente envía `PLAYER_INPUT`.
- El servidor recibe `PLAYER_INPUT`.
- El servidor decide y actualiza la posición de la entidad.
- El servidor emite `WORLD_SNAPSHOT` con posición actualizada.
- El cliente renderiza la nueva posición desde snapshot.
- El cliente no aplica movimiento local autoritativo.
- El cilindro se mueve con `W`, `A`, `S`, `D`.
- Al soltar teclas, el movimiento se detiene.
- No se implementó combate, inventario, loot, enemigos ni dungeon procedural.
- No se cerró el objetivo final de dos pestañas sincronizadas.
- No se creó ninguna rama.
- No se tocaron archivos fuera de los permitidos.

## Riesgos / notas

- Este hito demuestra autoridad del servidor. No optimizar todavía con predicción ni reconciliación.
- El movimiento puede ser tosco; debe ser verificable, no definitivo.
- `cameraYaw` puede quedar preparado en payload, pero el movimiento relativo a cámara no es obligatorio en este hito.
- No adelantar Hito 8. Aunque dos pestañas puedan recibir snapshots por accidente, el criterio formal de dos jugadores sincronizados corresponde al próximo hito.
- Si hay que elegir entre una solución elegante y una solución mínima verificable, elegir la mínima verificable.
