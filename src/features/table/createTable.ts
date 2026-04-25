import * as THREE from "three";

import tableNormal from "../../assets/textures/metal/Metal046B_1K-JPG_NormalGL.jpg";
import tableRoughness from "../../assets/textures/metal/Metal046B_1K-JPG_Roughness.jpg";
import tableColor from "../../assets/textures/metal/Metal046B_1K-JPG_Color.jpg";

const TABLE_COLOR = "#3a342f";

export function createTable(): THREE.Group {
  const tableGroup = new THREE.Group();

  const tableTop = new THREE.BoxGeometry(13, 0.1, 5);

  const textureLoader = new THREE.TextureLoader();

  const tableNormalTexture = textureLoader.load(tableNormal);
  const tableRoughnessTexture = textureLoader.load(tableRoughness);
  const tableColorTexture = textureLoader.load(tableColor);

  const tableBaseMaterialParams: THREE.MeshStandardMaterialParameters = {
    color: TABLE_COLOR,
    normalMap: tableNormalTexture,
    roughnessMap: tableRoughnessTexture,
    roughness: 0.9,
    metalness: 0.0,
    map: tableColorTexture,
  };

  const tableTopMaterial = new THREE.MeshStandardMaterial(
    tableBaseMaterialParams,
  );

  const tableTopMesh = new THREE.Mesh(tableTop, tableTopMaterial);

  tableGroup.add(tableTopMesh);

  tableGroup.traverse((obj) => {
    if (obj instanceof THREE.Mesh) {
      obj.castShadow = true;
      obj.receiveShadow = true;
    }
  });

  return tableGroup;
}
