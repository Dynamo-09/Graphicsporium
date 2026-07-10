import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Text, PerspectiveCamera } from '@react-three/drei';
import { motion as motion3d } from 'framer-motion-3d';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

// @ts-ignore
const MotionText = motion3d(Text);

interface IntroCanvasProps {
  onComplete: () => void;
}

export default function IntroCanvas({ onComplete }: IntroCanvasProps) {
  const [phase, setPhase] = useState<number>(1);
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayTextVisible, setOverlayTextVisible] = useState(false);

  useEffect(() => {
    // Sequence orchestration
    const sequence = async () => {
      // Phase 1 (Drop & Bounce) to Phase 2 (Morph): wait 2.5s for bounce to settle
      await new Promise(r => setTimeout(r, 2500));
      setPhase(2);
      
      // Phase 2 to Phase 3 (Greeting): 1 second for morphing
      await new Promise(r => setTimeout(r, 1200));
      setPhase(3);
      
      // Phase 3 to Phase 4 (Dive): 3 seconds hold for "Welcome", plus fade in/out time
      await new Promise(r => setTimeout(r, 3500));
      setPhase(4);
      
      // Phase 4 to Phase 5 (Glassmorphism): wait 1s for the dive/scale up
      await new Promise(r => setTimeout(r, 1200));
      setPhase(5);
      setShowOverlay(true);
      setTimeout(() => setOverlayTextVisible(true), 200);
      
      // Phase 5 to Phase 6 (Reveal): hold text for 2s
      await new Promise(r => setTimeout(r, 2500));
      setOverlayTextVisible(false);
      
      // wait for text to fade out
      await new Promise(r => setTimeout(r, 800)); 
      setShowOverlay(false);
      setPhase(6);

      // Tell parent to unmount after overall fade
      await new Promise(r => setTimeout(r, 1200));
      onComplete();
    };
    
    // Prevent scrolling while intro is active
    document.body.style.overflow = 'hidden';
    sequence();
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [onComplete]);

  return (
    <motion.div 
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 99999,
        backgroundColor: '#030712'
      }}
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === 6 ? 0 : 1 }}
      transition={{ duration: 1 }}
    >
      <Canvas style={{ width: '100vw', height: '100vh', display: 'block' }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ED6B2D" />

        <Scene phase={phase} />
      </Canvas>

      <AnimatePresence>
        {showOverlay && (
          <motion.div 
            style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(12px)'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <AnimatePresence>
              {overlayTextVisible && (
                <motion.h1 
                  style={{
                    color: 'white',
                    fontSize: 'clamp(1.875rem, 5vw, 3rem)',
                    fontWeight: 'bold',
                    letterSpacing: '-0.025em',
                    textAlign: 'center',
                    padding: '0 1rem'
                  }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  Welcome to the World of Creativity
                </motion.h1>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function Scene({ phase }: { phase: number }) {
  // Animation variants for the Sphere
  const sphereVariants = {
    phase1: {
      y: [10, 0, 2.5, 0, 0.8, 0],
      scaleY: [1, 0.7, 1, 0.85, 1, 1],
      scaleX: [1, 1.2, 1, 1.1, 1, 1],
      scaleZ: [1, 1.2, 1, 1.1, 1, 1],
      transition: {
        duration: 2.5,
        times: [0, 0.35, 0.55, 0.75, 0.9, 1],
        ease: "easeInOut"
      }
    },
    phase2: {
      y: 0,
      scaleX: 3.5,
      scaleY: 1.1,
      scaleZ: 1.1,
      transition: { duration: 1, ease: "easeInOut" }
    },
    phase4: {
      scaleX: 80,
      scaleY: 80,
      scaleZ: 80,
      z: 8, // Move slightly towards camera to ensure engulfment
      transition: { duration: 1.2, ease: "easeIn" }
    }
  };

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} />
      
      <motion3d.mesh
        variants={sphereVariants}
        initial={{ y: 12 }}
        animate={
          phase === 1 ? 'phase1' 
          : phase >= 4 ? 'phase4' 
          : 'phase2'
        }
      >
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial 
          color="#ED6B2D" 
          roughness={0.2} 
          metalness={0.3}
          side={THREE.DoubleSide} 
        />
      </motion3d.mesh>
      
      {/* @ts-ignore */}
      <MotionText
        initial={{ fillOpacity: 0 }}
        animate={{ fillOpacity: phase === 3 ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        position={[0, 0, 1.5]}
        fontSize={0.6}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/outfit/v11/QGYyz_MVcBeNP4NJtEtq.woff"
      >
        Welcome
      </MotionText>
    </>
  );
}
