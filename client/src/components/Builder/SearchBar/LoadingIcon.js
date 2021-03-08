import React from "react";

import { motion } from "framer-motion";

export const LoadingIcon = ({ right, top, size, color }) => {
  const loadingContainerVariants = {
    start: {
      transition: {
        staggerChildren: 0.4,
      },
    },
    end: {
      transition: {
        staggerChildren: 0.4,
      },
    },
  };

  const loadingCircleVariants = {
    start: {
      y: "0px",
    },
    end: {
      y: "-5px",
    },
  };

  const loadingCircleTransition = {
    duration: 1,
    repeat: Infinity,
    repeatType: "reverse",
    ease: "easeInOut",
  };

  return (
    <motion.div
      className="loadingContainer"
      style={{ right: `${right}`, top: `${top}` }}
      variants={loadingContainerVariants}
      initial="start"
      animate="end"
    >
      <motion.div
        className="loadingCircle"
        style={{
          width: `${size}`,
          height: `${size}`,
          backgroundColor: `${color}`,
        }}
        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
      />
      <motion.div
        className="loadingCircle"
        style={{
          width: `${size}`,
          height: `${size}`,
          backgroundColor: `${color}`,
        }}
        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
      />
      <motion.div
        className="loadingCircle"
        style={{
          width: `${size}`,
          height: `${size}`,
          backgroundColor: `${color}`,
        }}
        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
      />
    </motion.div>
  );
};

export default LoadingIcon;
