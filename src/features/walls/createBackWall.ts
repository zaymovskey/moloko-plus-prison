import * as THREE from "three";
import { BACK_WALL_WIDTH, WINDOW_WIDTH } from "./consts";
import { createWallMaterial } from "./createWallMaterial";
import { BACK_WALL_HEIGHT } from "./consts";
import { BACK_WALL_DEPTH } from "./consts";

import wallColor from "../../assets/textures/painted-plaster/PaintedPlaster006_1K-JPG_Color.jpg";
import wallNormal from "../../assets/textures/painted-plaster/PaintedPlaster006_1K-JPG_NormalGL.jpg";
import wallRoughness from "../../assets/textures/painted-plaster/PaintedPlaster006_1K-JPG_Roughness.jpg";

export function createBackWall(): THREE.Group {
  const backWallGroup = new THREE.Group();

  const textureLoader = new THREE.TextureLoader();

  const wallColorTexture = textureLoader.load(wallColor);
  const wallNormalTexture = textureLoader.load(wallNormal);
  const wallRoughnessTexture = textureLoader.load(wallRoughness);
  // Back wall. Left part
  const wallPartLeftWidth = BACK_WALL_WIDTH / 2 - WINDOW_WIDTH / 2;

  const backWallPartLeft = new THREE.BoxGeometry(
    wallPartLeftWidth,
    BACK_WALL_HEIGHT,
    BACK_WALL_DEPTH,
  );
  const backWallPartLeftMaterial = createWallMaterial(
    wallPartLeftWidth,
    BACK_WALL_HEIGHT,
    wallColorTexture,
    wallNormalTexture,
    wallRoughnessTexture,
  );
  const backWallPartLeftMesh = new THREE.Mesh(
    backWallPartLeft,
    backWallPartLeftMaterial,
  );

  backWallPartLeftMesh.position.z = -5;
  backWallPartLeftMesh.position.x = -5 + wallPartLeftWidth / 2;

  backWallGroup.add(backWallPartLeftMesh);

  // Back wall. Right part
  const wallPartRightWidth = BACK_WALL_WIDTH / 2 - WINDOW_WIDTH / 2;

  const backWallPartRight = new THREE.BoxGeometry(
    wallPartRightWidth,
    BACK_WALL_HEIGHT,
    BACK_WALL_DEPTH,
  );
  const backWallPartRightMaterial = createWallMaterial(
    wallPartRightWidth,
    BACK_WALL_HEIGHT,
    wallColorTexture,
    wallNormalTexture,
    wallRoughnessTexture,
  );
  const backWallPartRightMesh = new THREE.Mesh(
    backWallPartRight,
    backWallPartRightMaterial,
  );

  backWallPartRightMesh.position.z = -5;
  backWallPartRightMesh.position.x = 5 - wallPartRightWidth / 2;

  backWallGroup.add(backWallPartRightMesh);

  // Back wall. Bottom part
  const bottomWallHeight = 7;
  const bottomWall = new THREE.BoxGeometry(
    BACK_WALL_WIDTH - wallPartRightWidth - wallPartLeftWidth,
    bottomWallHeight,
    0.1,
  );
  const bottomWallMaterial = createWallMaterial(
    BACK_WALL_WIDTH - wallPartRightWidth - wallPartLeftWidth,
    bottomWallHeight,
    wallColorTexture,
    wallNormalTexture,
    wallRoughnessTexture,
  );
  const bottomWallMesh = new THREE.Mesh(bottomWall, bottomWallMaterial);
  bottomWallMesh.position.z = -5;
  bottomWallMesh.position.y = -BACK_WALL_HEIGHT / 2 + bottomWallHeight / 2;
  backWallGroup.add(bottomWallMesh);

  // Back wall. Top part
  const topWallHeight = 2;
  const topWall = new THREE.BoxGeometry(
    BACK_WALL_WIDTH - wallPartRightWidth - wallPartLeftWidth,
    topWallHeight,
    0.1,
  );
  const topWallMaterial = createWallMaterial(
    BACK_WALL_WIDTH - wallPartRightWidth - wallPartLeftWidth,
    topWallHeight,
    wallColorTexture,
    wallNormalTexture,
    wallRoughnessTexture,
  );
  const topWallMesh = new THREE.Mesh(topWall, topWallMaterial);
  topWallMesh.position.z = -5;
  topWallMesh.position.y = BACK_WALL_HEIGHT / 2 - topWallHeight / 2;
  backWallGroup.add(topWallMesh);

  return backWallGroup;
}
