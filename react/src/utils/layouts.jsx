import * as React from 'react';
import { useSpring } from '@react-spring/three';

function gridLayout(data) {
  const numPoints = data.length;
  const numCols = Math.ceil(Math.sqrt(numPoints));
  const numRows = numCols;

  for (let i = 0; i < numPoints; ++i) {
    const datum = data[i];
    const col = (i % numCols) - numCols / 2;
    const row = Math.floor(i / numCols) - numRows / 2;

    datum.x = col * 20;
    datum.y = row * 20;
    datum.z = 0;
  }
}

function waveLayout(data) {
  const numPoints = data.length;
  const frequency = 0.5;
  const amplitude = 1.5;

  for (let i = 0; i < numPoints; ++i) {
    const datum = data[i];
    const waveOffset = i * frequency;
    datum.x = i;
    datum.y = Math.sin(waveOffset) * amplitude;
    datum.z = 0;
  }
}

function InfinitySymbolLayout(data, size = 50, numPoints = 200) {
  const centerX = 0;
  const centerY = 0;

  // Loop for the right (larger) part of the infinity symbol
  for (let i = 0; i < numPoints / 2; ++i) {
    const t = i / (numPoints / 2);
    const angle = t * Math.PI;

    const x1 = Math.cos(angle) * size * Math.sin(angle);
    const y1 = Math.sin(angle) * size * Math.sin(angle);

    data[i].x = x1 + centerX;
    data[i].y = y1 + centerY;
    data[i].z = 0;
  }

  // Loop for the left (smaller) part of the infinity symbol
  for (let i = 0; i < numPoints / 4; ++i) {
    const t = i / (numPoints / 4);
    const angle = t * Math.PI;

    const x2 = Math.cos(angle) * (size / 2) * Math.sin(angle);
    const y2 = -Math.sin(angle) * (size / 2) * Math.sin(angle);

    data[numPoints / 2 + i].x = x2 + centerX;
    data[numPoints / 2 + i].y = y2 + centerY;
    data[numPoints / 2 + i].z = 0;
  }
}

function mobiusLayout(data) {
  const numPoints = data.length;
  const width = 2; // Adjust the width of the strip
  const numTwists = 1; // Adjust the number of twists in the strip

  for (let i = 0; i < numPoints; ++i) {
    const datum = data[i];
    const t = i / (numPoints - 1);
    const phi = t * Math.PI * 2 * numTwists;

    const x = Math.cos(phi) * (1 + t * width * 0.5);
    const y = Math.sin(phi) * (1 + t * width * 0.5);
    const z = t * width * 0.5 * Math.sin(phi * 0.5); // Additional twist in z-axis

    datum.x = x;
    datum.y = y;
    datum.z = z;
  }
}

function spiralLayout(data) {
  // equidistant points on a spiral
  let theta = 0;
  for (let i = 0; i < data.length; ++i) {
    const datum = data[i];
    const radius = Math.max(1, Math.sqrt(i + 1) * 0.8);
    theta += Math.asin(1 / radius) * 1;

    datum.x = radius * Math.cos(theta);
    datum.y = radius * Math.sin(theta);
    datum.z = 0;
  }
}

export const useLayout = ({ data, layout = 'grid' }) => {
  React.useEffect(() => {
    console.log(layout);
    switch (layout) {
      case 'spiral':
        spiralLayout(data);
        break;
      case 'grid':
        gridLayout(data);
        break
      case 'stack':
        stackedRingsLayout(data);
        break
      default: {
        gridLayout(data);
      }
    }
  }, [data, layout]);
};

function stackedRingsLayout(data, numRings = 7, numPointsPerRing = Math.floor(data.length / numRings)) {
  const centerX = 0;
  const centerY = 0;
  const ringSizes = [5000, 4000, 3000, 1000, 3000, 4000, 5000]; // Adjust sizes of each ring
  const verticalSpacing = 100; // Adjust vertical spacing between rings

  let index = 0;
  for (let r = 0; r < numRings; ++r) {
    const radius = ringSizes[r];
    const yOffset = r * verticalSpacing;

    for (let i = 0; i < numPointsPerRing; ++i) {
      const theta = (i / numPointsPerRing) * Math.PI * 2;
      const x = centerX + radius * Math.cos(theta);
      const y = centerY + radius * Math.sin(theta);
      const z = yOffset;

      data[index].x = x;
      data[index].y = y;
      data[index].z = z;

      index++;
    }
  }
}

function helixLayout(data) {
  const numPoints = data.length;
  const helixRadius = 1.5; // Adjust the radius of the helix
  const helixHeight = 0.2; // Adjust the height between each loop

  for (let i = 0; i < numPoints; ++i) {
    const datum = data[i];
    const theta = i * 0.3; // Adjust the angle between each point

    datum.x = helixRadius * Math.cos(theta);
    datum.y = helixRadius * Math.sin(theta);
    datum.z = i * helixHeight; // Increase the z-coordinate to create the helix
  }
}

function useSourceTargetLayout({ data, layout }) {
  // prep for new animation by storing source
  React.useEffect(() => {
    for (let i = 0; i < data.length; ++i) {
      data[i].sourceX = data[i].x || 0;
      data[i].sourceY = data[i].y || 0;
      data[i].sourceZ = data[i].z || 0;
    }
  }, [data, layout]);

  // run layout
  useLayout({ data, layout });

  // store target
  React.useEffect(() => {
    for (let i = 0; i < data.length; ++i) {
      data[i].targetX = data[i].x;
      data[i].targetY = data[i].y;
      data[i].targetZ = data[i].z;
    }
  }, [data, layout]);
}

function interpolateSourceTarget(data, progress) {
  for (let i = 0; i < data.length; ++i) {
    data[i].x = (1 - progress) * data[i].sourceX + progress * data[i].targetX;
    data[i].y = (1 - progress) * data[i].sourceY + progress * data[i].targetY;
    data[i].z = (1 - progress) * data[i].sourceZ + progress * data[i].targetZ;
  }
}

export function useAnimatedLayout({ data, layout, onFrame }) {
  // compute layout remembering initial position as source and
  // end position as target
  useSourceTargetLayout({ data, layout });

  // do the actual animation when layout changes
  const prevLayout = React.useRef(layout);
  const animProps = useSpring({
    animationProgress: 1,
    from: { animationProgress: 0 },
    reset: layout !== prevLayout.current,
    onFrame: ({ animationProgress }) => {
      // interpolate based on progress
      interpolateSourceTarget(data, animationProgress);
      // callback to indicate data has updated
      onFrame({ animationProgress });
    },
  });
  prevLayout.current = layout;

  return animProps;
}