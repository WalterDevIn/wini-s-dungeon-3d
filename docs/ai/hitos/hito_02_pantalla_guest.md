# Contrato de Implementación — Hito 2: Pantalla de entrada guest

## Versión

Wini-s-dungeon-3d vPreliminar

## Objetivo cerrado

Crear la primera pantalla de entrada local del cliente antes de cualquier simulación.

Al terminar este hito, el cliente debe mostrar una pantalla simple con:

```txt
Wini-s-dungeon-3d vPreliminar

Nombre:
[ input ]

[ Entrar como guest ]
```

Al escribir un nombre y apretar el botón `Entrar como guest`, la pantalla debe responder localmente con el mensaje:

```txt
Entrando como guest: Walter
```

usando el nombre que haya escrito el usuario.

Este hito no conecta el botón al servidor. No crea sesión real. No crea account guest real. No crea personaje. No usa sockets.

## Resultado observable

Después de ejecutar desde la raíz:

```bash
npm install
npm run dev
```

El usuario puede abrir el cliente en navegador y comprobar que:

- Se ve el título `Wini-s-dungeon-3d vPreliminar`.
- Se ve un campo de texto rotulado `Nombre:`.
- Se ve un botón `Entrar como guest`.
- Puede escribir un nombre en el input.
- Al apretar el botón, aparece o se actualiza un mensaje local con el formato `Entrando como guest: <nombre>`.
- La respuesta ocurre sin recargar la página.

## Alcance incluido

- Mantener funcionando la estructura creada en el Hito 1.
- Crear una pantalla de menú local para entrada guest.
- Crear un router mínimo de pantallas solo si ayuda a separar `main.js` de la pantalla.
- Actualizar `client/src/main.js` para montar la pantalla inicial.
- Crear `client/src/screens/menuScreen.js`.
- Crear `client/src/ui/screenRouter.js`.
- Implementar input de nombre.
- Implementar botón `Entrar como guest`.
- Implementar respuesta local al click del botón.
- Validar mínimamente el nombre para evitar mensaje vacío. Decisión cerrada: si el input está vacío o solo tiene espacios, usar `Guest` como nombre mostrado.
- Mantener estilo visual mínimo y funcional. Puede ser HTML simple con CSS inline o DOM generado desde JS, sin introducir sistema visual complejo.
- Actualizar `PROJECT_STATE.md` solo para registrar el cierre del hito cuando el Implementador termine.

## Fuera de alcance

Queda prohibido implementar o preparar en este hito:

- Combate.
- Loot.
- Dungeon procedural.
- Cadáver.
- Inventario.
- Login real.
- Account guest real en servidor.
- Sesión real.
- Persistencia.
- Base de datos.
- Socket.IO.
- WebSocket nativo.
- Cualquier conexión cliente-servidor desde el botón.
- Eventos de protocolo como `ENTER_AS_GUEST`, `SESSION_CREATED`, `GUEST_READY` o similares.
- Multiplayer.
- Three.js.
- Render 3D.
- Sala 3D.
- Cilindros de jugador.
- Movimiento.
- Mundo servidor.
- Snapshots.
- Selección de personaje.
- Personaje default.
- ECS.
- Enemigos.
- UI avanzada.
- Sistema de estilos grande.
- Routing complejo.
- Arquitectura especulativa para hitos futuros.

## Archivos permitidos

El Implementador puede modificar estos archivos si existen:

```txt
PROJECT_STATE.md
client/src/main.js
client/src/screens/menuScreen.js
client/src/ui/screenRouter.js
```

Solo si es estrictamente necesario para que el cliente siga levantando correctamente, también puede modificar:

```txt
client/index.html
client/package.json
package.json
package-lock.json
client/package-lock.json
```

## Archivos permitidos para crear

El Implementador puede crear únicamente estos archivos si no existen:

```txt
PROJECT_STATE.md
client/src/screens/menuScreen.js
client/src/ui/screenRouter.js
```

También puede crear las carpetas mínimas necesarias para contener esos archivos:

```txt
client/src/screens/
client/src/ui/
```

## Archivos prohibidos

No tocar ni crear archivos fuera de la lista permitida.

Prohibido especialmente crear o modificar:

```txt
docs/ai/vpreliminar_hitos_multiplayer_3d.txt
docs/ai/roles/PREPARADOR_DE_HITO.md
docs/ai/hitos/hito_01_proyecto_arranca.md
docs/ai/hitos/hito_02_pantalla_guest.md
server/src/index.js
server/src/net/*
server/src/auth/*
server/src/characters/*
server/src/world/*
server/src/simulation/*
server/src/ecs/*
server/src/game/*
client/src/net/*
client/src/render/*
client/src/game/*
client/src/world/*
client/src/ecs/*
```

