import * as THREE from "three";

const PAGES_COLOR = "#ffffff";
const COVER_COLOR = "#000000";

const PAGES_DEPTH = 0.2;
const PAGES_HEIGHT = 3;
const PAGES_WIDTH = 2;

const COVER_DEPTH = 0.05;
const COVER_HEIGHT = 3.1;
const COVER_WIDTH = 2.1;

const SPINE_WIDTH = 0.05;

export function createClosedAlmanac(): THREE.Group {
  const almanacGroup = new THREE.Group();

  const pages = new THREE.BoxGeometry(PAGES_WIDTH, PAGES_HEIGHT, PAGES_DEPTH);
  const pagesMaterial = new THREE.MeshStandardMaterial({
    color: PAGES_COLOR,
  });
  const pagesMesh = new THREE.Mesh(pages, pagesMaterial);
  almanacGroup.add(pagesMesh);

  const backCover = new THREE.BoxGeometry(
    COVER_WIDTH,
    COVER_HEIGHT,
    COVER_DEPTH,
  );
  const backCoverMaterial = new THREE.MeshStandardMaterial({
    color: COVER_COLOR,
  });
  const backCoverMesh = new THREE.Mesh(backCover, backCoverMaterial);
  backCoverMesh.position.set(0, 0, -PAGES_DEPTH / 2 - COVER_DEPTH / 2);
  almanacGroup.add(backCoverMesh);

  const frontCover = new THREE.BoxGeometry(
    COVER_WIDTH,
    COVER_HEIGHT,
    COVER_DEPTH,
  );
  const frontCoverMaterial = new THREE.MeshStandardMaterial({
    color: COVER_COLOR,
  });
  const frontCoverMesh = new THREE.Mesh(frontCover, frontCoverMaterial);
  frontCoverMesh.position.set(0, 0, PAGES_DEPTH / 2 + COVER_DEPTH / 2);
  almanacGroup.add(frontCoverMesh);

  const spine = new THREE.BoxGeometry(
    SPINE_WIDTH,
    COVER_HEIGHT,
    COVER_DEPTH * 2 + PAGES_DEPTH,
  );
  const spineMaterial = new THREE.MeshStandardMaterial({
    color: COVER_COLOR,
  });
  const spineMesh = new THREE.Mesh(spine, spineMaterial);
  spineMesh.position.set(-PAGES_WIDTH / 2 - SPINE_WIDTH / 2, 0, 0);
  almanacGroup.add(spineMesh);

  return almanacGroup;
}
