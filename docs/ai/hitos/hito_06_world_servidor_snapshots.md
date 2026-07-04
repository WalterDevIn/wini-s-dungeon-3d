# Contrato de Implementación — Hito 6: Mundo servidor en memoria

## Versión

Wini-s-dungeon-3d vPreliminar

## Objetivo cerrado

Crear la simulación mínima del servidor y hacer que el cliente renderice el cilindro del jugador desde un `WORLD_SNAPSHOT` recibido del servidor.

Al terminar este hito, el flujo debe ser:

1. El cliente abre.
2. El cliente se conecta al servidor.
3. El usuario entra como guest.
4. El servidor crea account guest y personaje default.
5. El cliente muestra `Personaje listo` y `Humano Guerrero`.
6. El usuario aprieta `Entrar a la mazmorra`.
7. El cliente manda `JOIN_DUNGEON` al servidor.
8. El servidor crea o usa una world instance en memoria.
9. El servidor crea una entidad para el personaje.
10. El servidor responde `DUNGEON_JOINED`.
11. El servidor empieza a mandar `WORLD_SNAPSHOT`.
12. El cliente renderiza la sala 3D usando el snapshot.
13. El cilindro del jugador aparece porque vino en el snapshot, no porque el cliente lo inventó localmente.

Este hito introduce autoridad del servidor sobre la existencia y posición inicial de la entidad. Todavía no implementa input ni movimiento servidor.

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
- El cliente manda `JOIN_DUNGEON`.
- El servidor responde `DUNGEON_JOINED`.
- El servidor emite `WORLD_SNAPSHOT`.
- El cliente muestra una sala 3D.
- El cilindro del jugador aparece según la entidad recibida en el snapshot.
- Si el snapshot no llega, el cilindro no debe aparecer como entidad inventada por el cliente.

## Alcance incluido

- Agregar evento cliente-servidor `JOIN_DUNGEON`.
- Agregar eventos servidor-cliente `DUNGEON_JOINED` y `WORLD_SNAPSHOT`.
- Ampliar `server/src/net/protocol.js` con esas constantes.
- Ampliar `client/src/net/socketClient.js` para enviar `JOIN_DUNGEON` y escuchar `DUNGEON_JOINED` / `WORLD_SNAPSHOT`.
- Crear `server/src/world/worldInstanceService.js`.
- Crear `server/src/world/ecsWorld.js`.
- Crear `server/src/world/systems/snapshotSystem.js`.
- Actualizar `server/src/net/socketServer.js` para manejar `JOIN_DUNGEON`.
- Crear o usar una única world instance en memoria para vPreliminar.
- Crear una entidad mínima asociada al personaje del usuario:

```js
{
  id: "...",
  characterId: "...",
  position: { x: 0, y: 0, z: 0 },
  rotation: 0
}
```

- Enviar snapshot mínimo con entidades:

```js
{
  worldId: "default",
  entities: [
    {
      id: "...",
      characterId: "...",
      position: { x: 0, y: 0, z: 0 },
      rotation: 0
    }
  ]
}
```

- Actualizar `client/src/screens/gameScreen.js` y/o `client/src/render/threeRenderer.js` para renderizar el cilindro desde snapshot.
- Mantener sala 3D local de Hito 5, pero cambiar la fuente del cilindro: ya no debe nacer como jugador local fijo del cliente.
- Mantener cámara rotable del Hito 5.
- Mantener persistencia en memoria.
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
- Movimiento servidor.
- Input de movimiento.
- `PLAYER_INPUT`.
- WASD.
- Colisiones.
- Predicción cliente.
- Interpolación avanzada.
- Reconciliación cliente-servidor.
- Dos pestañas sincronizadas como criterio final.
- Multiplayer jugable.
- Rooms de Socket.IO complejas.
- Dungeon generado.
- Física de objetos.
- Animaciones complejas.
- UI avanzada.
- Arquitectura especulativa para hitos futuros.

## Archivos permitidos

El Implementador puede modificar estos archivos si existen:

```txt
PROJECT_STATE.md
client/src/main.js
client/src/net/socketClient.js
client/src/screens/characterSelectScreen.js
client/src/screens/gameScreen.js
client/src/render/threeRenderer.js
client/src/render/threeSceneFactory.js
server/src/net/socketServer.js
server/src/net/protocol.js
server/src/auth/sessionService.js
server/src/world/worldInstanceService.js
server/src/world/ecsWorld.js
server/src/world/systems/snapshotSystem.js
```

