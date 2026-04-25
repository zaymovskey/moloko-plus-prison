import * as THREE from "three";
import { createLampDebugGui } from "./createLampDebugGui";

export type LampRig = {
  group: THREE.Group;
  light: THREE.SpotLight;
};

export function createLamp(): LampRig {
  const group = new THREE.Group();
  group.name = "lampRig";

  const ambient = new THREE.AmbientLight(0xffffff, 0.05);
  group.add(ambient);

  const fill = new THREE.HemisphereLight(0x4a4a5a, 0x121212, 0.12);
  group.add(fill);

  const lamp = new THREE.SpotLight(0xfff1d6, 25, 12, Math.PI / 4, 0.45, 2);
  lamp.position.set(1.5, 2.3, 3.5);
  lamp.castShadow = true;
  lamp.shadow.mapSize.set(1024, 1024);
  lamp.shadow.bias = -0.0001;

  lamp.target.position.set(0, -2, 0);

  group.add(lamp.target);
  group.add(lamp);

  const helper = new THREE.SpotLightHelper(lamp);
  group.add(helper);
  createLampDebugGui(lamp, helper);

  return { group, light: lamp };
}
