# Contrato de Implementación — Hito 5: Entrar a una sala 3D local

## Versión

Wini-s-dungeon-3d vPreliminar

## Objetivo cerrado

Probar Three.js en el cliente después de tener un personaje default listo, sin multiplayer todavía.

Al terminar este hito, el flujo debe ser:

1. El cliente abre.
2. El cliente se conecta al servidor y recibe `SESSION_CREATED`.
3. El usuario entra como guest.
4. El servidor responde `CHARACTER_READY`.
5. El cliente muestra `Personaje listo` y `Humano Guerrero`.
6. El usuario aprieta `Entrar a la mazmorra`.
7. El cliente muestra una sala 3D local.
8. En la sala se ve un cilindro propio.
9. La cámara puede rotar.

Este hito prueba representación visual local. El servidor todavía no crea mundo, no manda snapshots y no mueve entidades. El cilindro puede ser local del cliente solo para visualizar la idea.

## Resultado observable

Después de ejecutar desde la raíz:

```bash
npm install
npm run dev
```

El usuario puede abrir el cliente en navegador y comprobar que:

- Puede entrar como guest y ver el personaje default `Humano Guerrero`.
- Aparece un botón o acción visible `Entrar a la mazmorra`.
- Al apretar ese botón, se muestra una escena 3D.
- La escena contiene:
  - Piso.
  - Cuatro paredes.
  - Cilindro del jugador.
  - Luz básica.
  - Cámara.
- La cámara puede rotar con mouse o con una interacción simple documentada en pantalla.

## Alcance incluido

- Agregar Three.js al cliente.
- Crear `client/src/screens/gameScreen.js`.
- Crear `client/src/render/threeRenderer.js`.
- Crear `client/src/render/threeSceneFactory.js`.
- Crear `client/src/render/threeCameraController.js`.
- Actualizar `client/src/screens/characterSelectScreen.js` para agregar una acción visible `Entrar a la mazmorra`.
- Actualizar `client/src/main.js` para montar `gameScreen` cuando el usuario aprieta `Entrar a la mazmorra`.
- Renderizar una sala 3D local mínima:
  - piso plano.
  - cuatro paredes simples.
  - un cilindro del jugador.
  - una luz básica.
  - una cámara visible/usable.
- Implementar rotación de cámara mínima. Decisión cerrada: usar arrastre de mouse sobre el canvas para orbitar o rotar la cámara alrededor del centro de la sala.
- Mantener la escena 3D aislada del servidor. No debe pedir `JOIN_DUNGEON`, no debe recibir `WORLD_SNAPSHOT` y no debe depender de una simulación servidor.
- Mantener funcionando el flujo de Hitos 1 a 4.
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
- Mundo servidor.
- ECS servidor.
- Entidades del servidor.
- `JOIN_DUNGEON`.
- `DUNGEON_JOINED`.
- `WORLD_SNAPSHOT`.
- Snapshots.
- Movimiento servidor.
- Input de movimiento.
- Sincronización de posición.
- Multiplayer jugable.
- Dos pestañas sincronizadas.
- Enemigos.
- IA.
- Física de objetos.
- Colisiones.
- Mapa generado.
- Rooms de Socket.IO.
- Texturas complejas.
- Animaciones complejas.
- UI avanzada.
- Arquitectura especulativa para hitos futuros.

## Archivos permitidos

El Implementador puede modificar estos archivos si existen:

```txt
PROJECT_STATE.md
client/package.json
client/package-lock.json
package-lock.json
client/src/main.js
client/src/screens/characterSelectScreen.js
client/src/screens/gameScreen.js
client/src/render/threeRenderer.js
client/src/render/threeSceneFactory.js
client/src/render/threeCameraController.js
```

Solo si es estrictamente necesario para mantener scripts o estilos mínimos funcionando, también puede modificar:

```txt
client/index.html
```

## Archivos permitidos para crear

El Implementador puede crear únicamente estos archivos si no existen:

```txt
client/src/screens/gameScreen.js
client/src/render/threeRenderer.js
client/src/render/threeSceneFactory.js
client/src/render/threeCameraController.js
```

También puede crear la carpeta mínima necesaria:

```txt
client/src/render/
```

## Archivos prohibidos

No tocar ni crear archivos fuera de la lista permitida.

Prohibido especialmente modificar:

```txt
docs/ai/vpreliminar_hitos_multiplayer_3d.txt
docs/ai/roles/PREPARADOR_DE_HITO.md
docs/ai/hitos/hito_01_proyecto_arranca.md
docs/ai/hitos/hito_02_pantalla_guest.md
docs/ai/hitos/hito_03_socket_cliente_servidor.md
docs/ai/hitos/hito_04_guest_real_personaje_default.md
docs/ai/hitos/hito_04_fix_enter_as_guest_callback.md
docs/ai/hitos/hito_04_fix_2_codespaces_socket_url.md
docs/ai/hitos/hito_05_sala_3d_local.md
server/src/index.js
server/src/net/*
server/src/auth/*
server/src/characters/*
server/src/world/*
server/src/simulation/*
server/src/ecs/*
server/src/game/*
client/src/net/socketClient.js
client/src/screens/menuScreen.js
client/src/ui/screenRouter.js
client/src/world/*
client/src/ecs/*
client/src/input/*
client/src/domain/*
```

No crear ramas. El trabajo de vPreliminar se hace directo sobre la rama principal/default del repo.

## Capas tocadas

- client/screens: pantalla de personaje y pantalla de juego local.
- client/render: renderer Three.js, escena y controlador de cámara.
- client/app: coordinación para pasar de personaje listo a sala 3D local.
- client/package: dependencia `three`.
- docs estado: `PROJECT_STATE.md` solo si se necesita registrar cierre del hito.

## Secuencia de implementación sugerida

1. Revisar que el Hito 4 y sus fixes funcionen: conexión, guest real, personaje default y Codespaces si aplica.
2. Instalar `three` en el cliente.
3. Crear `client/src/render/threeSceneFactory.js` con una función que construya la escena mínima:
   - `THREE.Scene`.
   - piso.
   - cuatro paredes.
   - cilindro del jugador.
   - luz ambiental o direccional básica.
   - cámara perspective.
4. Crear `client/src/render/threeCameraController.js` con control mínimo de rotación por arrastre de mouse sobre el canvas o contenedor.
5. Crear `client/src/render/threeRenderer.js` con responsabilidad de:
   - crear `WebGLRenderer`.
   - montar canvas en un contenedor.
   - iniciar loop de render.
   - exponer función de cleanup si la pantalla se desmonta.
6. Crear `client/src/screens/gameScreen.js` para montar el renderer 3D dentro de una pantalla DOM.
7. Actualizar `client/src/screens/characterSelectScreen.js` para aceptar un callback `onEnterDungeon` y renderizar botón `Entrar a la mazmorra`.
8. Actualizar `client/src/main.js` para pasar `onEnterDungeon` a la pantalla de personaje y montar `gameScreen` al apretar el botón.
9. No modificar servidor.
10. No emitir eventos nuevos.
11. Ejecutar prueba manual obligatoria.
12. Registrar el cierre del hito en `PROJECT_STATE.md` si corresponde.

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

7. Verificar que aparece un botón o acción visible:

```txt
Entrar a la mazmorra
```

8. Apretar `Entrar a la mazmorra`.
9. Verificar que aparece una escena 3D.
10. Verificar visualmente:

```txt
Piso visible.
Cuatro paredes visibles.
Cilindro del jugador visible.
Luz básica suficiente para ver la sala.
Cámara funcionando.
```

11. Rotar la cámara con la interacción implementada.
12. Confirmar que el servidor no imprime ni recibe `JOIN_DUNGEON`.
13. Confirmar que el cliente no espera ni procesa `WORLD_SNAPSHOT`.
14. Confirmar que no hay movimiento del jugador todavía.
15. Confirmar que no aparece inventario, combate, loot, enemigos, dungeon procedural ni multiplayer jugable.

## Criterio de cierre

El Hito 5 se considera cerrado solo si se cumplen todas estas condiciones:

- `npm install` funciona desde la raíz.
- `npm run dev` funciona desde la raíz.
- El flujo de Hito 4 sigue funcionando.
- El cliente muestra `Personaje listo` y `Humano Guerrero` antes de entrar a la sala.
- Existe acción visible `Entrar a la mazmorra`.
- Al apretar la acción, se muestra una sala 3D local.
- La sala contiene piso, cuatro paredes, cilindro del jugador, luz básica y cámara.
- La cámara puede rotar.
- No se implementó mundo servidor.
- No se implementó `JOIN_DUNGEON`.
- No se implementó `WORLD_SNAPSHOT`.
- No se implementó movimiento servidor.
- No se implementó multiplayer jugable.
- No se creó ninguna rama.
- No se tocaron archivos fuera de los permitidos.

## Riesgos / notas

- Este hito habilita Three.js por primera vez, pero solo del lado cliente.
- El cilindro del jugador puede ser local porque el objetivo es probar visualización, no autoridad del servidor.
- No confundir sala 3D local con mundo servidor. El mundo servidor empieza en Hito 6.
- No adelantar input ni movimiento. Eso corresponde al Hito 7.
- No adelantar dos pestañas sincronizadas. Eso corresponde al Hito 8.
- Mantener geometría simple. El objetivo es ver la idea, no cerrar estética final.
- Si hay que elegir entre una solución elegante y una solución mínima verificable, elegir la mínima verificable.