Solo si es estrictamente necesario para mantener dependencias o scripts funcionando, también puede modificar:

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
server/src/world/worldInstanceService.js
server/src/world/ecsWorld.js
server/src/world/systems/snapshotSystem.js
```

También puede crear las carpetas mínimas necesarias:

```txt
server/src/world/
server/src/world/systems/
```

## Archivos prohibidos

No tocar ni crear archivos fuera de la lista permitida.

Prohibido especialmente modificar:

```txt
docs/ai/vpreliminar_hitos_multiplayer_3d.txt
docs/ai/roles/PREPARADOR_DE_HITO.md
docs/ai/hitos/*
server/src/simulation/*
server/src/ecs/*
server/src/game/*
client/src/screens/menuScreen.js
client/src/ui/screenRouter.js
client/src/input/*
client/src/world/*
client/src/ecs/*
client/src/domain/*
```

No crear ramas. El trabajo de vPreliminar se hace directo sobre la rama principal/default del repo.

## Capas tocadas

- server/net: protocolo y recepción de `JOIN_DUNGEON`.
- server/auth: lectura de sesión/account/personaje si hace falta exponer datos existentes.
- server/world: world instance en memoria, entidades mínimas y snapshots.
- client/net: envío de `JOIN_DUNGEON` y recepción de snapshot.
- client/screens: entrada a mazmorra y pantalla de juego.
- client/render: render de entidades recibidas por snapshot.
- docs estado: `PROJECT_STATE.md` solo si se necesita registrar cierre del hito.

## Secuencia de implementación sugerida

1. Revisar que el Hito 5 funcione: personaje listo, botón `Entrar a la mazmorra`, sala 3D local y cámara rotable.
2. Ampliar `server/src/net/protocol.js`:

```js
clientEvents.joinDungeon = "JOIN_DUNGEON"
serverEvents.dungeonJoined = "DUNGEON_JOINED"
serverEvents.worldSnapshot = "WORLD_SNAPSHOT"
```

3. Revisar `sessionService`. Si todavía no permite consultar sesión por `sessionId`, agregar función mínima para obtener la sesión asociada.
4. Si hace falta conocer el `characterId` desde la sesión, guardar también el personaje o `characterId` cuando se procesa `ENTER_AS_GUEST`.
5. Crear `server/src/world/ecsWorld.js` con estructura mínima:
   - `createWorld({ id })`.
   - almacenamiento de entidades en memoria.
   - función para crear entidad de jugador si no existe para ese character.
   - función para listar entidades.
6. Crear `server/src/world/worldInstanceService.js` con una world default en memoria:
   - `getOrCreateDefaultWorld()`.
   - `joinCharacterToWorld(character)` o equivalente.
7. Crear `server/src/world/systems/snapshotSystem.js` con función `buildWorldSnapshot(world)`.
8. Actualizar `server/src/net/socketServer.js`:
   - escuchar `JOIN_DUNGEON`.
   - validar que la sesión ya tenga guest/personaje listo.
   - crear o usar world default.
   - crear entidad del personaje.
   - emitir `DUNGEON_JOINED` con datos mínimos.
   - emitir `WORLD_SNAPSHOT` con entidades.
9. Actualizar `client/src/net/socketClient.js`:
   - exponer `joinDungeon()`.
   - escuchar `DUNGEON_JOINED`.
   - escuchar `WORLD_SNAPSHOT`.
10. Actualizar `client/src/main.js` para que `Entrar a la mazmorra` llame `socketClient.joinDungeon()`.
11. Actualizar `client/src/screens/gameScreen.js` para montar la sala pero esperar snapshot antes de mostrar cilindro.
12. Actualizar renderer para crear/actualizar cilindros desde `snapshot.entities`.
13. Mantener la cámara y sala de Hito 5.
14. No implementar movimiento.
15. Ejecutar prueba manual obligatoria.
16. Registrar cierre en `PROJECT_STATE.md` si corresponde.

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
8. Verificar en consola del servidor que recibió `JOIN_DUNGEON` o log equivalente.
9. Verificar que el servidor emitió `DUNGEON_JOINED` o log equivalente.
10. Verificar que el servidor emitió `WORLD_SNAPSHOT` o log equivalente.
11. Verificar que aparece la sala 3D.
12. Verificar que el cilindro aparece desde una entidad recibida en snapshot.
13. Verificar que la cámara sigue rotando.
14. Verificar que no hay movimiento del jugador todavía.
15. Verificar que no existe `PLAYER_INPUT`.
16. Verificar que no aparece inventario, combate, loot, enemigos ni dungeon procedural.
17. Opcional: abrir DevTools y confirmar que el cliente recibió `WORLD_SNAPSHOT` con al menos una entidad con `characterId`, `position` y `rotation`.

## Criterio de cierre

El Hito 6 se considera cerrado solo si se cumplen todas estas condiciones:

- `npm install` funciona desde la raíz.
- `npm run dev` funciona desde la raíz.
- El flujo de Hito 4 sigue funcionando.
- El flujo de Hito 5 sigue funcionando hasta apretar `Entrar a la mazmorra`.
- Al apretar `Entrar a la mazmorra`, el cliente manda `JOIN_DUNGEON`.
- El servidor crea o usa una world instance en memoria.
- El servidor crea entidad mínima para el personaje.
- El servidor emite `DUNGEON_JOINED`.
- El servidor emite `WORLD_SNAPSHOT`.
- El cliente renderiza el cilindro desde el snapshot.
- El cliente no inventa la entidad del jugador si no recibió snapshot.
- No se implementó movimiento servidor.
- No se implementó `PLAYER_INPUT`.
- No se implementó multiplayer jugable como criterio final.
- No se creó ninguna rama.
- No se tocaron archivos fuera de los permitidos.

## Riesgos / notas

- Este hito cambia la fuente de verdad del cilindro: deja de ser local y pasa a venir del servidor.
- El snapshot puede emitirse una sola vez al entrar; no hace falta loop periódico todavía, salvo que sea más simple para la arquitectura mínima. Si se usa loop, debe ser mínimo y sin movimiento.
- No adelantar Hito 7: todavía no hay input ni movimiento servidor.
- No adelantar Hito 8: todavía no hay objetivo de dos pestañas sincronizadas.
- La world puede ser una única instancia `default` en memoria.
- Si hay que elegir entre una solución elegante y una solución mínima verificable, elegir la mínima verificable.
