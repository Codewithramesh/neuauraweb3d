import * as THREE from "three";
import { assetManifest } from "../../content/site";

export interface ProductAssembly {
  root: THREE.Group;
  frame: THREE.Object3D;
  leftTemple: THREE.Object3D;
  rightTemple: THREE.Object3D;
  core: THREE.Object3D;
  rail: THREE.Object3D;
  alignment: THREE.Object3D;
  wristband: THREE.Object3D;
  pendant: THREE.Object3D;
}

const metal = (color: string, roughness = 0.3, metalness = 0.8) =>
  new THREE.MeshStandardMaterial({ color, roughness, metalness });

function outline(width: number, height: number, r: number) {
  const s = new THREE.Shape(),
    x = -width / 2,
    y = -height / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + width - r, y);
  s.quadraticCurveTo(x + width, y, x + width, y + r);
  s.lineTo(x + width, y + height - r);
  s.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  s.lineTo(x + r, y + height);
  s.quadraticCurveTo(x, y + height, x, y + height - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
}

function lensOutline(scale = 1) {
  const s = new THREE.Shape();
  s.moveTo(-1.02 * scale, 0.51 * scale);
  s.bezierCurveTo(
    -0.9 * scale,
    0.76 * scale,
    0.69 * scale,
    0.76 * scale,
    1.02 * scale,
    0.53 * scale,
  );
  s.bezierCurveTo(
    1.12 * scale,
    0.41 * scale,
    0.88 * scale,
    -0.49 * scale,
    0.62 * scale,
    -0.61 * scale,
  );
  s.bezierCurveTo(
    0.3 * scale,
    -0.75 * scale,
    -0.6 * scale,
    -0.73 * scale,
    -0.82 * scale,
    -0.5 * scale,
  );
  s.bezierCurveTo(
    -1.0 * scale,
    -0.3 * scale,
    -1.14 * scale,
    0.29 * scale,
    -1.02 * scale,
    0.51 * scale,
  );
  return s;
}

function slab(
  width: number,
  height: number,
  depth: number,
  radius: number,
  material: THREE.Material,
) {
  const geometry = new THREE.ExtrudeGeometry(outline(width, height, radius), {
    depth,
    bevelEnabled: true,
    bevelSize: 0.025,
    bevelThickness: 0.025,
    bevelSegments: 3,
    steps: 1,
    curveSegments: 10,
  });
  geometry.translate(0, 0, -depth / 2);
  return new THREE.Mesh(geometry, material);
}

function tube(points: number[][], radius: number, material: THREE.Material) {
  return new THREE.Mesh(
    new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(
        points.map(
          (p) => new THREE.Vector3(...(p as [number, number, number])),
        ),
      ),
      44,
      radius,
      8,
      false,
    ),
    material,
  );
}

