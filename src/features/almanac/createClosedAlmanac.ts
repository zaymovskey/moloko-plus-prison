import * as THREE from "three";
import coverImage from "../../assets/textures/almanac/almanac-cover.webp";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

import coverNormal from "../../assets/textures/paper/Paper006_1K-JPG_NormalGL.jpg";
import coverRoughness from "../../assets/textures/paper/Paper006_1K-JPG_Roughness.jpg";

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

  const textureLoader = new THREE.TextureLoader();

  const coverTexture = textureLoader.load(coverImage);
  coverTexture.colorSpace = THREE.SRGBColorSpace;
  coverTexture.anisotropy = 80;

  const coverNormalTexture = textureLoader.load(coverNormal);
  const coverRoughnessTexture = textureLoader.load(coverRoughness);

  const coverBaseMaterialParams: THREE.MeshStandardMaterialParameters = {
    color: COVER_COLOR,
    normalMap: coverNormalTexture,
    roughnessMap: coverRoughnessTexture,
    roughness: 0.9,
    metalness: 0.0,
  };

  // --- Back cover ---
  const backCover = new RoundedBoxGeometry(
    COVER_WIDTH,
    COVER_HEIGHT,
    COVER_DEPTH,
    3,
    0.02,
  );
  const backCoverMaterial = new THREE.MeshStandardMaterial(
    coverBaseMaterialParams,
  );
  const backCoverMesh = new THREE.Mesh(backCover, backCoverMaterial);
  backCoverMesh.position.set(0, 0, -PAGES_DEPTH / 2 - COVER_DEPTH / 2);
  almanacGroup.add(backCoverMesh);

  const frontCover = new RoundedBoxGeometry(
    COVER_WIDTH,
    COVER_HEIGHT,
    COVER_DEPTH,
    3,
    0.02,
  );

  const frontCoverMaterials = [
    new THREE.MeshStandardMaterial(coverBaseMaterialParams), // +X
    new THREE.MeshStandardMaterial(coverBaseMaterialParams), // -X
    new THREE.MeshStandardMaterial(coverBaseMaterialParams), // +Y
    new THREE.MeshStandardMaterial(coverBaseMaterialParams), // -Y
    new THREE.MeshStandardMaterial({
      ...coverBaseMaterialParams,
      map: coverTexture, // лицевая сторона
      color: 0xffffff, // важно
    }), // +Z
    new THREE.MeshStandardMaterial(coverBaseMaterialParams), // -Z
  ];

  const frontCoverMesh = new THREE.Mesh(frontCover, frontCoverMaterials);
  frontCoverMesh.position.set(0, 0, PAGES_DEPTH / 2 + COVER_DEPTH / 2);
  almanacGroup.add(frontCoverMesh);

  // --- Spine ---
  const spine = new RoundedBoxGeometry(
    SPINE_WIDTH,
    COVER_HEIGHT,
    COVER_DEPTH * 2 + PAGES_DEPTH,
    3,
    0.01,
  );
  const spineMaterial = new THREE.MeshStandardMaterial(coverBaseMaterialParams);
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
