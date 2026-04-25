import * as THREE from "three";

import wallColor from "../../assets/textures/painted-plaster/PaintedPlaster006_1K-JPG_Color.jpg";
import wallNormal from "../../assets/textures/painted-plaster/PaintedPlaster006_1K-JPG_NormalGL.jpg";
import wallRoughness from "../../assets/textures/painted-plaster/PaintedPlaster006_1K-JPG_Roughness.jpg";
import { createWallMaterial } from "./createWallMaterial";
import { createBackWall } from "./createBackWall";

export function createWalls(): THREE.Group {
  const wallsGroup = new THREE.Group();

  const textureLoader = new THREE.TextureLoader();

  const wallColorTexture = textureLoader.load(wallColor);
  const wallNormalTexture = textureLoader.load(wallNormal);
  const wallRoughnessTexture = textureLoader.load(wallRoughness);
  wallColorTexture.colorSpace = THREE.SRGBColorSpace;

  // Left wall
  const leftWall = new THREE.BoxGeometry(10, 10, 0.1);

  const leftWallMaterial = createWallMaterial(
    10,
    10,
    wallColorTexture,
    wallNormalTexture,
    wallRoughnessTexture,
  );

  const leftWallMesh = new THREE.Mesh(leftWall, leftWallMaterial);

  leftWallMesh.rotation.y = Math.PI / 2;
  leftWallMesh.position.x = -5;

  wallsGroup.add(leftWallMesh);

  // Right wall
  const rightWall = new THREE.BoxGeometry(10, 10, 0.1);
  const rightWallMaterial = createWallMaterial(
    10,
    10,
    wallColorTexture,
    wallNormalTexture,
    wallRoughnessTexture,
  );
  const rightWallMesh = new THREE.Mesh(rightWall, rightWallMaterial);
  rightWallMesh.rotation.y = Math.PI / 2;
  rightWallMesh.position.x = 5;
  wallsGroup.add(rightWallMesh);

  const backWall = createBackWall();
  wallsGroup.add(backWall);

  return wallsGroup;
}
