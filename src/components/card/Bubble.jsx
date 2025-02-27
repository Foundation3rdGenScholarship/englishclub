import React from "react";
import { motion } from "framer-motion";

const bubbles = [
  { size: "w-16 h-16", x: "-left-5", y: "top-10", delay: 0.2 },
  { size: "w-10 h-10", x: "left-1/4", y: "top-1/3", delay: 0.5 },
  { size: "w-24 h-24", x: "left-1/2", y: "top-1/2", delay: 0.7 },
  { size: "w-8 h-8", x: "right-1/3", y: "top-1/4", delay: 0.3 },
  { size: "w-14 h-14", x: "right-1/6", y: "top-3/4", delay: 0.6 },
  { size: "w-32 h-32", x: "-right-5", y: "bottom-10", delay: 1.0 },
];

const Bubbles = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden -z-10">
      {bubbles.map((bubble, index) => (
        <motion.div
          key={index}
          className={`absolute ${bubble.size} ${bubble.x} ${bubble.y} bg-blue-400 rounded-full opacity-50`}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.5 }}
          transition={{ duration: 1.5, delay: bubble.delay, repeat: Infinity, repeatType: "reverse" }}
        />
      ))}
    </div>
  );
};

export default Bubbles; 