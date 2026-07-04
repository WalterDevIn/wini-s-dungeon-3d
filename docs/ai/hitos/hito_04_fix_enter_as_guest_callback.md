# Contrato de Implementación — Fix Hito 4: ENTER_AS_GUEST desde el botón

## Versión

Wini-s-dungeon-3d vPreliminar

## Objetivo cerrado

Corregir la integración del botón `Entrar como guest` para que ejecute el flujo real del Hito 4.

El problema detectado es que `client/src/main.js` pasa un callback `onEnterAsGuest(displayName)` a `createMenuScreen(...)`, pero `client/src/screens/menuScreen.js` no recibe parámetros ni llama ese callback. Por eso el botón solo muestra un mensaje local y no dispara `ENTER_AS_GUEST` al servidor.

Al terminar este fix:

1. El cliente debe seguir mostrando `Conectado como sesión <sessionId>`.
2. El usuario escribe `Walter`.
3. El usuario aprieta `Entrar como guest`.
4. `menuScreen.js` llama el callback `onEnterAsGuest(displayName)`.
5. `main.js` llama `socketClient.enterAsGuest(displayName)`.
6. `socketClient.js` emite `ENTER_AS_GUEST` al servidor.
7. El servidor procesa el flujo ya existente del Hito 4.
8. El cliente recibe `CHARACTER_READY`.
9. El cliente muestra `Personaje listo` y `Humano Guerrero`.

Este fix no debe rediseñar el Hito 4. Solo debe conectar el botón con el callback ya previsto.

## Resultado observable

Después de ejecutar desde la raíz:

```bash
npm install
npm run dev
```

El usuario puede abrir el cliente y comprobar:

- El cliente muestra `Conectado como sesión <sessionId>`.
- Al escribir `Walter` y apretar `Entrar como guest`, en consola del servidor aparece:

```txt
ENTER_AS_GUEST received: <sessionId>
Guest account created: <accountId> (Walter)
Default character ready: <characterId> (Walter)
```

- El cliente muestra:

```txt
Personaje listo
Humano Guerrero
```

- Al recargar, dejar el input vacío o con espacios y apretar el botón, el servidor crea account con `(Guest)`.

## Alcance incluido

- Modificar `client/src/screens/menuScreen.js` para que `createMenuScreen` reciba un objeto opcional de opciones.
- Leer de ese objeto el callback `onEnterAsGuest`.
- En el click del botón:
  - Calcular `displayName` con `nameInput.value.trim() || 'Guest'`.
  - Mantener el mensaje visual local `Entrando como guest: <displayName>` si se desea.
  - Llamar `onEnterAsGuest?.(displayName)`.
- Mantener intacta la visualización de conexión:
  - `setConnectedSession(sessionId)`.
  - `setDisconnected()`.
- Confirmar que `client/src/main.js` sigue pasando `onEnterAsGuest(displayName)` a `createMenuScreen(...)`.
- Actualizar `PROJECT_STATE.md` solo si se quiere registrar que el fix quedó aplicado.

Implementación mínima esperada en `client/src/screens/menuScreen.js`:

```js
export function createMenuScreen({ onEnterAsGuest } = {}) {
  // ...

  button.addEventListener('click', () => {
    const displayName = nameInput.value.trim() || 'Guest';
    message.textContent = `Entrando como guest: ${displayName}`;
    onEnterAsGuest?.(displayName);
  });

  // ...
}
```

## Fuera de alcance

Queda prohibido implementar o preparar en este fix:

- Cambios de protocolo.
- Nuevos eventos.
- Cambios en `ENTER_AS_GUEST`.
- Cambios en `GUEST_READY`.
- Cambios en `CHARACTER_READY`.
- Reescritura de `socketClient.js`.
- Reescritura de `socketServer.js`.
- Reescritura de servicios de auth o character.
- Login real.
- Persistencia en disco.
- Base de datos.
- Selección real entre varios personajes.
- Creación configurable de personaje.
- Mundo servidor.
- ECS.
- Sala 3D.
- Three.js.
- Render 3D.
- Cilindros de jugador.
- Movimiento.
- Input de movimiento.
- Snapshots.
- Inventario.
- Combate.
- Loot.
- Multiplayer jugable.
- Sincronización de dos pestañas.
- Refactor visual amplio.
- Arquitectura especulativa.