export function createConceptAssembly(): ProductAssembly {
  const root = new THREE.Group();
  const graphite = metal("#343e46", 0.25, 0.65);
  const titanium = metal("#b5c1c9", 0.26, 0.9);
  const edge = metal("#697984", 0.29, 0.85);
  const black = metal("#0a1015", 0.42, 0.25);
  const rubber = metal("#222a30", 0.85, 0.05);
  const lensMaterial = new THREE.MeshPhysicalMaterial({
    color: "#30434e",
    metalness: 0.18,
    roughness: 0.12,
    transparent: true,
    opacity: 0.48,
    clearcoat: 1,
    side: THREE.DoubleSide,
  });
  const frame = new THREE.Group();
  frame.name = "glasses_frame";
  for (const side of [-1, 1]) {
    const shape = lensOutline(1.06);
    const hole = lensOutline(0.89);
    shape.holes.push(new THREE.Path(hole.getPoints(40).reverse()));
    const rim = new THREE.Mesh(
      new THREE.ExtrudeGeometry(shape, {
        depth: 0.15,
        bevelEnabled: true,
        bevelSize: 0.045,
        bevelThickness: 0.04,
        bevelSegments: 3,
        curveSegments: 30,
      }),
      graphite,
    );
    rim.position.set(side * 1.27, 0, 0.38);
    frame.add(rim);
    const lens = new THREE.Mesh(
      new THREE.ShapeGeometry(lensOutline(0.89), 40),
      lensMaterial,
    );
    lens.position.set(side * 1.27, 0, 0.43);
    frame.add(lens);
    // Precision corner pins and a narrow brow highlight.
    for (const delta of [-0.07, 0.07]) {
      const pin = new THREE.Mesh(
        new THREE.SphereGeometry(0.035, 10, 6),
        titanium,
      );
      pin.position.set(side * 2.28 + delta, 0.42, 0.57);
      frame.add(pin);
    }
    const hinge = slab(0.28, 0.28, 0.22, 0.06, titanium);
    hinge.position.set(side * 2.45, 0.35, 0.34);
    frame.add(hinge);
  }
  frame.add(
    tube(
      [
        [-0.33, 0.32, 0.45],
        [-0.18, 0.44, 0.49],
        [0.18, 0.44, 0.49],
        [0.33, 0.32, 0.45],
      ],
      0.085,
      graphite,
    ),
  );
  frame.add(
    tube(
      [
        [-0.3, 0.15, 0.4],
        [-0.22, 0.06, 0.3],
        [-0.28, -0.1, 0.25],
      ],
      0.055,
      graphite,
    ),
  );
  frame.add(
    tube(
      [
        [0.3, 0.15, 0.4],
        [0.22, 0.06, 0.3],
        [0.28, -0.1, 0.25],
      ],
      0.055,
      graphite,
    ),
  );

  const leftTemple = new THREE.Group();
  leftTemple.name = "left_temple";
  const rightTemple = new THREE.Group();
  rightTemple.name = "right_temple";
  for (const [side, temple] of [
    [-1, leftTemple],
    [1, rightTemple],
  ] as const) {
    const arm = slab(0.17, 0.22, 3.1, 0.07, graphite);
    arm.position.set(side * 2.47, 0.32, -1.19);
    temple.add(arm);
    temple.add(
      tube(
        [
          [side * 2.47, 0.32, -2.45],
          [side * 2.42, 0.28, -2.85],
          [side * 2.31, -0.16, -3.15],
          [side * 2.28, -0.37, -3.08],
        ],
        0.105,
        rubber,
      ),
    );
    const trim = slab(0.018, 0.055, 1.3, 0.012, edge);
    trim.position.set(side * 2.565, 0.35, -1.48);
    temple.add(trim);
  }

  const core = new THREE.Group();
  core.name = "neuaura_core";
  core.userData.componentId = "NEUAURA-SHARED-CORE-01";
  core.add(slab(1.8, 0.33, 0.31, 0.13, titanium));
  const shell = slab(1.71, 0.29, 0.324, 0.11, graphite);
  core.add(shell);
  const face = slab(1.56, 0.18, 0.012, 0.07, black);
  face.position.z = 0.171;
  core.add(face);
  // The camera, button and consent indicator remain children of the same core.
  const camera = new THREE.Group();
  camera.name = "core_camera";
  const bezel = new THREE.Mesh(
    new THREE.CylinderGeometry(0.115, 0.115, 0.07, 32),
    edge,
  );
  bezel.rotation.z = Math.PI / 2;
  camera.add(bezel);
  const glass = new THREE.Mesh(
    new THREE.CylinderGeometry(0.078, 0.078, 0.078, 32),
    metal("#070e19", 0.06, 0.7),
  );
  glass.rotation.z = Math.PI / 2;
  camera.add(glass);
  const iris = new THREE.Mesh(
    new THREE.CylinderGeometry(0.037, 0.037, 0.08, 24),
    metal("#27475f", 0.08, 0.8),
  );
  iris.rotation.z = Math.PI / 2;
  camera.add(iris);
  camera.position.x = 0.92;
  core.add(camera);
  const button = slab(0.29, 0.07, 0.1, 0.035, edge);
  button.name = "core_button";
  button.position.set(-0.09, 0.19, 0);
  core.add(button);
  const indicator = slab(
    0.15,
    0.024,
    0.015,
    0.012,
    new THREE.MeshStandardMaterial({
      color: "#66e0ce",
      emissive: "#66e0ce",
      emissiveIntensity: 1.3,
    }),
  );
  indicator.name = "core_indicator";
  indicator.position.set(0.43, 0.005, 0.185);
  core.add(indicator);
  for (let i = 0; i < 5; i++) {
    const vent = slab(0.018, 0.07, 0.012, 0.008, black);
    vent.position.set(-0.51 + i * 0.065, 0, 0.183);
    core.add(vent);
  }
  for (const x of [-0.68, 0.68]) {
    const screw = new THREE.Mesh(new THREE.CircleGeometry(0.018, 10), titanium);
    screw.position.set(x, -0.08, 0.18);
    core.add(screw);
  }

  const rail = new THREE.Group();
  rail.name = "docking_rail";
  const railBase = slab(1.92, 0.08, 0.23, 0.025, edge);
  railBase.rotation.y = Math.PI / 2;
  rail.add(railBase);
  const alignment = new THREE.Group();
  alignment.name = "alignment_components";
  for (const z of [-0.55, -1.35]) {
    const pin = new THREE.Mesh(
      new THREE.CylinderGeometry(0.035, 0.035, 0.13, 12),
      titanium,
    );
    pin.position.set(2.53, 0.36, z);
    alignment.add(pin);
  }

  const wristband = new THREE.Group();
  wristband.name = "wristband_assembly";
  const strapShape = new THREE.Shape();
  strapShape.absellipse(0, 0, 1.08, 1.24, 0, Math.PI * 2, false, 0);
  const inside = new THREE.Path();
  inside.absellipse(0, 0, 0.87, 1.02, 0, Math.PI * 2, true, 0);
  strapShape.holes.push(inside);
  const strapGeo = new THREE.ExtrudeGeometry(strapShape, {
    depth: 0.71,
    bevelEnabled: true,
    bevelSize: 0.035,
    bevelThickness: 0.035,
    bevelSegments: 3,
    curveSegments: 64,
  });
  strapGeo.translate(0, 0, -0.355);
  const strap = new THREE.Mesh(strapGeo, rubber);
  strap.rotation.y = Math.PI / 2;
  wristband.add(strap);
  const cradle = slab(0.53, 1.97, 0.2, 0.19, titanium);
  cradle.rotation.x = -Math.PI / 2;
  cradle.position.y = 1.19;
  wristband.add(cradle);
  const recess = slab(0.36, 1.78, 0.21, 0.13, black);
  recess.rotation.x = -Math.PI / 2;
  recess.position.y = 1.205;
  wristband.add(recess);
  for (let i = 0; i < 5; i++) {
    const dot = new THREE.Mesh(new THREE.CircleGeometry(0.048, 16), black);
    dot.rotation.x = Math.PI / 2;
    dot.position.set(0, -1.24, 0.25 - i * 0.16);
    wristband.add(dot);
  }
  const buckle = slab(0.86, 0.21, 0.15, 0.04, edge);
  buckle.position.set(0, -0.92, -0.75);
  wristband.add(buckle);

  const pendant = new THREE.Group();
  pendant.name = "pendant_assembly";
  const surround = slab(0.51, 2.04, 0.25, 0.21, titanium);
  pendant.add(surround);
  const recessPendant = slab(0.35, 1.8, 0.27, 0.13, black);
  recessPendant.position.z = 0.045;
  pendant.add(recessPendant);
  const bail = new THREE.Mesh(
    new THREE.TorusGeometry(0.15, 0.045, 8, 24),
    titanium,
  );
  bail.position.y = 1.17;
  pendant.add(bail);
  // Actual alternating oval chain links rather than a single cord.
  const chainCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 1.3, 0),
    new THREE.Vector3(-1.1, 2.65, -0.1),
    new THREE.Vector3(-0.9, 3.25, -0.45),
    new THREE.Vector3(0.9, 3.25, -0.45),
    new THREE.Vector3(1.1, 2.65, -0.1),
    new THREE.Vector3(0, 1.3, 0),
  ]);
  const chainGeometry = new THREE.TorusGeometry(0.061, 0.018, 5, 10);
  for (let i = 0; i < 104; i++) {
    const link = new THREE.Mesh(chainGeometry, edge);
    const t = i / 104;
    link.position.copy(chainCurve.getPoint(t));
    link.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      chainCurve.getTangent(t),
    );
    link.rotateY(((i % 2) * Math.PI) / 2);
    link.scale.y = 1.35;
    pendant.add(link);
  }

  root.add(
    frame,
    leftTemple,
    rightTemple,
    core,
    rail,
    alignment,
    wristband,
    pendant,
  );
  const assembly = {
    root,
    frame,
    leftTemple,
    rightTemple,
    core,
    rail,
    alignment,
    wristband,
    pendant,
  };
  applyAssemblyPose(assembly, 0);
  return assembly;
}

