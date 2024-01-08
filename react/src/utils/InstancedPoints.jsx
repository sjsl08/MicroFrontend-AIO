import * as React from "react";
import * as THREE from "three";
import { useAnimatedLayout } from "./layouts";
import { a } from "@react-spring/three";
import { Html } from "@react-three/drei";
import { debounce } from "lodash";
import { useEffect } from "react";
import { useMemo } from "react";
import { useRef } from "react";

const scratchObject3D = new THREE.Object3D();

function updateInstancedMeshMatrices({ mesh, data }) {
  if (!mesh) return;

  for (let i = 0; i < data.length; ++i) {
    const { x, y, z } = data[i];

    scratchObject3D.position.set(x, y, z);
    scratchObject3D.rotation.set(0.5 * Math.PI, 0, 0);
    scratchObject3D.updateMatrix();
    mesh.setMatrixAt(i, scratchObject3D.matrix);
  }

  mesh.instanceMatrix.needsUpdate = true;
}

const SELECTED_COLOR = "#6f6";
const DEFAULT_COLOR = "white";

const scratchColor = new THREE.Color();

const usePointColors = ({ data, selectedPoint }) => {
  const numPoints = data.length;
  const colorAttrib = useRef();
  const colorArray = useMemo(
    () => new Float32Array(numPoints * 3),
    [numPoints]
  );

  useEffect(() => {
    for (let i = 0; i < data.length; ++i) {
      scratchColor.set(
        data[i] === selectedPoint ? SELECTED_COLOR : DEFAULT_COLOR
      );
      scratchColor.toArray(colorArray, i * 3);
    }
    colorAttrib.current.needsUpdate = true;
  }, [data, selectedPoint, colorArray]);

  return { colorAttrib, colorArray };
};

const useMousePointInteraction = ({ data, selectedPoint, onSelectPoint }) => {
  const handleClick = debounce((event) => {
    const { instanceId } = event;
    const index = instanceId;
    const point = data[index];

    // toggle the point
    if (point === selectedPoint) {
      onSelectPoint(null);
    } else {
      onSelectPoint(point);
    }
  }, 1000);

  return { handleClick };
};

const InstancedPoints = ({ data, layout, selectedPoint, onSelectPoint }) => {
  const meshRef = useRef();
  const numPoints = data.length;

  const { animationProgress } = useAnimatedLayout({
    data,
    layout,
    onFrame: () => {
      updateInstancedMeshMatrices({ mesh: meshRef.current, data });
    },
  });

  useEffect(() => {
    updateInstancedMeshMatrices({ mesh: meshRef.current, data });
  }, [data, layout]);

  const { handleClick } = useMousePointInteraction({
    data,
    selectedPoint,
    onSelectPoint,
  });
  const { colorAttrib, colorArray } = usePointColors({ data, selectedPoint });

  return (
    <>
      <instancedMesh
        ref={meshRef}
        args={[null, null, numPoints]}
        frustumCulled={false}
        onClick={handleClick}
        // onPointerOver={handleClick}
      >
        <sphereGeometry attach="geometry" args={[5]}>
          <instancedBufferAttribute
            ref={colorAttrib}
            attachObject={["attributes", "color"]}
            args={[colorArray, 3]}
          />
        </sphereGeometry>
        <meshStandardMaterial
          attach="material"
          vertexColors={THREE.VertexColors}
        />
      </instancedMesh>

      {selectedPoint && (
        <>
          <a.group
            position={animationProgress.interpolate(() => [
              selectedPoint.x,
              selectedPoint.y,
              selectedPoint.z,
            ])}
          >
            <pointLight
              distance={9}
              position={[0, 0, 0.3]}
              intensity={2.2}
              decay={30}
              color="#3f3"
            />
            <pointLight
              position={[0, 0, 0]}
              decay={1}
              distance={5}
              intensity={1.5}
              color="#2f0"
            />
          </a.group>

          {/* Text label for selected point */}
          <Html
            position={[
              selectedPoint.x,
              selectedPoint.y,
              selectedPoint.z + 1, // Adjust the height of the text label
            ]}
            fontSize={1} // Adjust the font size as needed
            color="#fff" // Adjust the text color
          >
         <table>
  <tr>
    <th>Company</th>
    <th>Contact</th>
    <th>Country</th>
  </tr>
  <tr>
    <td>Alfreds Futterkiste</td>
    <td>Maria Anders</td>
    <td>Germany</td>
  </tr>
  <tr>
    <td>Centro comercial Moctezuma</td>
    <td>Francisco Chang</td>
    <td>Mexico</td>
  </tr>
</table>
          </Html>
        </>
      )}
    </>
  );
};

export default InstancedPoints;
