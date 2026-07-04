# PROJECT_STATE — Wini-s-dungeon-3d

## Versión actual

Wini-s-dungeon-3d vPreliminar

## Hito implementado

Hito 7 — Input cliente, movimiento servidor

## Estado

Cerrado.

## Qué funciona

- Existe estructura mínima separada de cliente y servidor.
- Desde la raíz, `npm install` instala el workspace del cliente, el workspace del servidor y las dependencias del proyecto.
- Desde la raíz, `npm run dev` levanta cliente y servidor en paralelo.
- El flujo de Hito 4 sigue funcionando: el cliente se conecta al servidor, entra como guest y recibe personaje default.
- El flujo de Hito 6 sigue funcionando: el cliente emite `JOIN_DUNGEON`, el servidor crea entidad y devuelve snapshots.
- El cliente muestra `Personaje listo`.
- El cliente muestra `Humano Guerrero`.
- La pantalla de personaje muestra una acción visible `Entrar a la mazmorra`.
- Al apretar `Entrar a la mazmorra`, el cliente monta una escena Three.js y envía `JOIN_DUNGEON`.
- El servidor mantiene una world instance en memoria.
- El servidor crea o reutiliza una entidad mínima para el personaje con `id`, `characterId`, `position` y `rotation`.
- El servidor responde `DUNGEON_JOINED`.
- El servidor emite `WORLD_SNAPSHOT` inmediatamente, de forma periódica y después de aplicar input.
- El cliente detecta WASD.
- El cliente emite `PLAYER_INPUT` con `forward`, `back`, `left`, `right` y `cameraYaw`.
- El servidor recibe `PLAYER_INPUT`.
- El servidor guarda input saneado en un input buffer.
- El servidor aplica movimiento en `movementSystem` sobre la posición autoritativa de la entidad.
- El cliente renderiza la nueva posición sólo cuando vuelve `WORLD_SNAPSHOT`.
- Si el servidor no actualiza la posición, el cliente no mueve el cilindro por cuenta propia.
- La escena 3D conserva piso, cuatro paredes, luz básica y cámara perspective.
- La cámara rota con arrastre horizontal del mouse sobre la escena.

## Cómo probar

Desde la raíz del repositorio:

```bash
npm install
npm run dev
```

Verificar:

1. La instalación termina sin errores.
2. El servidor informa en consola que está corriendo en `http://localhost:3000`.
3. El cliente informa la URL de Vite, por defecto `http://localhost:5173`, o la URL reenviada de Codespaces.
4. Al abrir el cliente se ve `Wini-s-dungeon-3d vPreliminar`.
5. El cliente muestra `Conectado como sesión <sessionId>`.
6. Escribir `Walter` en el input.
7. Apretar `Entrar como guest`.
8. El servidor imprime `ENTER_AS_GUEST received: <sessionId>`.
9. El servidor imprime `Guest account created: <accountId> (Walter)`.
10. El servidor imprime `Default character ready: <characterId> (Walter)`.
11. El cliente muestra `Personaje listo`.
12. El cliente muestra `Humano Guerrero`.
13. El cliente muestra el botón `Entrar a la mazmorra`.
14. Apretar `Entrar a la mazmorra`.
15. El servidor imprime `JOIN_DUNGEON received: <sessionId>`.
16. El cliente muestra una escena 3D.
17. El cliente muestra `Snapshot recibido: 1 entidad(es).`.
18. Verificar visualmente piso, cuatro paredes, cilindro, luz básica y cámara.
19. Apretar y mantener `W`.
20. Verificar que el cilindro se mueve por snapshots del servidor.
21. Soltar `W` y verificar que el cilindro se detiene.
22. Probar `A`, `S` y `D`.
23. Rotar la cámara con el mouse y verificar que el movimiento usa el `cameraYaw` enviado al servidor.
24. Confirmar que no aparece inventario, combate, loot, enemigos, dungeon procedural ni multiplayer jugable completo.

## Archivos relevantes

- `server/src/net/protocol.js`
- `server/src/net/socketServer.js`
- `server/src/world/ecsWorld.js`
- `server/src/world/inputBuffer.js`
- `server/src/world/worldInstanceService.js`
- `server/src/world/systems/movementSystem.js`
- `server/src/world/systems/snapshotSystem.js`
- `client/src/input/playerInputController.js`
- `client/src/net/socketClient.js`
- `client/src/main.js`
- `client/src/screens/gameScreen.js`
- `client/src/render/threeRenderer.js`
- `client/src/render/threeSceneFactory.js`
- `client/src/render/threeCameraController.js`

## Pendientes / limitaciones

- No hay multiplayer jugable completo.
- No hay control separado probado entre dos pestañas.
- No hay broadcasting global de snapshots a todas las pestañas como cierre de vPreliminar.
- No hay remoción visual de entidades desconectadas.
- No hay enemigos.
- No hay inventario.
- No hay combate.
- No hay loot.
- No hay dungeon procedural.

## Próximo hito sugerido

Hito 8 — Dos pestañas, dos jugadores.
