import * as THREE from "three";
import "../../styles/style.css";
import { createClosedAlmanac } from "../../features/almanac/createClosedAlmanac";
import { createTable } from "../../features/table/createTable";
import { createLamp } from "../../features/lamp/createLamp";
import { createCameraWithControls } from "../camera-with-controls/createCameraWithControls";

const SCENE_COLOR = "#222222";

export function createScene(): void {
  // Base scene setup
  const scene = new THREE.Scene();

  const { camera, controls, renderer } = createCameraWithControls();
  document.body.appendChild(renderer.domElement);

  scene.background = new THREE.Color(SCENE_COLOR);

  // Lamp
  const lamp = createLamp();
  scene.add(lamp.group);

  // Almanac
  const almanac = createClosedAlmanac();
  scene.add(almanac);

  // Table
  const table = createTable();
  table.position.set(0, -2, 0);
  scene.add(table);

  animate();

  function animate() {
    controls.update();

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
}
