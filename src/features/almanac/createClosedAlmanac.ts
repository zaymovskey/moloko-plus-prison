import * as THREE from "three";
import coverImage from "../../assets/cover.jpg.webp";

const PAGES_COLOR = "#ffffff";
const COVER_COLOR = "#010101";

const PAGES_DEPTH = 0.2;
const PAGES_HEIGHT = 3;
const PAGES_WIDTH = 2;

const COVER_DEPTH = 0.05;
const COVER_HEIGHT = 3.1;
const COVER_WIDTH = 2.1;

const SPINE_WIDTH = 0.05;

export function createClosedAlmanac(): THREE.Group {
  const almanacGroup = new THREE.Group();

  // Pages
  const pages = new THREE.BoxGeometry(PAGES_WIDTH, PAGES_HEIGHT, PAGES_DEPTH);
  const pagesMaterial = new THREE.MeshStandardMaterial({
    color: PAGES_COLOR,
  });
  const pagesMesh = new THREE.Mesh(pages, pagesMaterial);
  almanacGroup.add(pagesMesh);

  // Back cover
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

  // Front cover
  const frontCover = new THREE.BoxGeometry(
    COVER_WIDTH,
    COVER_HEIGHT,
    COVER_DEPTH,
  );
  const textureLoader = new THREE.TextureLoader();
  const coverTexture = textureLoader.load(coverImage);

  coverTexture.colorSpace = THREE.SRGBColorSpace;
  coverTexture.anisotropy = 80;

  const frontCoverMaterials = [
    // 6 Граней параллелепипеда
    new THREE.MeshStandardMaterial({ color: COVER_COLOR }), // +X
    new THREE.MeshStandardMaterial({ color: COVER_COLOR }), // -X
    new THREE.MeshStandardMaterial({ color: COVER_COLOR }), // +Y
    new THREE.MeshStandardMaterial({ color: COVER_COLOR }), // -Y
    new THREE.MeshStandardMaterial({
      map: coverTexture, // +Z (лицевая сторона)
      roughness: 0.9,
      metalness: 0.0,
    }),
    new THREE.MeshStandardMaterial({ color: COVER_COLOR }), // -Z
  ];
  const frontCoverMesh = new THREE.Mesh(frontCover, frontCoverMaterials);
  frontCoverMesh.position.set(0, 0, PAGES_DEPTH / 2 + COVER_DEPTH / 2);
  almanacGroup.add(frontCoverMesh);

  // Spine
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

  almanacGroup.traverse((obj) => {
    if (obj instanceof THREE.Mesh) {
      obj.castShadow = true;
      obj.receiveShadow = true;
    }
  });

  return almanacGroup;
}
