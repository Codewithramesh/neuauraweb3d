import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MathUtils, type Group } from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
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

function StudioLighting() {
  return (
    <>
      <ambientLight intensity={1.1} />
      <directionalLight position={[4, 7, 6]} intensity={4.5} color="#ecf2f7" />
      <directionalLight position={[-5, 2, -3]} intensity={4} color="#a9bdcd" />
      <pointLight position={[2, -3, 4]} intensity={24} color="#8eb3bd" />
      <Environment resolution={128} frames={1}>
        <Lightformer
          form="rect"
          intensity={5}
          position={[0, 6, 0]}
          rotation-x={Math.PI / 2}
          scale={[10, 2, 1]}
        />
        <Lightformer
          form="rect"
          intensity={3}
          position={[-6, 1, 1]}
          rotation-y={Math.PI / 2}
          scale={[3, 7, 1]}
        />
        <Lightformer
          form="rect"
          intensity={2.5}
          position={[5, 2, -3]}
          rotation-y={-Math.PI / 2}
          scale={[2, 8, 1]}
        />
        <Lightformer
          form="rect"
          intensity={1}
          position={[0, -2, 5]}
          scale={[8, 1, 1]}
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
  const concept = useMemo(() => createConceptAssembly(), []);
  const [supplied, setSupplied] = useState<ProductAssembly | null>(null);
  const assembly = supplied || concept;
  const group = useRef<Group>(null);
  const controls = useRef<OrbitControlsImpl>(null);
  const reduce = useReducedMotion();
  const { invalidate, camera } = useThree();
  const initialCamera = useMemo(() => camera.position.clone(), [camera]);
  const lastFocus = useRef(0);
  const elapsed = useRef(0);
  const interacting = useRef(false);
  useEffect(() => {
    if (!assetManifest.assemblyUrl) return;
    let cancelled = false;
    new GLTFLoader().load(
      assetManifest.assemblyUrl,
      (gltf) => {
        if (cancelled) return;
        try {
          setSupplied(mapSuppliedAssembly(gltf.scene));
        } catch (error) {
          console.error(error);
        }
      },
      undefined,
      (error) =>
        console.error(
          "Production model could not load; showing the labelled concept.",
          error,
        ),
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
    if (!controls.current) return;
    camera.position.copy(initialCamera);
    controls.current.target.set(0, variant === "hero" ? -0.05 : 0.3, 0);
    controls.current.update();
    elapsed.current = 0;
    lastFocus.current = 0;
    invalidate();
  }, [resetKey, modeKey, camera, initialCamera, invalidate, variant]);
  useEffect(() => {
    if (reduce) {
      applyAssemblyPose(assembly, motion.current.progress);
      invalidate();
    }
  }, [modeKey, assembly, motion, reduce, invalidate]);
  useFrame((state, delta) => {
    const progress = motion.current.progress;
    applyAssemblyPose(assembly, progress);
    if (group.current) {
      const compact =
        progress < 0.23
          ? 1
          : progress < 0.53
            ? MathUtils.lerp(1, 1.4, (progress - 0.23) / 0.3)
            : progress < 0.81
              ? 1.4
              : MathUtils.lerp(
                  1.4,
                  variant === "reveal" ? 0.78 : 0.7,
                  (progress - 0.81) / 0.19,
                );
      group.current.scale.setScalar(variant === "reveal" ? 0.78 : compact);
      group.current.position.y =
        progress < 0.65
          ? -0.1
          : progress < 0.81
            ? MathUtils.lerp(-0.1, -1.25, (progress - 0.65) / 0.16)
            : MathUtils.lerp(-1.25, -0.4, (progress - 0.81) / 0.19);
      group.current.rotation.z = variant === "hero" ? -0.12 : 0;
      if (rotate && !reduce) {
        elapsed.current += Math.min(delta, 0.04);
        group.current.rotation.y =
          Math.sin(elapsed.current * 0.18) * (variant === "hero" ? 0.18 : 0.4);
      }
      if (!rotate)
        group.current.rotation.y = MathUtils.damp(
          group.current.rotation.y,
          0,
          4,
          delta,
        );
    }
    if (
      controls.current &&
      !interacting.current &&
      Math.abs(lastFocus.current - motion.current.camera) > 0.001
    ) {
      const focus = motion.current.camera;
      state.camera.position.set(
        initialCamera.x + focus * 0.5,
        initialCamera.y - focus * 0.2,
        initialCamera.z - focus * 1.3,
      );
      controls.current.target.set(focus * 1.7, 0.3, -focus * 0.5);
      controls.current.update();
      lastFocus.current = focus;
    }
  });
  return (
    <>
      <group
        ref={group}
        position={variant === "hero" ? [0, 0.05, 0] : [0, -0.3, 0]}
        scale={variant === "reveal" ? 0.78 : 1}
      >
        <primitive object={assembly.root} />
      </group>
      <OrbitControls
        ref={controls}
        makeDefault
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.07}
        minPolarAngle={0.3}
        maxPolarAngle={Math.PI - 0.3}
        target={[0, variant === "hero" ? -0.05 : 0.3, 0]}
        onStart={() => {
          interacting.current = true;
        }}
        onEnd={() => {
          interacting.current = false;
        }}
      />
    </>
  );
}

export default function ProductCanvas(props: Props) {
  const container = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const reduce = useReducedMotion();
  const mobile = useMediaQuery("(max-width: 900px)");
  const phone = useMediaQuery("(max-width: 700px)");
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "100px" },
    );
    if (container.current) observer.observe(container.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      className="webgl-canvas"
      ref={container}
      aria-label="Interactive NEUAURA concept model. Drag to rotate. Use the labelled controls to change configuration."
      role="img"
    >
      <Canvas
        key={phone ? "phone" : mobile ? "tablet" : "desktop"}
        frameloop={!visible ? "never" : reduce ? "demand" : "always"}
        dpr={mobile ? [1, 1.35] : [1, 1.75]}
        camera={{
          position:
            props.variant === "reveal"
              ? mobile
                ? [1, 3, 12]
                : [0.8, 2.6, 10]
              : mobile
                ? phone
                  ? [5, 3.5, 11.2]
                  : [5, 3.5, 13.2]
                : [6, 3.8, 9.1],
          fov:
            props.variant === "reveal"
              ? mobile
                ? 44
                : 28
              : mobile && !phone
                ? 44
                : 38,
          near: 0.1,
          far: 100,
        }}
        gl={{ antialias: !mobile, alpha: true, powerPreference: "low-power" }}
      >
        <StudioLighting />
        <Assembly {...props} />
      </Canvas>
    </div>
  );
}
