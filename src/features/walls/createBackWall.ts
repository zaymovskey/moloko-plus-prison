import * as THREE from "three";
import { BACK_WALL_WIDTH, WINDOW_WIDTH } from "./consts";
import { createWallMaterial } from "./createWallMaterial";
import { BACK_WALL_HEIGHT } from "./consts";
import { WALLS_DEPTH } from "./consts";

import wallColor from "../../assets/textures/painted-plaster/PaintedPlaster006_1K-JPG_Color.jpg";
import wallNormal from "../../assets/textures/painted-plaster/PaintedPlaster006_1K-JPG_NormalGL.jpg";
import wallRoughness from "../../assets/textures/painted-plaster/PaintedPlaster006_1K-JPG_Roughness.jpg";
import rustedMetalColor from "../../assets/textures/rusted-metal/Metal053C_1K-JPG_Color.jpg";
import rustedMetalNormal from "../../assets/textures/rusted-metal/Metal053C_1K-JPG_NormalGL.jpg";
import rustedMetalRoughness from "../../assets/textures/rusted-metal/Metal053C_1K-JPG_Roughness.jpg";

export function createBackWall(): THREE.Group {
  const backWallGroup = new THREE.Group();

  const textureLoader = new THREE.TextureLoader();

  const wallColorTexture = textureLoader.load(wallColor);
  const wallNormalTexture = textureLoader.load(wallNormal);
  const wallRoughnessTexture = textureLoader.load(wallRoughness);
  const rustedMetalColorTexture = textureLoader.load(rustedMetalColor);
  const rustedMetalNormalTexture = textureLoader.load(rustedMetalNormal);
  const rustedMetalRoughnessTexture = textureLoader.load(rustedMetalRoughness);

  // Back wall. Left part
  const wallPartLeftWidth = BACK_WALL_WIDTH / 2 - WINDOW_WIDTH / 2;

  const backWallPartLeft = new THREE.BoxGeometry(
    wallPartLeftWidth,
    BACK_WALL_HEIGHT,
    WALLS_DEPTH,
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
    WALLS_DEPTH,
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
    WALLS_DEPTH,
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
    WALLS_DEPTH,
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

  // Back wall. Grating rod
  const gratingRodMaterial = new THREE.MeshStandardMaterial({
    map: rustedMetalColorTexture,
    normalMap: rustedMetalNormalTexture,
    roughnessMap: rustedMetalRoughnessTexture,
    roughness: 0.85,
    metalness: 0.75,
  });

  rustedMetalColorTexture.colorSpace = THREE.SRGBColorSpace;
  [
    rustedMetalColorTexture,
    rustedMetalNormalTexture,
    rustedMetalRoughnessTexture,
  ].forEach((texture) => {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 2);
  });

  // --- Grating rods ---
  const windowHeight = BACK_WALL_HEIGHT - bottomWallHeight - topWallHeight; // 1
  const rodRadius = 0.035;
  const rodGeometry = new THREE.CylinderGeometry(
    rodRadius,
    rodRadius,
    windowHeight,
    24,
  );
  const rodsCount = 9;
  const windowHalfWidth = WINDOW_WIDTH / 2;
  const sidePadding = 0.12;
  const rodsMinX = -windowHalfWidth + sidePadding;
  const rodsMaxX = windowHalfWidth - sidePadding;
  const rodY = -BACK_WALL_HEIGHT / 2 + bottomWallHeight + windowHeight / 2;

  for (let i = 0; i < rodsCount; i += 1) {
    const t = i / (rodsCount - 1);
    const rodX = rodsMinX + (rodsMaxX - rodsMinX) * t;
    const gratingRodMesh = new THREE.Mesh(rodGeometry, gratingRodMaterial);
    gratingRodMesh.position.set(rodX, rodY, -4.94);
    backWallGroup.add(gratingRodMesh);
  }

  return backWallGroup;
}