No crear ramas. El trabajo de vPreliminar se hace directo sobre la rama principal/default del repo.

## Capas tocadas

- client/app: montaje inicial desde `client/src/main.js`.
- client/screens: pantalla de entrada guest local.
- client/ui: router mínimo de pantalla, solo si se usa para montar la pantalla.
- docs estado: `PROJECT_STATE.md` solo si se necesita registrar cierre del hito.

## Secuencia de implementación sugerida

1. Revisar el resultado del Hito 1 y confirmar que `npm install` y `npm run dev` siguen funcionando.
2. Revisar `client/src/main.js` para entender cómo se monta actualmente el contenido inicial.
3. Crear `client/src/screens/menuScreen.js` con una función explícita para construir o renderizar la pantalla de menú. Nombre sugerido: `createMenuScreen` o `renderMenuScreen`.
4. Crear `client/src/ui/screenRouter.js` con una responsabilidad mínima: limpiar el contenedor raíz y montar una pantalla. No agregar rutas futuras todavía.
5. Actualizar `client/src/main.js` para montar la pantalla de menú usando el router mínimo o directamente la función del menú si resulta más simple.
6. Implementar en la pantalla:

```txt
Wini-s-dungeon-3d vPreliminar
Nombre:
[input]
[Entrar como guest]
[mensaje local]
```

7. Implementar el evento de click del botón:
   - Leer el valor del input.
   - Aplicar `trim()`.
   - Si queda vacío, usar `Guest`.
   - Mostrar `Entrando como guest: <nombre>`.
8. Asegurar que el botón no haga submit con recarga de página. Si se usa `<form>`, prevenir el submit con `event.preventDefault()`.
9. Mantener el servidor del Hito 1 funcionando, sin conectarlo al cliente.
10. Ejecutar la prueba manual obligatoria.
11. Si existe o se crea `PROJECT_STATE.md`, registrar de forma breve que el Hito 2 quedó cerrado, con fecha y prueba manual ejecutada.

## Prueba manual obligatoria

Desde la raíz del repo:

```bash
npm install
npm run dev
```

Verificar obligatoriamente:

1. El servidor sigue arrancando sin errores.
2. El cliente abre en navegador.
3. La pantalla muestra el título exacto:

```txt
Wini-s-dungeon-3d vPreliminar
```

4. La pantalla muestra el rótulo:

```txt
Nombre:
```

5. La pantalla muestra un input editable.
6. La pantalla muestra el botón:

```txt
Entrar como guest
```

7. Escribir `Walter` en el input.
8. Apretar `Entrar como guest`.
9. Verificar que aparece el mensaje:

```txt
Entrando como guest: Walter
```

10. Borrar el nombre o dejar solo espacios.
11. Apretar `Entrar como guest`.
12. Verificar que aparece el mensaje:

```txt
Entrando como guest: Guest
```

13. Verificar que la página no se recarga.
14. Verificar que no hay conexión real al servidor al apretar el botón.
15. Verificar que no aparece personaje, sala 3D, socket, mundo, snapshot ni gameplay.

## Criterio de cierre

El Hito 2 se considera cerrado solo si se cumplen todas estas condiciones:

- `npm install` funciona desde la raíz.
- `npm run dev` funciona desde la raíz.
- El servidor del Hito 1 sigue arrancando.
- El cliente abre en navegador.
- Existe una pantalla de entrada guest local.
- El usuario puede escribir un nombre.
- El botón `Entrar como guest` responde localmente.
- El mensaje local usa el nombre escrito.
- Si el nombre está vacío, el mensaje usa `Guest`.
- No se implementó conexión real con servidor.
- No se implementó ningún alcance perteneciente a hitos posteriores.
- No se creó ninguna rama.
- No se tocaron archivos fuera de los permitidos.

## Riesgos / notas

- Este hito prueba flujo local de UI, no autenticación.
- El texto `guest` en este hito es solo intención de interfaz. El guest real corresponde al Hito 4.
- No adelantar Socket.IO: corresponde al Hito 3.
- No emitir ni preparar eventos de red todavía.
- No crear `socketClient.js` todavía.
- No crear `socketServer.js` todavía.
- No crear servicios de `auth`, `account` ni `character` todavía.
- No introducir Three.js ni render 3D.
- Mantener la pantalla simple. La UI previa existe para que el flujo sea claro, no para cerrar diseño visual definitivo.
- Si hay que elegir entre una solución elegante y una solución mínima verificable, elegir la mínima verificable.
