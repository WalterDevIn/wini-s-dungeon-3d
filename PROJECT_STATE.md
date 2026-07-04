# PROJECT_STATE — Wini-s-dungeon-3d

## Versión actual

Wini-s-dungeon-3d vPreliminar

## Hito implementado

Hito 2 — Pantalla de entrada guest

## Estado

Cerrado.

## Qué funciona

- Existe estructura mínima separada de cliente y servidor.
- Desde la raíz, `npm install` instala el workspace del cliente, el workspace del servidor y las dependencias de desarrollo raíz.
- Desde la raíz, `npm run dev` levanta cliente y servidor en paralelo.
- El servidor HTTP mínimo arranca y muestra en consola `Server running on http://localhost:3000`.
- El cliente muestra la pantalla inicial `Wini-s-dungeon-3d vPreliminar`.
- El cliente muestra un campo `Nombre:`.
- El cliente muestra un botón `Entrar como guest`.
- Al apretar el botón, la UI responde localmente con `Entrando como guest: <nombre>`.
- Si el nombre está vacío, usa `Walter` como valor local por defecto.

## Cómo probar

Desde la raíz del repositorio:

```bash
npm install
npm run dev
```

Verificar:

1. La instalación termina sin errores.
2. El servidor informa en consola que está corriendo en `http://localhost:3000`.
3. El cliente informa la URL de Vite, por defecto `http://localhost:5173`.
4. Al abrir el cliente se ve `Wini-s-dungeon-3d vPreliminar`.
5. Se ve el campo `Nombre:`.
6. Se ve el botón `Entrar como guest`.
7. Al escribir un nombre y apretar el botón, aparece `Entrando como guest: <nombre>`.
8. No se realiza conexión real con servidor desde el botón.

## Archivos relevantes

- `package.json`
- `client/package.json`
- `client/index.html`
- `client/src/main.js`
- `client/src/screens/menuScreen.js`
- `client/src/ui/screenRouter.js`
- `server/package.json`
- `server/src/index.js`

## Pendientes / limitaciones

- No hay sockets.
- No hay login real.
- No hay guest real del servidor.
- No hay multiplayer.
- No hay Three.js.
- No hay mundo servidor.
- No hay gameplay.

## Próximo hito sugerido

Hito 3 — Conexión cliente-servidor.
