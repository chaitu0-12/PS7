import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

const FloatingShapes = ({ isDark, activeTab }: { isDark: boolean, activeTab: string }) => {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.05;
      group.current.rotation.x = state.clock.elapsedTime * 0.03;
    }
  });

  // Tab-specific color and position logic
  const getTabStyles = () => {
    switch(activeTab) {
      case 'analytics':
        return {
          color1: isDark ? '#3B82F6' : '#2563EB', // Blue
          color2: isDark ? '#10B981' : '#059669', // Green
          posOffset: 2
        };
      case 'explanation':
        return {
          color1: isDark ? '#F59E0B' : '#D97706', // Amber
          color2: isDark ? '#06B6D4' : '#0891B2', // Cyan
          posOffset: 0
        };
      default: // upload
        return {
          color1: isDark ? '#bc13fe' : '#93C5FD', // Purple/Blue
          color2: isDark ? '#00f3ff' : '#FBCFE8', // Cyan/Pink
          posOffset: -2
        };
    }
  };

  const { color1, color2, posOffset } = getTabStyles();

  return (
    <group ref={group}>
      {/* Node 1: Top Left */}
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <group position={[-6 + posOffset, 4, -12]}>
          <mesh>
            <icosahedronGeometry args={[2, 1]} />
            <meshStandardMaterial color={color1} wireframe transparent opacity={0.3} />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.5, 16, 16]} />
            <meshStandardMaterial color={color1} emissive={color1} emissiveIntensity={2} />
          </mesh>
        </group>
      </Float>
      
      {/* Node 2: Bottom Right */}
      <Float speed={1.5} rotationIntensity={1.5} floatIntensity={2.5}>
        <group position={[7 - posOffset, -5, -15]}>
          <mesh>
            <icosahedronGeometry args={[3, 1]} />
            <meshStandardMaterial color={color2} wireframe transparent opacity={0.2} />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.8, 16, 16]} />
            <meshStandardMaterial color={color2} emissive={color2} emissiveIntensity={1.5} />
          </mesh>
        </group>
      </Float>

      {/* Node 3: Center Drifter */}
      <Float speed={2.5} rotationIntensity={0.5} floatIntensity={1.5}>
        <group position={[posOffset, 2, -10]}>
          <mesh>
            <icosahedronGeometry args={[1.5, 1]} />
            <meshStandardMaterial color={color1} wireframe transparent opacity={0.25} />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.4, 16, 16]} />
            <meshStandardMaterial color={color1} emissive={color1} emissiveIntensity={2} />
          </mesh>
        </group>
      </Float>
    </group>
  );
};

export default function Background3D({ isDark, activeTab }: { isDark: boolean, activeTab: string }) {
  return (
    <div className="fixed inset-0 -z-10 transition-colors duration-1000" 
         style={{ 
           background: isDark 
             ? `radial-gradient(circle at ${activeTab === 'analytics' ? '80%' : '50%'} 50%, #1A1F2E 0%, #0B0F19 100%)` 
             : `radial-gradient(circle at ${activeTab === 'analytics' ? '80%' : '50%'} 50%, #E3F2FD 0%, #FFE5D9 100%)` 
         }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={isDark ? 0.4 : 0.8} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <FloatingShapes isDark={isDark} activeTab={activeTab} />
        {isDark && <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />}
      </Canvas>
    </div>
  );
}