## Archivos permitidos

El Implementador puede modificar únicamente:

```txt
client/src/screens/menuScreen.js
PROJECT_STATE.md
```

`PROJECT_STATE.md` es opcional y solo debe tocarse para registrar que el fix quedó aplicado.

## Archivos permitidos para crear

Ninguno.

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
client/src/main.js
client/src/net/socketClient.js
client/src/screens/characterSelectScreen.js
client/src/ui/screenRouter.js
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

- client/screens: corrección del callback del botón guest.
- docs estado: `PROJECT_STATE.md` solo si se necesita registrar cierre del fix.

## Secuencia de implementación sugerida

1. Abrir `client/src/main.js` solo para leer y confirmar que existe:

```js
createMenuScreen({
  onEnterAsGuest(displayName) {
    socketClient?.enterAsGuest(displayName);
  },
});
```

2. Abrir `client/src/screens/menuScreen.js`.
3. Cambiar la firma de:

```js
export function createMenuScreen() {
```

por:

```js
export function createMenuScreen({ onEnterAsGuest } = {}) {
```

4. En el listener del botón, después de calcular `displayName`, llamar:

```js
onEnterAsGuest?.(displayName);
```

5. Mantener el fallback `Guest` para input vacío o con espacios.
6. No tocar servidor.
7. Ejecutar la prueba manual obligatoria.
8. Registrar el fix en `PROJECT_STATE.md` solo si se considera necesario.

## Prueba manual obligatoria

Desde la raíz del repo:

```bash
npm install
npm run dev
```

Verificar obligatoriamente:

1. El servidor arranca sin errores.
2. El cliente abre en navegador.
3. El cliente muestra:

```txt
Conectado como sesión <sessionId>
```

4. Escribir:

```txt
Walter
```

5. Apretar:

```txt
Entrar como guest
```

6. Verificar en consola del servidor:

```txt
ENTER_AS_GUEST received: <sessionId>
Guest account created: <accountId> (Walter)
Default character ready: <characterId> (Walter)
```

7. Verificar en cliente:

```txt
Personaje listo
Humano Guerrero
```

8. Recargar la pestaña.
9. Dejar el input vacío o escribir solo espacios.
10. Apretar `Entrar como guest`.
11. Verificar en consola del servidor:

```txt
Guest account created: <accountId> (Guest)
Default character ready: <characterId> (Guest)
```

12. Confirmar que no aparece sala 3D, mundo, snapshots, movimiento, inventario, combate ni multiplayer jugable.

## Criterio de cierre

El fix se considera cerrado solo si se cumplen todas estas condiciones:

- `client/src/screens/menuScreen.js` recibe `{ onEnterAsGuest } = {}`.
- El click de `Entrar como guest` llama `onEnterAsGuest?.(displayName)`.
- `displayName` usa fallback `Guest` si el input está vacío o solo tiene espacios.
- El servidor recibe `ENTER_AS_GUEST` al apretar el botón.
- Aparecen los logs esperados para `Walter`.
- El cliente muestra `Personaje listo`.
- El cliente muestra `Humano Guerrero`.
- El caso vacío crea account con `(Guest)`.
- No se tocó servidor.
- No se implementó alcance de hitos futuros.
- No se creó ninguna rama.
- No se tocaron archivos fuera de los permitidos.

## Riesgos / notas

- Este fix es deliberadamente pequeño.
- El servidor ya tenía implementado el flujo; el defecto estaba en la pantalla cliente.
- No convertir este fix en refactor de UI.
- No cambiar nombres de eventos.
- No cambiar payloads.
- No adelantar Hito 5.
- Si hay que elegir entre una solución elegante y una solución mínima verificable, elegir la mínima verificable.
