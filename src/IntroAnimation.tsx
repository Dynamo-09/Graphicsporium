import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IntroAnimation({ onComplete }) {
  const [phase, setPhase] = useState(1);
  const [overlayTextVisible, setOverlayTextVisible] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const runSequence = async () => {
      // Phase 1: Drop & Bounce
      await new Promise(r => setTimeout(r, 2500));
      setPhase(2);

      // Phase 2: Morph to Capsule
      await new Promise(r => setTimeout(r, 1000));
      setPhase(3);

      // Phase 3: Greeting text hold
      await new Promise(r => setTimeout(r, 3000));
      setPhase(4);

      // Phase 4: Takeover expansion
      await new Promise(r => setTimeout(r, 1000));
      setPhase(5);
      
      // Phase 5: Blur overlay
      setTimeout(() => setOverlayTextVisible(true), 200);
      await new Promise(r => setTimeout(r, 3000));
      setOverlayTextVisible(false);

      // Phase 6: Reveal
      await new Promise(r => setTimeout(r, 800));
      setPhase(6);

      await new Promise(r => setTimeout(r, 800));
      document.body.style.overflow = 'unset';
      onComplete();
    };

    runSequence();

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [onComplete]);

  const shapeVariants = {
    phase1: {
      y: ["-100vh", "0vh", "0vh", "-25vh", "0vh", "0vh", "-8vh", "0vh", "0vh", "0vh"],
      scaleY: [1, 1, 0.5, 1, 1, 0.75, 1, 1, 0.9, 1],
      scaleX: [1, 1, 1.5, 1, 1, 1.25, 1, 1, 1.1, 1],
      width: "120px",
      height: "120px",
      borderRadius: "50%",
      transition: {
        duration: 2.5,
        times: [0, 0.35, 0.4, 0.55, 0.7, 0.75, 0.85, 0.92, 0.95, 1],
        ease: ["easeIn", "easeOut", "easeOut", "easeIn", "easeOut", "easeOut", "easeIn", "easeOut", "easeOut"]
      }
    },
    phase2: {
      y: "0vh",
      width: "360px",
      height: "120px",
      borderRadius: "60px",
      transition: { duration: 0.8, ease: [0.6, 0.01, -0.05, 0.95] } // Premium snap easing
    },
    phase4: {
      y: "0vh",
      width: "300vw",
      height: "300vw",
      borderRadius: "50%",
      transition: { duration: 1, ease: [0.8, 0, 0.2, 1] } // Dramatic expansion easing
    }
  };

  return (
    <motion.div 
      className="intro-wrapper"
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === 6 ? 0 : 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="intro-scene">
        <motion.div 
          className="intro-shape"
          variants={shapeVariants}
          initial={{ y: "-100vh", width: "120px", height: "120px", borderRadius: "50%" }}
          animate={
            phase === 1 ? 'phase1' :
            phase >= 4 ? 'phase4' : 'phase2'
          }
        >
          <AnimatePresence>
            {phase === 3 && (
              <motion.span 
                className="intro-greeting-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              >
                Welcome
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {phase >= 5 && phase < 6 && (
          <motion.div 
            className="intro-glass-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <AnimatePresence>
              {overlayTextVisible && (
                <motion.h1 
                  className="intro-final-text"
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
