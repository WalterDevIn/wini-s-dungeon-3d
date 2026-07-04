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

function createEntityMesh() {
  const geometry = new THREE.CylinderGeometry(0.45, 0.45, 1.8, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0x4f8cff });
  const mesh = new THREE.Mesh(geometry, material);

  mesh.position.y = 0.9;

  return mesh;
}

function applyEntitySnapshot(mesh, entity) {
  mesh.position.set(
    entity.position.x,
    entity.position.y + 0.9,
    entity.position.z,
  );
  mesh.rotation.y = entity.rotation;
}

export function mountThreeRenderer(container) {
  const { scene, camera } = createThreeScene();
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  const entityMeshes = new Map();

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

  function removeMissingEntities(snapshotEntityIds) {
    for (const [entityId, mesh] of entityMeshes) {
      if (!snapshotEntityIds.has(entityId)) {
        scene.remove(mesh);
        mesh.geometry.dispose();
        mesh.material.dispose();
        entityMeshes.delete(entityId);
      }
    }
  }

  function updateWorldSnapshot(snapshot) {
    const snapshotEntityIds = new Set();

    for (const entity of snapshot.entities || []) {
      snapshotEntityIds.add(entity.id);

      if (!entityMeshes.has(entity.id)) {
        const mesh = createEntityMesh();
        entityMeshes.set(entity.id, mesh);
        scene.add(mesh);
      }

      applyEntitySnapshot(entityMeshes.get(entity.id), entity);
    }

    removeMissingEntities(snapshotEntityIds);
  }

  function renderFrame() {
    resizeRenderer({ container, camera, renderer });
    renderer.render(scene, camera);
    frameId = window.requestAnimationFrame(renderFrame);
  }

  renderFrame();

  return {
    updateWorldSnapshot,
    dispose() {
      window.cancelAnimationFrame(frameId);
      cameraController.dispose();

      for (const mesh of entityMeshes.values()) {
        scene.remove(mesh);
        mesh.geometry.dispose();
        mesh.material.dispose();
      }

      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
