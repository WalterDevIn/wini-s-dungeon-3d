import * as THREE from 'three';

function createWall({ width, height, depth, x, y, z }) {
  const geometry = new THREE.BoxGeometry(width, height, depth);
  const material = new THREE.MeshStandardMaterial({ color: 0x4f5563 });
  const wall = new THREE.Mesh(geometry, material);

  wall.position.set(x, y, z);

  return wall;
}

export function createThreeScene() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x151821);

  const floorGeometry = new THREE.BoxGeometry(10, 0.2, 10);
  const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x303642 });
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.position.y = -0.1;
  scene.add(floor);

  scene.add(createWall({ width: 10, height: 3, depth: 0.3, x: 0, y: 1.5, z: -5 }));
  scene.add(createWall({ width: 10, height: 3, depth: 0.3, x: 0, y: 1.5, z: 5 }));
  scene.add(createWall({ width: 0.3, height: 3, depth: 10, x: -5, y: 1.5, z: 0 }));
  scene.add(createWall({ width: 0.3, height: 3, depth: 10, x: 5, y: 1.5, z: 0 }));

  const playerGeometry = new THREE.CylinderGeometry(0.45, 0.45, 1.8, 24);
  const playerMaterial = new THREE.MeshStandardMaterial({ color: 0x4f8cff });
  const player = new THREE.Mesh(playerGeometry, playerMaterial);
  player.position.y = 0.9;
  scene.add(player);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(3, 5, 4);
  scene.add(directionalLight);

  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
  camera.position.set(6, 4, 6);
  camera.lookAt(0, 1, 0);

  return { scene, camera };
}