type Pose = { p: [number, number, number]; r: [number, number, number] };
const anchors = [0, 0.23, 0.34, 0.53, 0.65, 0.81, 1];
const poses: Record<Exclude<keyof ProductAssembly, "root">, Pose[]> = {
  frame: [
    { p: [0, 0, 0], r: [0, 0, 0] },
    { p: [0, 0, 0], r: [0, 0, 0] },
    { p: [-3.8, -0.3, -1], r: [0, 0.16, 0] },
    { p: [-32, -0.3, -1], r: [0, 0.16, 0] },
    { p: [-32, -0.3, -1], r: [0, 0.16, 0] },
    { p: [-32, -0.3, -1], r: [0, 0.16, 0] },
    { p: [-4.2, -0.3, -1], r: [0, 0.25, 0] },
  ],
  leftTemple: [
    { p: [0, 0, 0], r: [0, 0, 0] },
    { p: [0, 0, 0], r: [0, 0, 0] },
    { p: [-3.8, -0.3, -1], r: [0, 0.16, 0] },
    { p: [-32, -0.3, -1], r: [0, 0.16, 0] },
    { p: [-32, -0.3, -1], r: [0, 0.16, 0] },
    { p: [-32, -0.3, -1], r: [0, 0.16, 0] },
    { p: [-4.2, -0.3, -1], r: [0, 0.25, 0] },
  ],
  rightTemple: [
    { p: [0, 0, 0], r: [0, 0, 0] },
    { p: [0.6, 0, 0], r: [0, 0, 0] },
    { p: [-3.8, -0.3, -1], r: [0, 0.16, 0] },
    { p: [-32, -0.3, -1], r: [0, 0.16, 0] },
    { p: [-32, -0.3, -1], r: [0, 0.16, 0] },
    { p: [-32, -0.3, -1], r: [0, 0.16, 0] },
    { p: [-4.2, -0.3, -1], r: [0, 0.25, 0] },
  ],
  core: [
    { p: [2.55, 0.44, -0.72], r: [0, Math.PI / 2, 0] },
    { p: [2.55, 0.44, 1.1], r: [0, Math.PI / 2, 0] },
    { p: [0.35, 1.7, 0], r: [0, Math.PI / 2, 0] },
    { p: [0, 1.39, 0], r: [0, Math.PI / 2, 0] },
    { p: [0, 2.3, 0], r: [0, Math.PI / 2, 0] },
    { p: [0, 0, 0.23], r: [0, 0, Math.PI / 2] },
    { p: [0.15, 1.39, 0.5], r: [0, Math.PI / 2, 0] },
  ],
  rail: [
    { p: [2.55, 0.23, -0.72], r: [0, 0, 0] },
    { p: [2.85, 0.05, -0.72], r: [0, 0, 0] },
    { p: [-1.25, -0.2, -1.72], r: [0, 0.16, 0] },
    { p: [-29.45, -0.07, -1.72], r: [0, 0.16, 0] },
    { p: [-29.45, -0.07, -1.72], r: [0, 0.16, 0] },
    { p: [-29.45, -0.07, -1.72], r: [0, 0.16, 0] },
    { p: [-1.65, -0.07, -1.72], r: [0, 0.25, 0] },
  ],
  alignment: [
    { p: [0, 0, 0], r: [0, 0, 0] },
    { p: [0.05, -0.4, 0], r: [0, 0, 0] },
    { p: [-3.8, -0.3, -1], r: [0, 0.16, 0] },
    { p: [-32, -0.3, -1], r: [0, 0.16, 0] },
    { p: [-32, -0.3, -1], r: [0, 0.16, 0] },
    { p: [-32, -0.3, -1], r: [0, 0.16, 0] },
    { p: [-4.2, -0.3, -1], r: [0, 0.25, 0] },
  ],
  wristband: [
    { p: [32, -1, -2], r: [0, 0, 0] },
    { p: [32, -1, -2], r: [0, 0, 0] },
    { p: [0, -1.2, 0], r: [0, 0, 0] },
    { p: [0, 0, 0], r: [0, 0, 0] },
    { p: [0, 0, 0], r: [0, 0, 0] },
    { p: [-32, -1, -2], r: [0, 0, 0] },
    { p: [0.15, 0, 0.5], r: [0, 0, 0] },
  ],
  pendant: [
    { p: [36, 0, -2], r: [0, 0, 0] },
    { p: [36, 0, -2], r: [0, 0, 0] },
    { p: [36, 0, -2], r: [0, 0, 0] },
    { p: [36, 0, -2], r: [0, 0, 0] },
    { p: [3, -0.7, -1], r: [0, 0, 0] },
    { p: [0, 0, 0], r: [0, 0, 0] },
    { p: [4.1, -0.2, 0], r: [0, 0, 0] },
  ],
};
const qa = new THREE.Quaternion(),
  qb = new THREE.Quaternion(),
  euler = new THREE.Euler();
