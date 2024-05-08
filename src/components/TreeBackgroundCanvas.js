import React, { Suspense, useState } from "react";
import styled from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Canvas, useFrame } from "@react-three/fiber/native";
import { useGLTF, PerspectiveCamera, Sky } from "@react-three/drei/native";
import tree from "../models/FallTree.glb";

const Container = styled.View`
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

  const gltf = useGLTF(tree);
  return (
    <primitive {...props} object={gltf.scene} rotation={[0, zRotation, 0]} />
  );
}

const BackgroundCanvas = () => {
  const { top } = useSafeAreaInsets();
  return (
    <Container top={top}>
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0.3, 5]} filmOffset={5} />
        <ambientLight intensity={2.5} />
        <pointLight position={[5, 5, 5]} castShadow receiveShadow />
        <Sky rayleigh={1} turbidity={100} mieDirectionalG={1} />
        <Suspense fallback={null}>
          <Model />
        </Suspense>
      </Canvas>
    </Container>
  );
};

export default BackgroundCanvas;
