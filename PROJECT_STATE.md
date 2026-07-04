# PROJECT_STATE — Wini-s-dungeon-3d

## Versión actual

Wini-s-dungeon-3d vPreliminar

## Hito implementado

Hito 6 — Mundo servidor en memoria

## Estado

Cerrado.

## Qué funciona

- Existe estructura mínima separada de cliente y servidor.
- Desde la raíz, `npm install` instala el workspace del cliente, el workspace del servidor y las dependencias del proyecto.
- Desde la raíz, `npm run dev` levanta cliente y servidor en paralelo.
- El flujo de Hito 4 sigue funcionando: el cliente se conecta al servidor, entra como guest y recibe personaje default.
- El cliente muestra `Personaje listo`.
- El cliente muestra `Humano Guerrero`.
- La pantalla de personaje muestra una acción visible `Entrar a la mazmorra`.
- Al apretar `Entrar a la mazmorra`, el cliente monta una escena Three.js.
- El cliente emite `JOIN_DUNGEON` al servidor.
- El servidor mantiene una world instance en memoria.
- El servidor crea o reutiliza una entidad mínima para el personaje con `id`, `characterId`, `position` y `rotation`.
- El servidor responde `DUNGEON_JOINED`.
- El servidor emite `WORLD_SNAPSHOT` inmediatamente y luego de forma periódica.
- El cliente renderiza cilindros desde `WORLD_SNAPSHOT`.
- El cilindro del jugador ya no nace como verdad local del cliente en `threeSceneFactory.js`.
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
18. Verificar visualmente piso, cuatro paredes, luz básica y cámara.
19. Verificar que el cilindro aparece después del snapshot servidor.
20. Arrastrar el mouse horizontalmente sobre la escena y verificar que la cámara rota alrededor de la sala.
21. Confirmar que no hay movimiento del jugador todavía.
22. Confirmar que no aparece inventario, combate, loot, enemigos, dungeon procedural ni multiplayer jugable.

## Archivos relevantes

- `server/src/net/protocol.js`
- `server/src/net/socketServer.js`
- `server/src/world/ecsWorld.js`
- `server/src/world/worldInstanceService.js`
- `server/src/world/systems/snapshotSystem.js`
- `client/src/net/socketClient.js`
- `client/src/main.js`
- `client/src/screens/gameScreen.js`
- `client/src/render/threeRenderer.js`
- `client/src/render/threeSceneFactory.js`
- `client/src/render/threeCameraController.js`

## Pendientes / limitaciones

- No hay movimiento servidor.
- No hay input de movimiento.
- No hay sincronización de posición cambiante.
- No hay multiplayer jugable completo.
- No hay control separado por entidad entre dos pestañas.
- No hay enemigos.
- No hay inventario.
- No hay combate.
- No hay loot.
- No hay dungeon procedural.

## Próximo hito sugerido

Hito 7 — Input cliente, movimiento servidor.
