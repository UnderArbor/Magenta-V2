import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HomeLogo = ({ position, navVariant }) => {
  const positionClass = position
    ? `magentaLogo topLogo`
    : `magentaLogo bottomLogo`;

  return (
    <Link to="/" style={{ textDecoration: "none" }}>
      <motion.div
        className={positionClass}
        variants={navVariant}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        Mage
        <p className="logoFlair">n</p>
        ta
      </motion.div>
    </Link>
  );
};

export default HomeLogo;
