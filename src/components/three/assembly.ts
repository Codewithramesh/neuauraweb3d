import * as THREE from "three";
import { assetManifest } from "../../content/site";

export interface ProductAssembly {
  root: THREE.Group;
  core: THREE.Object3D;
  pendant: THREE.Object3D;
  wristband: THREE.Object3D;
}
const metal = (color: string, roughness = 0.3, metalness = 0.85) =>
  new THREE.MeshStandardMaterial({ color, roughness, metalness });
function outline(w: number, h: number, r: number) {
  const s = new THREE.Shape(),
    x = -w / 2,
    y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
}
function slab(
  w: number,
  h: number,
  d: number,
  r: number,
  material: THREE.Material,
) {
  const g = new THREE.ExtrudeGeometry(outline(w, h, r), {
    depth: d,
    bevelEnabled: true,
    bevelSize: 0.018,
    bevelThickness: 0.018,
    bevelSegments: 3,
    curveSegments: 18,
  });
  g.translate(0, 0, -d / 2);
  return new THREE.Mesh(g, material);
}
export function createConceptAssembly(): ProductAssembly {
  const root = new THREE.Group(),
    core = new THREE.Group(),
    pendant = new THREE.Group(),
    wristband = new THREE.Group();
  core.name = "neuaura_core";
  pendant.name = "pendant_assembly";
  wristband.name = "wristband_assembly";
  core.userData.componentId = "NEUAURA-V1-SHARED-CORE-01";
  const titanium = metal("#aeb8c1", 0.28),
    graphite = metal("#252c32", 0.34, 0.75),
    edge = metal("#66747e", 0.3),
    black = metal("#080f14", 0.42, 0.2);
  core.add(slab(0.68, 1.95, 0.33, 0.29, titanium));
  core.add(slab(0.62, 1.88, 0.35, 0.27, graphite));
  const face = slab(0.51, 1.68, 0.018, 0.23, black);
  face.position.z = 0.187;
  core.add(face);
  const sensor = new THREE.Group();
  sensor.name = "core_camera";
  const window = new THREE.Mesh(
    new THREE.CircleGeometry(0.076, 32),
    metal("#526371", 0.14, 0.8),
  );
  window.position.z = 0.006;
  sensor.add(window);
  const aperture = new THREE.Mesh(
    new THREE.CircleGeometry(0.051, 28),
    metal("#0a1420", 0.05, 0.6),
  );
  aperture.position.z = 0.009;
  sensor.add(aperture);
  const iris = new THREE.Mesh(
    new THREE.CircleGeometry(0.023, 20),
    metal("#213a46", 0.05, 0.8),
  );
  iris.position.z = 0.011;
  sensor.add(iris);
  sensor.position.set(0, 0.57, 0.2);
  core.add(sensor);
  const button = slab(0.05, 0.3, 0.12, 0.024, edge);
  button.name = "core_button";
  button.position.set(0.35, 0.1, 0);
  core.add(button);
  const indicator = slab(
    0.13,
    0.024,
    0.014,
    0.01,
    new THREE.MeshStandardMaterial({
      color: "#66e0ce",
      emissive: "#66e0ce",
      emissiveIntensity: 0.7,
    }),
  );
  indicator.name = "core_indicator";
  indicator.position.set(0, -0.62, 0.207);
  core.add(indicator);
  for (let i = 0; i < 3; i++) {
    const mic = new THREE.Mesh(new THREE.CircleGeometry(0.013, 10), black);
    mic.position.set((i - 1) * 0.06, 0.32, 0.204);
    core.add(mic);
  }
  for (const x of [-0.19, 0.19]) {
    const rail = slab(0.035, 1.25, 0.07, 0.015, edge);
    rail.position.set(x, 0, -0.2);
    core.add(rail);
  }
  for (const y of [-0.38, -0.5]) {
    const contact = new THREE.Mesh(
      new THREE.CircleGeometry(0.023, 10),
      metal("#9a997e"),
    );
    contact.rotation.y = Math.PI;
    contact.position.set(0, y, -0.226);
    core.add(contact);
  }

  const surround = outline(0.8, 2.11, 0.33);
  surround.holes.push(
    new THREE.Path(outline(0.65, 1.91, 0.27).getPoints(40).reverse()),
  );
  const cradleGeo = new THREE.ExtrudeGeometry(surround, {
    depth: 0.23,
    bevelEnabled: true,
    bevelSize: 0.015,
    bevelThickness: 0.015,
    bevelSegments: 3,
    curveSegments: 24,
  });
  cradleGeo.translate(0, 0, -0.115);
  const cradle = new THREE.Mesh(cradleGeo, titanium);
  cradle.name = "pendant_cradle";
  pendant.add(cradle);
  const back = slab(0.65, 1.9, 0.045, 0.27, graphite);
  back.position.z = -0.13;
  pendant.add(back);
  for (const x of [-0.19, 0.19]) {
    const guide = slab(0.04, 1.28, 0.07, 0.015, edge);
    guide.position.set(x, 0, -0.08);
    pendant.add(guide);
  }
  const bail = new THREE.Mesh(
    new THREE.TorusGeometry(0.13, 0.035, 8, 24),
    titanium,
  );
  bail.position.y = 1.17;
  pendant.add(bail);
  const chain = new THREE.Group();
  chain.name = "pendant_chain";
  pendant.add(chain);
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 1.29, 0),
    new THREE.Vector3(-1.01, 2.7, -0.13),
    new THREE.Vector3(-0.8, 3.3, -0.35),
    new THREE.Vector3(0.8, 3.3, -0.35),
    new THREE.Vector3(1.01, 2.7, -0.13),
    new THREE.Vector3(0, 1.29, 0),
  ]);
  const linkGeo = new THREE.TorusGeometry(0.052, 0.014, 5, 10);
  for (let i = 0; i < 108; i++) {
    const link = new THREE.Mesh(linkGeo, edge);
    link.position.copy(curve.getPoint(i / 108));
    link.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      curve.getTangent(i / 108),
    );
    link.rotateY(((i % 2) * Math.PI) / 2);
    link.scale.y = 1.45;
    chain.add(link);
  }

  const noise = new Uint8Array(64 * 64 * 4);
  for (let i = 0; i < 64 * 64; i++) {
    const n = 190 + ((i * 31) % 57);
    noise.set([n, n, n, 255], i * 4);
  }
  const texture = new THREE.DataTexture(noise, 64, 64);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(20, 12);
  texture.needsUpdate = true;
  const silicone = new THREE.MeshStandardMaterial({
    color: "#202930",
    roughness: 0.87,
    metalness: 0.02,
    bumpMap: texture,
    bumpScale: 0.009,
  });
  const loop = new THREE.Shape();
  loop.absellipse(0, 0, 1.04, 1.12, 0, Math.PI * 2, false, 0);
  const hole = new THREE.Path();
  hole.absellipse(0, 0, 0.83, 0.91, 0, Math.PI * 2, true, 0);
  loop.holes.push(hole);
  const strapGeo = new THREE.ExtrudeGeometry(loop, {
    depth: 0.83,
    bevelEnabled: true,
    bevelSize: 0.025,
    bevelThickness: 0.025,
    bevelSegments: 3,
    curveSegments: 64,
  });
  strapGeo.translate(0, 0, -0.415);
  const strap = new THREE.Mesh(strapGeo, silicone);
  strap.name = "wristband_strap";
  strap.rotation.y = Math.PI / 2;
  wristband.add(strap);
  const wristCradle = new THREE.Mesh(cradleGeo, titanium);
  wristCradle.name = "wristband_cradle";
  wristCradle.rotation.x = -Math.PI / 2;
  wristCradle.position.y = 1.055;
  wristband.add(wristCradle);
  const wristBack = slab(0.65, 1.9, 0.045, 0.27, graphite);
  wristBack.rotation.x = -Math.PI / 2;
  wristBack.position.y = 0.92;
  wristband.add(wristBack);
  const buckle = slab(0.98, 0.22, 0.14, 0.055, titanium);
  buckle.name = "wristband_buckle";
  buckle.position.set(0, -0.83, -0.71);
  wristband.add(buckle);
  for (let i = 0; i < 5; i++) {
    const notch = new THREE.Mesh(new THREE.CircleGeometry(0.036, 12), black);
    notch.rotation.x = Math.PI / 2;
    notch.position.set(0, -1.13, 0.3 - i * 0.14);
    wristband.add(notch);
  }
  root.add(pendant, wristband, core);
  const assembly = { root, core, pendant, wristband };
  applyAssemblyPose(assembly, 0);
  return assembly;
}
type Pose = { p: [number, number, number]; r: [number, number, number] };
export const poseAnchors = [0, 0.22, 0.42, 0.68, 0.86, 1];
const poses: Record<"core" | "pendant" | "wristband", Pose[]> = {
  core: [
    { p: [0, -0.8, 0.25], r: [0, 0, 0] },
    { p: [0, -0.8, 1.45], r: [0, 0, 0] },
    { p: [0, 1.8, 1.1], r: [-Math.PI / 2, 0, 0] },
    { p: [0, 0.95, 0], r: [-Math.PI / 2, 0, 0] },
    { p: [0, 1.8, 0], r: [-Math.PI / 2, 0, 0] },
    { p: [-0.1, 0.45, 0.7], r: [0.1, 0.1, -0.18] },
  ],
  pendant: [
    { p: [0, -0.8, 0], r: [0, 0, 0] },
    { p: [0, -0.8, 0], r: [0, 0, 0] },
    { p: [-2.6, -0.8, -0.5], r: [0, 0, -0.1] },
    { p: [-32, -0.8, -0.5], r: [0, 0, -0.1] },
    { p: [-2.6, -1.2, 0], r: [0, 0, -0.1] },
    { p: [-1.75, -1.35, 0], r: [0, 0, -0.12] },
  ],
  wristband: [
    { p: [32, -0.25, 0], r: [0, 0, 0] },
    { p: [32, -0.25, 0], r: [0, 0, 0] },
    { p: [0, -1.0, 0], r: [0, 0, 0] },
    { p: [0, -0.25, 0], r: [0, 0, 0] },
    { p: [1.6, -0.4, 0], r: [0, 0, 0] },
    { p: [1.95, -0.5, 0], r: [0, 0.15, 0.05] },
  ],
};
const qa = new THREE.Quaternion(),
  qb = new THREE.Quaternion(),
  euler = new THREE.Euler();
