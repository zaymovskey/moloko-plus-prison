import * as THREE from "three";
import "../../styles/style.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { createClosedAlmanac } from "../../features/almanac/createClosedAlmanac";

export function createScene(): void {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75, // угол обзора (FOV)
    window.innerWidth / window.innerHeight, // соотношение сторон
    0.1, // ближняя граница
    100, // дальняя граница
  );

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  const controls = new OrbitControls(camera, renderer.domElement);

  controls.enableDamping = true;
  controls.dampingFactor = 0.05;

  document.body.appendChild(renderer.domElement);

  camera.position.set(0, 2, 7);

  scene.background = new THREE.Color(0x222222);

  // Cube
  //   const geometry = new THREE.BoxGeometry(1, 1, 1);
  //   const material = new THREE.MeshStandardMaterial({
  //     color: 0x00ff00,
  //   });
  //   const cube = new THREE.Mesh(geometry, material);
  //   scene.add(cube);

  // Light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
  scene.add(ambientLight);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(2, 2, 5);
  scene.add(directionalLight);

  const lightHelper = new THREE.DirectionalLightHelper(
    directionalLight,
    1,
    0xff0000,
  );

  // ------
  scene.add(lightHelper);

  const almanac = createClosedAlmanac();
  scene.add(almanac);

  function animate() {
    controls.update();

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  animate();
}
