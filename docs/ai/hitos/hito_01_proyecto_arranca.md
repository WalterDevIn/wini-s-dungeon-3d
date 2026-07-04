# Contrato de Implementación — Hito 1: Proyecto arranca

## Versión

Wini-s-dungeon-3d vPreliminar

## Objetivo cerrado

Crear la estructura mínima ejecutable del proyecto para comprobar que el repositorio vive como aplicación cliente-servidor básica.

Al terminar este hito debe existir un proyecto con `client/` y `server/` separados, ejecutable desde la raíz con:

```bash
npm install
npm run dev
```

El cliente debe abrir en navegador y mostrar una pantalla inicial simple con el texto exacto:

```txt
Wini-s-dungeon-3d vPreliminar
```

El servidor debe poder arrancar y dejar constancia visible en consola de que está corriendo.

Este hito no implementa todavía conexión cliente-servidor real desde el navegador, sockets, guest, mundo, movimiento, 3D ni multiplayer.

## Resultado observable

Después de ejecutar `npm install` y `npm run dev` desde la raíz del repo:

- El servidor queda corriendo sin errores.
- El cliente queda disponible en navegador.
- Al abrir el cliente se ve una pantalla inicial con el texto `Wini-s-dungeon-3d vPreliminar`.
- En consola se puede identificar que el servidor inició correctamente.

## Alcance incluido

- Crear o ajustar el `package.json` raíz para instalar dependencias y levantar cliente y servidor con un único comando `npm run dev`.
- Crear o ajustar `client/package.json`.
- Crear o ajustar `client/index.html`.
- Crear o ajustar `client/src/main.js`.
- Crear o ajustar `server/package.json`.
- Crear o ajustar `server/src/index.js`.
- Agregar una pantalla inicial HTML/JS mínima, sin framework obligatorio, que muestre el nombre de la versión.
- Agregar un servidor HTTP mínimo que pueda arrancar y mostrar un log claro en consola.
- Usar tooling simple y estable para desarrollo local, por ejemplo Vite para cliente y Node/Express para servidor, solo si hace falta.
- Dejar scripts claros para que `npm install` y `npm run dev` funcionen desde la raíz.
- Crear o actualizar `PROJECT_STATE.md` solo para registrar que el Hito 1 quedó implementado cuando el Implementador termine.

## Fuera de alcance

Queda prohibido implementar o preparar en este hito:

- Combate.
- Loot.
- Dungeon procedural.
- Cadáver.
- Inventario.
- Login real.
- Modo guest.
- Multiplayer.
- Socket.IO o cualquier sistema de sockets.
- Three.js o cualquier render 3D.
- Mundo servidor.
- ECS.
- Movimiento de jugador.
- Cilindros de jugador.
- Sala 3D.
- Snapshots de mundo.
- Persistencia real.
- Base de datos.
- Autenticación.
- Selección de personaje.
- Clases reales.
- Enemigos.
- UI avanzada.
- Ruteo de pantallas.
- Arquitectura especulativa para hitos futuros.

## Archivos permitidos

El Implementador puede modificar estos archivos si existen:

```txt
package.json
package-lock.json
PROJECT_STATE.md
client/package.json
client/package-lock.json
client/index.html
client/src/main.js
server/package.json
server/package-lock.json
server/src/index.js
```

## Archivos permitidos para crear

El Implementador puede crear únicamente estos archivos si no existen:

```txt
package.json
package-lock.json
PROJECT_STATE.md
client/package.json
client/package-lock.json
client/index.html
client/src/main.js
server/package.json
server/package-lock.json
server/src/index.js
```

También puede crear las carpetas mínimas necesarias para contener esos archivos:

```txt
client/
client/src/
server/
server/src/
```

## Archivos prohibidos

No tocar ni crear archivos fuera de la lista permitida.

Prohibido especialmente crear o modificar:

```txt
docs/ai/vpreliminar_hitos_multiplayer_3d.txt
docs/ai/roles/PREPARADOR_DE_HITO.md
docs/ai/hitos/hito_01_proyecto_arranca.md
client/src/screens/*
client/src/ui/*
client/src/net/*
client/src/render/*
server/src/net/*
server/src/auth/*
server/src/characters/*
server/src/world/*
server/src/simulation/*
server/src/ecs/*
server/src/game/*
```

