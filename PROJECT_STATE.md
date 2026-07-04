# PROJECT_STATE — Wini-s-dungeon-3d

## Versión actual

Wini-s-dungeon-3d vPreliminar

## Hito implementado

Hito 5 — Entrar a una sala 3D local

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
- Al apretar `Entrar a la mazmorra`, el cliente monta una escena Three.js local.
- La escena 3D local contiene piso, cuatro paredes, cilindro del jugador, luz básica y cámara perspective.
- La cámara rota con arrastre horizontal del mouse sobre la escena.
- La escena 3D no emite `JOIN_DUNGEON`.
- La escena 3D no usa `WORLD_SNAPSHOT`.
- La escena 3D no depende de mundo servidor.

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
8. El cliente muestra `Personaje listo`.
9. El cliente muestra `Humano Guerrero`.
10. El cliente muestra el botón `Entrar a la mazmorra`.
11. Apretar `Entrar a la mazmorra`.
12. Verificar que aparece una escena 3D.
13. Verificar visualmente piso, cuatro paredes, cilindro del jugador, luz básica y cámara.
14. Arrastrar el mouse horizontalmente sobre la escena y verificar que la cámara rota alrededor de la sala.
15. Confirmar que el servidor no imprime ni recibe `JOIN_DUNGEON`.
16. Confirmar que el cliente no espera ni procesa `WORLD_SNAPSHOT`.
17. Confirmar que no hay movimiento del jugador todavía.
18. Confirmar que no aparece inventario, combate, loot, enemigos, dungeon procedural ni multiplayer jugable.

## Archivos relevantes

- `client/package.json`
- `client/src/main.js`
- `client/src/screens/characterSelectScreen.js`
- `client/src/screens/gameScreen.js`
- `client/src/render/threeRenderer.js`
- `client/src/render/threeSceneFactory.js`
- `client/src/render/threeCameraController.js`

## Pendientes / limitaciones

- No hay mundo servidor.
- No hay `JOIN_DUNGEON`.
- No hay `DUNGEON_JOINED`.
- No hay `WORLD_SNAPSHOT`.
- No hay snapshots.
- No hay movimiento servidor.
- No hay input de movimiento.
- No hay sincronización de posición.
- No hay multiplayer jugable.
- No hay enemigos.
- No hay inventario.
- No hay combate.
- No hay loot.
- No hay dungeon procedural.

## Próximo hito sugerido

Hito 6 — Mundo servidor en memoria.
