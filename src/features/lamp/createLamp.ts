import * as THREE from "three";

export type LampRig = {
  group: THREE.Group;
  light: THREE.SpotLight;
};

export function createLamp(): LampRig {
  const group = new THREE.Group();
  group.name = "lampRig";

  const ambient = new THREE.AmbientLight(0xffffff, 0.05);
  group.add(ambient);

  const lamp = new THREE.SpotLight(0xfff1d6, 25, 12, Math.PI / 6, 0.35, 2);
  lamp.position.set(2, 3.2, 3.5);
  lamp.castShadow = true;
  lamp.shadow.mapSize.set(1024, 1024);
  lamp.shadow.bias = -0.0001;

  lamp.target.position.set(0, 0, 0);
  group.add(lamp.target);
  group.add(lamp);

  const helper = new THREE.SpotLightHelper(lamp);
  group.add(helper);

  return { group, light: lamp };
}
