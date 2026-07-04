import * as THREE from 'three';

export function createThreeCameraController({ canvas, camera }) {
  const target = new THREE.Vector3(0, 1, 0);
  const state = {
    isDragging: false,
    lastX: 0,
    yaw: Math.PI / 4,
    pitch: 0.55,
    radius: 8,
  };

  function updateCamera() {
    const x = Math.sin(state.yaw) * Math.cos(state.pitch) * state.radius;
    const y = Math.sin(state.pitch) * state.radius + 1;
    const z = Math.cos(state.yaw) * Math.cos(state.pitch) * state.radius;

    camera.position.set(x, y, z);
    camera.lookAt(target);
  }

  function handlePointerDown(event) {
    state.isDragging = true;
    state.lastX = event.clientX;
    canvas.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event) {
    if (!state.isDragging) {
      return;
    }

    const deltaX = event.clientX - state.lastX;
    state.lastX = event.clientX;
    state.yaw -= deltaX * 0.01;
    updateCamera();
  }

  function handlePointerUp(event) {
    state.isDragging = false;
    canvas.releasePointerCapture(event.pointerId);
  }

  canvas.addEventListener('pointerdown', handlePointerDown);
  canvas.addEventListener('pointermove', handlePointerMove);
  canvas.addEventListener('pointerup', handlePointerUp);
  canvas.addEventListener('pointercancel', handlePointerUp);

  updateCamera();

  return {
    update: updateCamera,
    dispose() {
      canvas.removeEventListener('pointerdown', handlePointerDown);
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerup', handlePointerUp);
      canvas.removeEventListener('pointercancel', handlePointerUp);
    },
  };
}
