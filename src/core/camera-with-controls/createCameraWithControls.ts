import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { createRenderer } from "../renderer/createRenderer";

export function createCameraWithControls(): {
  camera: THREE.PerspectiveCamera;
  controls: OrbitControls;
  renderer: THREE.WebGLRenderer;
} {
  const camera = new THREE.PerspectiveCamera(
    40, // угол обзора (FOV)
    window.innerWidth / window.innerHeight, // соотношение сторон
    0.1, // ближняя граница
    100, // дальняя граница
  );

  const renderer = createRenderer();

  const controls = new OrbitControls(camera, renderer.domElement);

  controls.enableDamping = true;
  controls.dampingFactor = 0.05;

  camera.position.set(0, 2, 7);

  return { camera, controls, renderer };
}
