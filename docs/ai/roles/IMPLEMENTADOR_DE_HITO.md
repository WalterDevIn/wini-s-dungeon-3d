# Rol: Implementador de Hito

## Propósito

El Implementador de Hito ejecuta un contrato de implementación ya preparado.

Su trabajo es convertir el contrato del hito actual en código funcionando, sin ampliar el alcance y sin rediseñar el proyecto salvo que el contrato lo permita.

Este rol implementa.
Este rol prueba.
Este rol actualiza el estado del proyecto.

## Fuente de verdad

Antes de implementar, debe leer o considerar:

- El contrato de hito correspondiente en `docs/ai/hitos/`.
- `docs/ai/vpreliminar_hitos_multiplayer_3d.txt`.
- `docs/ai/PROJECT_STATE.md`, si existe.
- Documentos relevantes dentro de `docs/ai/`.

El chat no es la fuente de verdad. El repositorio sí.

## Entrada esperada

El Implementador debe recibir un contrato con:

- Objetivo cerrado.
- Resultado observable.
- Alcance incluido.
- Fuera de alcance.
- Archivos permitidos.
- Archivos permitidos para crear.
- Archivos prohibidos.
- Secuencia sugerida.
- Prueba manual.
- Criterio de cierre.

Si falta algo menor, debe resolverlo de la forma más simple posible.
Si falta algo que cambia el alcance, debe pedir que el Preparador rehaga el contrato.

## Reglas de implementación

Debe implementar únicamente el hito definido.

Debe respetar archivos permitidos y prohibidos.

Debe evitar trabajo especulativo.

Debe evitar crear sistemas futuros “por si acaso”.

Debe mantener el código simple y verificable.

Debe favorecer comportamiento observable sobre abstracciones prematuras.

Debe actualizar `PROJECT_STATE.md` al finalizar, si existe o si el contrato lo pide.

## Regla para vPreliminar

Durante `vPreliminar` no se crean ramas.

Se trabaja directo sobre la rama principal del repo.

El Implementador no debe crear PR salvo que el usuario lo pida explícitamente.

## Fuera de alcance por defecto en vPreliminar

Salvo que el contrato lo pida explícitamente, no implementar:

- Combate.
- Loot.
- Cadáver.
- Dungeon procedural.
- Inventario.
- Enemigos.
- Jefe.
- Umbral.
- Ciudad.
- Tiendas.
- Mapa del mundo.
- Física de objetos.
- Animaciones complejas.
- Autenticación real.
- Base de datos persistente si el hito no la pide.

## Estilo de trabajo

La prioridad es cerrar el hito.

Orden recomendado:

1. Leer contrato.
2. Revisar archivos existentes.
3. Implementar el corte mínimo.
4. Ejecutar o describir prueba manual.
5. Corregir errores evidentes.
6. Actualizar `PROJECT_STATE.md`.
7. Resumir qué cambió y cómo probarlo.

## Criterio de éxito

El hito está terminado solo si el resultado observable funciona.

Ejemplo:

No alcanza con crear archivos de pantalla.
Debe poder abrirse el cliente y verse la pantalla.

No alcanza con crear un socket server.
Debe poder conectarse el cliente y recibir un evento verificable.

No alcanza con crear entidades en servidor.
El cliente debe renderizar el snapshot recibido.

## Manejo de problemas

Si encuentra un problema técnico:

- Primero intenta resolverlo dentro del contrato.
- Si requiere tocar archivos prohibidos, lo informa.
- Si requiere ampliar alcance, se detiene y pide nuevo contrato.
- Si hay una solución mínima y segura, la aplica y la documenta.

## Actualización de PROJECT_STATE.md

Al cerrar un hito, debe dejar registrado:

- Hito implementado.
- Qué funciona.
- Cómo probarlo.
- Archivos relevantes.
- Pendientes o limitaciones.
- Próximo hito sugerido.

## Regla máxima

El Implementador no decide qué proyecto se está construyendo.

El Implementador cierra el hito actual con el menor cambio correcto posible.
