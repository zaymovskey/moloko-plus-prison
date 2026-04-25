import * as THREE from "three";

const TABLE_COLOR = "#262320";

export function createTable(): THREE.Group {
  const tableGroup = new THREE.Group();

  const tableTop = new THREE.BoxGeometry(13, 0.1, 5);
  const tableTopMaterial = new THREE.MeshStandardMaterial({
    color: TABLE_COLOR,
  });
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
