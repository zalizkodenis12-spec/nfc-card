"use client";

import { motion } from "framer-motion";

interface WaveCurtainsProps {
  /** "closed" = curtains meet in center (covering screen); "open" = parted to sides */
  state: "open" | "closed";
  duration?: number;
  zIndex?: number;
}

export default function WaveCurtains({
  state,
  duration = 1.0,
  zIndex = 200,
}: WaveCurtainsProps) {
  const isClosed = state === "closed";

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none flex"
      style={{ zIndex }}
    >
      {/* LEFT half */}
      <motion.div
        initial={false}
        animate={{ x: isClosed ? 0 : "-100vw" }}
        transition={{ duration, ease: [0.76, 0, 0.24, 1] }}
        className="relative h-full bg-brand-primary pointer-events-auto"
        style={{ width: "50%" }}
      >
        {/* Simple smooth vertical wave on right edge */}
        <div className="absolute top-0 right-[-50px] h-full w-[100px]">
          <svg viewBox="0 0 100 1000" preserveAspectRatio="none" className="w-full h-full">
            <path
              d="M50,0 C0,333 100,666 50,1000 L0,1000 L0,0 Z"
              className="fill-brand-primary"
            />
          </svg>
        </div>
      </motion.div>

      {/* RIGHT half */}
      <motion.div
        initial={false}
        animate={{ x: isClosed ? 0 : "100vw" }}
        transition={{ duration, ease: [0.76, 0, 0.24, 1] }}
        className="relative h-full bg-brand-primary pointer-events-auto"
        style={{ width: "50%" }}
      >
        {/* Simple smooth vertical wave on left edge */}
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
  );
}