export function applyAssemblyPose(a: ProductAssembly, progress: number) {
  const p = THREE.MathUtils.clamp(progress, 0, 1);
  let i = 0;
  while (i < poseAnchors.length - 2 && p > poseAnchors[i + 1]) i++;
  const t = THREE.MathUtils.smoothstep(p, poseAnchors[i], poseAnchors[i + 1]);
  for (const key of ["core", "pendant", "wristband"] as const) {
    const x = poses[key][i],
      y = poses[key][i + 1];
    a[key].position.set(
      THREE.MathUtils.lerp(x.p[0], y.p[0], t),
      THREE.MathUtils.lerp(x.p[1], y.p[1], t),
      THREE.MathUtils.lerp(x.p[2], y.p[2], t),
    );
    qa.setFromEuler(euler.set(...x.r));
    qb.setFromEuler(euler.set(...y.r));
    a[key].quaternion.slerpQuaternions(qa, qb, t);
  }
}
export function mapSuppliedAssembly(scene: THREE.Group): ProductAssembly {
  const a = { root: scene } as ProductAssembly;
  for (const [key, name] of Object.entries(assetManifest.nodeMapping)) {
    const node = scene.getObjectByName(name);
    if (!node)
      throw new Error(
        `Missing mapped product node: ${name}. Inspect the supplied asset hierarchy.`,
      );
    a[key as Exclude<keyof ProductAssembly, "root">] = node;
  }
  return a;
}
export function disposeAssembly(a: Pick<ProductAssembly, "root">) {
  const geometries = new Set<THREE.BufferGeometry>(),
    materials = new Set<THREE.Material>(),
    textures = new Set<THREE.Texture>();
  a.root.traverse((o) => {
    if (o instanceof THREE.Mesh) {
      geometries.add(o.geometry);
      for (const m of Array.isArray(o.material) ? o.material : [o.material]) {
        materials.add(m);
        if (m instanceof THREE.MeshStandardMaterial && m.bumpMap)
          textures.add(m.bumpMap);
      }
    }
  });
  geometries.forEach((g) => g.dispose());
  materials.forEach((m) => m.dispose());
  textures.forEach((t) => t.dispose());
}