export function applyAssemblyPose(assembly: ProductAssembly, progress: number) {
  const p = THREE.MathUtils.clamp(progress, 0, 1);
  let index = 0;
  while (index < anchors.length - 2 && p > anchors[index + 1]) index++;
  const t = THREE.MathUtils.smoothstep(p, anchors[index], anchors[index + 1]);
  for (const key of Object.keys(poses) as (keyof typeof poses)[]) {
    const a = poses[key][index],
      b = poses[key][index + 1],
      object = assembly[key];
    object.position.set(
      THREE.MathUtils.lerp(a.p[0], b.p[0], t),
      THREE.MathUtils.lerp(a.p[1], b.p[1], t),
      THREE.MathUtils.lerp(a.p[2], b.p[2], t),
    );
    qa.setFromEuler(euler.set(...a.r));
    qb.setFromEuler(euler.set(...b.r));
    object.quaternion.slerpQuaternions(qa, qb, t);
  }
}

export function mapSuppliedAssembly(scene: THREE.Group): ProductAssembly {
  const mapped = { root: scene } as ProductAssembly;
  for (const [key, name] of Object.entries(assetManifest.nodeMapping)) {
    const node = scene.getObjectByName(name);
    if (!node)
      throw new Error(
        `Supplied model is missing mapped node: ${name}. Inspect the asset and update assetManifest.nodeMapping.`,
      );
    mapped[key as Exclude<keyof ProductAssembly, "root">] = node;
  }
  return mapped;
}

export function disposeAssembly(assembly: ProductAssembly) {
  const geometries = new Set<THREE.BufferGeometry>(),
    materials = new Set<THREE.Material>();
  assembly.root.traverse((object) => {
    if (object instanceof THREE.Mesh) {
      geometries.add(object.geometry);
      for (const material of Array.isArray(object.material)
        ? object.material
        : [object.material])
        materials.add(material);
    }
  });
  geometries.forEach((g) => g.dispose());
  materials.forEach((m) => m.dispose());
}
