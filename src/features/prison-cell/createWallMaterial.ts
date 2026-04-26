import * as THREE from "three";
import { WALL_COLOR, WALL_TEXTURE_TILING } from "./consts";

export function createWallMaterial(
  width: number,
  height: number,
  baseColorTexture: THREE.Texture,
  baseNormalTexture: THREE.Texture,
  baseRoughnessTexture: THREE.Texture,
): THREE.MeshStandardMaterial {
  const colorTexture = baseColorTexture.clone();
  const normalTexture = baseNormalTexture.clone();
  const roughnessTexture = baseRoughnessTexture.clone();

  [colorTexture, normalTexture, roughnessTexture].forEach((texture) => {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(
      width * WALL_TEXTURE_TILING,
      height * WALL_TEXTURE_TILING,
    );
    texture.needsUpdate = true;
  });

  colorTexture.colorSpace = THREE.SRGBColorSpace;

  return new THREE.MeshStandardMaterial({
    color: WALL_COLOR,
    map: colorTexture,
    normalMap: normalTexture,
    roughnessMap: roughnessTexture,
    roughness: 0.99,
    metalness: 0.0,
  });
}
