import * as THREE from 'three';
import { createThreeCameraController } from './threeCameraController.js';
import { createThreeScene } from './threeSceneFactory.js';

function resizeRenderer({ container, camera, renderer }) {
  const width = container.clientWidth || 800;
  const height = container.clientHeight || 450;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height, false);
}

export function mountThreeRenderer(container) {
  const { scene, camera } = createThreeScene();
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio || 1);

  renderer.domElement.style.display = 'block';
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';

  container.append(renderer.domElement);

  const cameraController = createThreeCameraController({
    canvas: renderer.domElement,
    camera,
  });

  let frameId = 0;

  function renderFrame() {
    resizeRenderer({ container, camera, renderer });
    renderer.render(scene, camera);
    frameId = window.requestAnimationFrame(renderFrame);
  }

  renderFrame();

  return {
    dispose() {
      window.cancelAnimationFrame(frameId);
      cameraController.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
