import React from 'react';
import { motion } from 'framer-motion';


const line1 = "Unveil the Path to ";
const line2 = "Limitless Possibilities...";

const container = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.03, delayChildren: 0.04 * i },
  }),
};

const child = {
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100,
    },
  },
  hidden: {
    opacity: 0,
    x: 20,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100,
    },
  },
};

const Head = () => {
  return (

          <motion.h1
            className="text-orange-600 max-w-2xl mb-4 text-4xl font-bold leading-none tracking-tight md:text-5xl xl:text-6xl"
            initial="hidden"
            animate="visible"
          >
            <motion.div className="inline-block" variants={container}>
              {line1.split("").map((char, index) => (
                <motion.span key={index} variants={child}>
                  {char}
                </motion.span>
              ))}
            </motion.div>
            <br />
            <motion.div className="inline-block" variants={container}>
              {line2.split("").map((char, index) => (
                <motion.span key={index} variants={child}>
                  {char}
                </motion.span>
              ))}
            </motion.div>
          </motion.h1>

  );
};

export default Head;
