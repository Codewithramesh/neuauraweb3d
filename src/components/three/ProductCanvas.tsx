import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MathUtils, type Group } from "three";
import type { OrbitControls as Controls } from "three-stdlib";
import {
  applyAssemblyPose,
  createConceptAssembly,
  disposeAssembly,
  mapSuppliedAssembly,
  type ProductAssembly,
} from "./assembly";
import { assetManifest } from "../../content/site";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useReducedMotion } from "../../hooks/useReducedMotion";
export interface MotionState {
  progress: number;
  camera: number;
}
interface Props {
  motion: RefObject<MotionState>;
  rotate?: boolean;
  resetKey?: number;
  modeKey?: string;
  variant?: "hero" | "explorer" | "reveal";
  onReady?: () => void;
}
function Studio() {
  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight position={[3, 6, 6]} intensity={4} />
      <directionalLight
        position={[-5, 2, -3]}
        intensity={4.5}
        color="#aebfcb"
      />
      <pointLight position={[2, -2, 4]} intensity={18} color="#a2c2c1" />
      <Environment resolution={128} frames={1}>
        <Lightformer
          form="rect"
          intensity={5}
          position={[0, 6, 0]}
          rotation-x={Math.PI / 2}
          scale={[8, 2, 1]}
        />
        <Lightformer
          form="rect"
          intensity={4}
          position={[-5, 1, 1]}
          rotation-y={Math.PI / 2}
          scale={[2, 8, 1]}
        />
        <Lightformer
          form="rect"
          intensity={3}
          position={[5, 2, 1]}
          rotation-y={-Math.PI / 2}
          scale={[2, 8, 1]}
        />
        <Lightformer
          form="rect"
          intensity={2}
          position={[0, 0, 5]}
          scale={[4, 6, 1]}
        />
      </Environment>
    </>
  );
}
function Assembly({
  motion,
  rotate,
  resetKey,
  modeKey,
  variant,
  onReady,
}: Props) {
  const concept = useMemo(() => createConceptAssembly(), []),
    [supplied, setSupplied] = useState<ProductAssembly | null>(null),
    a = supplied || concept;
  const group = useRef<Group>(null),
    controls = useRef<Controls>(null),
    elapsed = useRef(0);
  const reduce = useReducedMotion(),
    { camera, invalidate } = useThree(),
    initial = useMemo(() => camera.position.clone(), [camera]);
  useEffect(() => {
    if (!assetManifest.assemblyUrl) return;
    let cancelled = false;
    new GLTFLoader().load(
      assetManifest.assemblyUrl,
      (gltf) => {
        if (cancelled) {
          disposeAssembly({ root: gltf.scene });
          return;
        }
        try {
          setSupplied(mapSuppliedAssembly(gltf.scene));
        } catch (e) {
          disposeAssembly({ root: gltf.scene });
          console.error(e);
        }
      },
      undefined,
      (e) =>
        console.error("Product asset failed. Showing the labelled concept.", e),
    );
    return () => {
      cancelled = true;
    };
  }, []);
  useEffect(() => {
    onReady?.();
  }, [onReady]);
  useEffect(() => () => disposeAssembly(concept), [concept]);
  useEffect(
    () => () => {
      if (supplied) disposeAssembly(supplied);
    },
    [supplied],
  );
  useEffect(() => {
    camera.position.copy(initial);
    controls.current?.target.set(0, 0.45, 0);
    controls.current?.update();
    elapsed.current = 0;
    applyAssemblyPose(a, motion.current.progress);
    invalidate();
  }, [camera, initial, resetKey, modeKey, a, motion, invalidate, reduce]);
  useFrame((_, delta) => {
    applyAssemblyPose(a, motion.current.progress);
    if (group.current) {
      const p = motion.current.progress;
      const compact =
        p > 0.42 && p < 0.86
          ? 1 + Math.sin(((p - 0.42) / 0.44) * Math.PI) * 0.4
          : 1;
      group.current.scale.setScalar(variant === "explorer" ? compact : 1);
      group.current.rotation.z = variant === "hero" ? -0.03 : 0;
      if (rotate && !reduce) {
        elapsed.current += Math.min(delta, 0.04);
        group.current.rotation.y = Math.sin(elapsed.current * 0.17) * 0.2;
      } else
        group.current.rotation.y = MathUtils.damp(
          group.current.rotation.y,
          0,
          5,
          delta,
        );
    }
  });
  return (
    <>
      <group ref={group}>
        <primitive object={a.root} />
      </group>
      <OrbitControls
        ref={controls}
        makeDefault
        enablePan={false}
        enableZoom={false}
        enableDamping
        dampingFactor={0.07}
        target={[0, 0.45, 0]}
        minPolarAngle={0.3}
        maxPolarAngle={Math.PI - 0.3}
      />
    </>
  );
}
export default function ProductCanvas(props: Props) {
  const container = useRef<HTMLDivElement>(null),
    [visible, setVisible] = useState(true),
    reduce = useReducedMotion(),
    mobile = useMediaQuery("(max-width: 800px)");
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), {
      rootMargin: "120px",
    });
    if (container.current) o.observe(container.current);
    return () => o.disconnect();
  }, []);
  return (
    <div
      ref={container}
      className="webgl-canvas"
      role="img"
      aria-label="Interactive pendant and screenless wristband concept with one shared electronic core. Drag to rotate."
    >
      <Canvas
        key={mobile ? "mobile" : "desktop"}
        frameloop={!visible ? "never" : reduce ? "demand" : "always"}
        dpr={mobile ? [1, 1.3] : [1, 1.65]}
        camera={{
          position:
            props.variant === "explorer" ? [3, 2.2, 8.5] : [2.7, 2.5, 9.4],
          fov:
            props.variant === "reveal" ? (mobile ? 42 : 30) : mobile ? 42 : 36,
          near: 0.1,
          far: 100,
        }}
        gl={{ alpha: true, antialias: !mobile, powerPreference: "low-power" }}
      >
        <Studio />
        <Assembly {...props} />
      </Canvas>
    </div>
  );
}
