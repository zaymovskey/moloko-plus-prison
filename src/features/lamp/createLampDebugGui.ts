import * as THREE from "three";
import GUI from "lil-gui";

let lampGui: GUI | null = null;

export function createLampDebugGui(
  lamp: THREE.SpotLight,
  helper: THREE.SpotLightHelper,
): void {
  if (lampGui) {
    lampGui.destroy();
  }

  lampGui = new GUI({ title: "Lamp Debug" });

  const params = {
    x: lamp.position.x,
    y: lamp.position.y,
    z: lamp.position.z,
    targetX: lamp.target.position.x,
    targetY: lamp.target.position.y,
    targetZ: lamp.target.position.z,
    intensity: lamp.intensity,
    distance: lamp.distance,
    angle: lamp.angle,
    penumbra: lamp.penumbra,
    decay: lamp.decay,
    shadowBias: lamp.shadow.bias,
    showHelper: helper.visible,
  };

  const positionFolder = lampGui.addFolder("Position");
  positionFolder
    .add(params, "x", -5, 5, 0.01)
    .name("lamp x")
    .onChange((value: number) => {
      lamp.position.x = value;
      helper.update();
    });
  positionFolder
    .add(params, "y", 0, 6, 0.01)
    .name("lamp y")
    .onChange((value: number) => {
      lamp.position.y = value;
      helper.update();
    });
  positionFolder
    .add(params, "z", -5, 5, 0.01)
    .name("lamp z")
    .onChange((value: number) => {
      lamp.position.z = value;
      helper.update();
    });

  const targetFolder = lampGui.addFolder("Target");
  targetFolder
    .add(params, "targetX", -5, 5, 0.01)
    .name("target x")
    .onChange((value: number) => {
      lamp.target.position.x = value;
      helper.update();
    });
  targetFolder
    .add(params, "targetY", -5, 5, 0.01)
    .name("target y")
    .onChange((value: number) => {
      lamp.target.position.y = value;
      helper.update();
    });
  targetFolder
    .add(params, "targetZ", -5, 5, 0.01)
    .name("target z")
    .onChange((value: number) => {
      lamp.target.position.z = value;
      helper.update();
    });

  const beamFolder = lampGui.addFolder("Beam");
  beamFolder
    .add(params, "intensity", 0, 80, 0.1)
    .name("intensity")
    .onChange((value: number) => {
      lamp.intensity = value;
    });
  beamFolder
    .add(params, "distance", 0, 30, 0.1)
    .name("distance")
    .onChange((value: number) => {
      lamp.distance = value;
    });
  beamFolder
    .add(params, "angle", 0.05, Math.PI / 2, 0.01)
    .name("angle")
    .onChange((value: number) => {
      lamp.angle = value;
      helper.update();
    });
  beamFolder
    .add(params, "penumbra", 0, 1, 0.01)
    .name("penumbra")
    .onChange((value: number) => {
      lamp.penumbra = value;
    });
  beamFolder
    .add(params, "decay", 0, 4, 0.01)
    .name("decay")
    .onChange((value: number) => {
      lamp.decay = value;
    });
  beamFolder
    .add(params, "shadowBias", -0.01, 0.01, 0.00001)
    .name("shadow bias")
    .onChange((value: number) => {
      lamp.shadow.bias = value;
    });
  beamFolder
    .add(params, "showHelper")
    .name("show helper")
    .onChange((value: boolean) => {
      helper.visible = value;
    });
}
