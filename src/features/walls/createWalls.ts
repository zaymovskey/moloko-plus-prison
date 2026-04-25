import * as THREE from "three";

import wallColor from "../../assets/textures/painted-plaster/PaintedPlaster006_1K-JPG_Color.jpg";
import wallNormal from "../../assets/textures/painted-plaster/PaintedPlaster006_1K-JPG_NormalGL.jpg";
import wallRoughness from "../../assets/textures/painted-plaster/PaintedPlaster006_1K-JPG_Roughness.jpg";

const WALL_COLOR = "#3f4347";

export function createWalls(): THREE.Group {
  const wallsGroup = new THREE.Group();

  const textureLoader = new THREE.TextureLoader();

  const wallColorTexture = textureLoader.load(wallColor);
  const wallNormalTexture = textureLoader.load(wallNormal);
  const wallRoughnessTexture = textureLoader.load(wallRoughness);

  const wallBaseMaterialParams: THREE.MeshStandardMaterialParameters = {
    color: WALL_COLOR,
    normalMap: wallNormalTexture,
    roughnessMap: wallRoughnessTexture,
    roughness: 0.9,
    metalness: 0.0,
    map: wallColorTexture,
  };

  // Left wall
  const leftWall = new THREE.BoxGeometry(10, 10, 0.1);

  const leftWallTopMaterial = new THREE.MeshStandardMaterial(
    wallBaseMaterialParams,
  );

  const leftWallTopMesh = new THREE.Mesh(leftWall, leftWallTopMaterial);

  leftWallTopMesh.rotation.y = Math.PI / 2;
  leftWallTopMesh.position.x = -5;

  wallsGroup.add(leftWallTopMesh);

  // Right wall
  const rightWall = new THREE.BoxGeometry(10, 10, 0.1);
  const rightWallTopMaterial = new THREE.MeshStandardMaterial(
    wallBaseMaterialParams,
  );
  const rightWallTopMesh = new THREE.Mesh(rightWall, rightWallTopMaterial);
  rightWallTopMesh.rotation.y = Math.PI / 2;
  rightWallTopMesh.position.x = 5;
  wallsGroup.add(rightWallTopMesh);

  // Back wall
  const backWall = new THREE.BoxGeometry(10, 10, 0.1);
  const backWallTopMaterial = new THREE.MeshStandardMaterial(
    wallBaseMaterialParams,
  );
  const backWallTopMesh = new THREE.Mesh(backWall, backWallTopMaterial);
  backWallTopMesh.position.z = -5;
  wallsGroup.add(backWallTopMesh);

  return wallsGroup;
}
