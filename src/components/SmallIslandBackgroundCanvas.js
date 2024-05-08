import { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber/native";
import styled from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useGLTF, PerspectiveCamera, Sky } from "@react-three/drei/native";
import { Suspense, useState } from "react";
import smallIsland from "../models/SmallIsland.glb";
import landscape from "../models/Landscape.glb";

const Container = styled.View`
  flex: 1;
  position: absolute;
  top: ${({ top }) => top}px;
  left: 0;
  height: 100%;
  width: 100%;
`;

function Model(props) {
  const [zRotation, setZRotation] = useState(0);

  useFrame(() => {
    setZRotation((zRotation) => zRotation + 0.001);
  });

  const gltf = useGLTF(smallIsland);
  return (
    <mesh position={[0, 2, 0]} scale={0.9}>
      <primitive
        {...props}
        object={gltf.scene}
        rotation={[0, zRotation, 0]}
        castShadow
        receiveShadow
      />
    </mesh>
  );
}

const ModelTwo = (props) => {
  const [zRotation, setZRotation] = useState(0);

  useFrame(() => {
    setZRotation((zRotation) => zRotation + 0.001);
  });

  const gltf = useGLTF(landscape);
  return (
    <mesh position={[0, -6, 0]} scale={1.2}>
      <primitive
        {...props}
        object={gltf.scene}
        rotation={[0, zRotation, 0]}
        receiveShadow
        castShadow
      />
    </mesh>
  );
};

const CustomCamera = () => {
  const cameraRef = useRef();
  const { camera } = useThree();
  useEffect(() => {
    console.log("camera", camera);
    camera.position.set(2, 8, 20);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return (
    <PerspectiveCamera makeDefault position={[0, 2, 20]} ref={cameraRef} />
  );
};

const SmallIslandBackgroundCanvas = () => {
  const { top } = useSafeAreaInsets();

  return (
    <Container top={top}>
      <Canvas>
        <CustomCamera />
        <Sky sunPosition={[0, 2, 10]} />

        <hemisphereLight intensity={0.35} />
        <ambientLight intensity={0.8} />
        <pointLight position={[0, 20, 5]} intensity={70} />
        <Suspense fallback={null}>
          <Model />
          <ModelTwo />
        </Suspense>
      </Canvas>
    </Container>
  );
};

export default SmallIslandBackgroundCanvas;
