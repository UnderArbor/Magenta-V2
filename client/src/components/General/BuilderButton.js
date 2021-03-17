import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const BuilderButton = ({ navVariant, buildSticky }) => {
  return (
    <Link to="/builder">
      <motion.button
        className="headerButton builderEnter mainBuilderEnter"
        style={{ height: "40px" }}
        variants={buildSticky && navVariant}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        Deck Builder
      </motion.button>
    </Link>
  );
};

export default BuilderButton;