No crear ramas. El trabajo de vPreliminar se hace directo sobre la rama principal/default del repo.

## Capas tocadas

- raíz del proyecto: scripts de instalación y desarrollo.
- client/app mínimo: entrada del cliente y pantalla inicial básica.
- server/app mínimo: arranque del servidor HTTP y log de estado.
- docs estado: `PROJECT_STATE.md` solo si se necesita registrar cierre del hito.

## Secuencia de implementación sugerida

1. Revisar si ya existen `package.json`, `client/` y `server/`.
2. Si no existen, crear la estructura mínima:

```txt
wini-s-dungeon-3d/
  package.json
  PROJECT_STATE.md
  client/
    package.json
    index.html
    src/
      main.js
  server/
    package.json
    src/
      index.js
```

3. Configurar el `package.json` raíz para que:

```bash
npm install
npm run dev
```

funcionen desde la raíz.

4. Configurar el cliente con un servidor de desarrollo simple. Decisión recomendada: Vite con JavaScript plano.
5. Implementar `client/index.html` con un contenedor raíz simple.
6. Implementar `client/src/main.js` para renderizar en pantalla el texto exacto `Wini-s-dungeon-3d vPreliminar`.
7. Configurar el servidor con un arranque HTTP mínimo. Decisión recomendada: Node + Express o Node HTTP nativo. Mantenerlo simple.
8. Implementar `server/src/index.js` para levantar el servidor y mostrar un log claro, por ejemplo `Server running on http://localhost:3000`.
9. Configurar `npm run dev` raíz para levantar cliente y servidor en paralelo. Decisión recomendada: usar `concurrently` o equivalente simple.
10. Ejecutar `npm install` desde la raíz.
11. Ejecutar `npm run dev` desde la raíz.
12. Abrir la URL del cliente indicada por la consola.
13. Verificar pantalla inicial y servidor corriendo.
14. Si existe o se crea `PROJECT_STATE.md`, registrar de forma breve que el Hito 1 quedó cerrado, con fecha y prueba manual ejecutada.

## Prueba manual obligatoria

Desde la raíz del repo:

```bash
npm install
npm run dev
```

Verificar obligatoriamente:

1. La instalación termina sin errores.
2. El comando `npm run dev` levanta cliente y servidor.
3. La consola muestra que el servidor está corriendo.
4. La consola muestra la URL del cliente o permite deducirla claramente.
5. Al abrir el cliente en navegador se ve el texto exacto:

```txt
Wini-s-dungeon-3d vPreliminar
```

6. No aparece ninguna pantalla de login, guest, personaje, sala 3D, socket, multiplayer ni gameplay.

## Criterio de cierre

El Hito 1 se considera cerrado solo si se cumplen todas estas condiciones:

- Existe estructura mínima separada de cliente y servidor.
- `npm install` funciona desde la raíz.
- `npm run dev` funciona desde la raíz.
- El servidor arranca sin errores.
- El cliente abre en navegador.
- La pantalla inicial visible contiene el texto exacto `Wini-s-dungeon-3d vPreliminar`.
- No se implementó ningún alcance perteneciente a hitos posteriores.
- No se creó ninguna rama.
- No se tocaron archivos fuera de los permitidos.

## Riesgos / notas

- Este hito prueba vida del proyecto, no arquitectura final.
- No adelantar Socket.IO: corresponde al Hito 3.
- No adelantar guest: corresponde al Hito 2 y Hito 4.
- No adelantar Three.js: corresponde al Hito 5.
- No adelantar world servidor ni snapshots: corresponden al Hito 6.
- No adelantar input ni movimiento: corresponden al Hito 7.
- No adelantar dos pestañas sincronizadas: corresponde al Hito 8.
- Mantener el cliente extremadamente simple: una pantalla inicial visible alcanza.
- Mantener el servidor extremadamente simple: arrancar y loguear estado alcanza.
- Si una dependencia no es necesaria, no agregarla.
- Si hay que elegir entre una solución elegante y una solución mínima verificable, elegir la mínima verificable.
