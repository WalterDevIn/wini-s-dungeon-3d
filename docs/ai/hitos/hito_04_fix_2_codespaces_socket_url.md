# Contrato de Implementación — Fix Hito 4.2: URL Socket.IO en Codespaces

## Versión

Wini-s-dungeon-3d vPreliminar

## Objetivo cerrado

Corregir la URL que usa el cliente para conectarse al servidor Socket.IO cuando la app corre en GitHub Codespaces.

Problema observado:

- El cliente se abre desde una URL de Codespaces del puerto 5173.
- El cliente intenta conectar Socket.IO a `http://localhost:3000`.
- Desde el navegador, esa URL no apunta al servidor dentro del Codespace.
- La consola muestra errores `ERR_CONNECTION_REFUSED` contra `localhost:3000/socket.io/...`.

Al terminar este fix, el cliente debe resolver la URL correcta del servidor:

- En local normal: `http://localhost:3000`.
- En Codespaces: la URL equivalente del mismo Codespace, pero usando el puerto 3000 en vez del 5173.

Este fix no cambia el protocolo del Hito 4. Solo corrige cómo el cliente encuentra el servidor.

## Resultado observable

Después de ejecutar:

```bash
npm install
npm run dev
```

En Codespaces:

- Ya no aparecen errores contra `localhost:3000/socket.io/...`.
- El cliente muestra `Conectado como sesión <sessionId>`.
- El flujo del Hito 4 funciona: escribir `Walter`, apretar `Entrar como guest`, ver `Personaje listo` y `Humano Guerrero`.

En local normal:

- El cliente sigue conectando contra `http://localhost:3000`.
- El cliente sigue mostrando `Conectado como sesión <sessionId>`.

## Alcance incluido

- Modificar únicamente la resolución de URL en `client/src/net/socketClient.js`.
- Mantener prioridad para `import.meta.env.VITE_SERVER_URL` si existe.
- Si `window.location.hostname` es `localhost` o `127.0.0.1`, usar `http://localhost:3000`.
- Si `window.location.hostname` termina en `.app.github.dev`, construir la URL del servidor reemplazando el segmento de puerto `-5173.` por `-3000.` y usando el mismo protocolo de la página.
- Mantener intactos los eventos existentes:
  - `SESSION_CREATED`
  - `ENTER_AS_GUEST`
  - `GUEST_READY`
  - `CHARACTER_READY`
- Mantener intacto el fix anterior del callback `onEnterAsGuest`.
- Actualizar `PROJECT_STATE.md` solo si se quiere registrar que el fix quedó aplicado.

Implementación sugerida para `getServerUrl()`:

```js
function getServerUrl() {
  const configuredUrl = import.meta.env.VITE_SERVER_URL;

  if (configuredUrl) {
    return configuredUrl;
  }

  const { protocol, hostname } = window.location;

  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'http://localhost:3000';
  }

  if (hostname.endsWith('.app.github.dev')) {
    return `${protocol}//${hostname.replace('-5173.', '-3000.')}`;
  }

  return 'http://localhost:3000';
}
```

El Implementador puede ajustar la detección mínima si el host real de Codespaces difiere, pero no debe crear un sistema complejo de configuración.

## Fuera de alcance

Queda prohibido implementar o preparar en este fix:

- Cambios de protocolo.
- Nuevos eventos Socket.IO.
- Cambios en payloads.
- Cambios en servidor.
- Reescritura de servicios de auth o character.
- Login real.
- Base de datos.
- Mundo servidor.
- ECS.
- Sala 3D.
- Three.js.
- Movimiento.
- Snapshots.
- Inventario.
- Combate.
- Loot.
- Multiplayer jugable.
- Refactor visual.
- Arquitectura especulativa.

## Archivos permitidos

El Implementador puede modificar únicamente:

```txt
client/src/net/socketClient.js
PROJECT_STATE.md
```

`PROJECT_STATE.md` es opcional y solo debe tocarse para registrar que el fix quedó aplicado.

## Archivos permitidos para crear

Ninguno.

## Archivos prohibidos

No tocar ni crear archivos fuera de la lista permitida.

Prohibido especialmente modificar:

```txt
client/src/main.js
client/src/screens/menuScreen.js
client/src/screens/characterSelectScreen.js
client/src/ui/screenRouter.js
server/src/index.js
server/src/net/socketServer.js
server/src/net/protocol.js
server/src/auth/sessionService.js
server/src/auth/accountService.js
server/src/characters/characterService.js
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

- client/net: resolución de URL para Socket.IO.
- docs estado: `PROJECT_STATE.md` solo si se necesita registrar cierre del fix.

## Secuencia de implementación sugerida

1. Abrir `client/src/net/socketClient.js`.
2. Ubicar `getServerUrl()`.
3. Mantener `VITE_SERVER_URL` como override explícito.
4. Agregar detección de local normal.
5. Agregar detección de Codespaces con `.app.github.dev`.
6. Reemplazar `-5173.` por `-3000.` para obtener el host del servidor.
7. No tocar servidor.
8. Ejecutar prueba manual en Codespaces y local si es posible.
9. Registrar el fix en `PROJECT_STATE.md` solo si se considera necesario.

## Prueba manual obligatoria

Desde la raíz:

```bash
npm install
npm run dev
```

En Codespaces:

1. Abrir la URL del cliente del puerto 5173.
2. Abrir DevTools.
3. Confirmar que ya no aparecen errores contra `localhost:3000/socket.io/...`.
4. Confirmar que el cliente muestra `Conectado como sesión <sessionId>`.
5. Escribir `Walter`.
6. Apretar `Entrar como guest`.
7. Verificar en consola del servidor:

```txt
ENTER_AS_GUEST received: <sessionId>
Guest account created: <accountId> (Walter)
Default character ready: <characterId> (Walter)
```

8. Verificar en cliente:

```txt
Personaje listo
Humano Guerrero
```

9. Recargar la pestaña.
10. Dejar el input vacío o con espacios.
11. Apretar `Entrar como guest`.
12. Verificar que el servidor crea account con `(Guest)`.
13. Confirmar que no aparece sala 3D, mundo, snapshots, movimiento, inventario, combate ni multiplayer jugable.

## Criterio de cierre

El fix se considera cerrado solo si:

- `getServerUrl()` usa `VITE_SERVER_URL` si existe.
- En local normal, el cliente conecta a `http://localhost:3000`.
- En Codespaces, el cliente deja de intentar conectar a `localhost:3000` desde el navegador.
- En Codespaces, el cliente intenta conectar a la URL equivalente del puerto 3000.
- Desaparece `ERR_CONNECTION_REFUSED` contra `localhost:3000/socket.io/...`.
- El cliente muestra `Conectado como sesión <sessionId>`.
- El flujo `ENTER_AS_GUEST` funciona con `Walter`.
- El flujo con nombre vacío normaliza a `Guest`.
- No se tocó servidor.
- No se implementó alcance de hitos futuros.
- No se creó ninguna rama.
- No se tocaron archivos fuera de los permitidos.

## Riesgos / notas

- Este fix es de entorno, no de gameplay.
- Si el puerto 3000 no está reenviado en Codespaces, este fix no alcanza por sí solo.
- No convertir este fix en un sistema complejo de environments.
- No adelantar Hito 5.
