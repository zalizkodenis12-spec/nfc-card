"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function PageIntro() {
  const [splitting, setSplitting] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Start split after 0.7s
    const t1 = setTimeout(() => setSplitting(true), 700);
    // Remove from DOM after animation fully ends
    const t2 = setTimeout(() => setVisible(false), 2600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed inset-0 z-[999] overflow-hidden pointer-events-none flex">

          {/* LEFT half — slides out completely to the left */}
          <motion.div
            animate={splitting ? { x: "-100vw" } : { x: 0 }}
            transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
            className="relative h-full bg-brand-primary"
            style={{ width: "50%" }}
          >
            {/* Simple smooth vertical wave */}
            <div className="absolute top-0 right-[-50px] h-full w-[100px]">
              <svg viewBox="0 0 100 1000" preserveAspectRatio="none" className="w-full h-full">
                <path
                  d="M50,0 C0,333 100,666 50,1000 L0,1000 L0,0 Z"
                  className="fill-brand-primary"
                />
              </svg>
            </div>
          </motion.div>

          {/* RIGHT half — slides out completely to the right */}
          <motion.div
            animate={splitting ? { x: "100vw" } : { x: 0 }}
            transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
            className="relative h-full bg-brand-primary"
            style={{ width: "50%" }}
          >
            {/* Simple smooth vertical wave matching the left one */}
            <div className="absolute top-0 left-[-50px] h-full w-[100px]">
              <svg viewBox="0 0 100 1000" preserveAspectRatio="none" className="w-full h-full">
                <path
                  d="M50,0 C0,333 100,666 50,1000 L100,1000 L100,0 Z"
                  className="fill-brand-primary"
                />
              </svg>
            </div>
          </motion.div>

        </div>
      )}
    </AnimatePresence>
  );
}

