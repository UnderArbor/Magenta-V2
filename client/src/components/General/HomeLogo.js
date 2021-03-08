import React from "react";
import { Link } from "react-router-dom";

const HomeLogo = ({ position }) => {
  return (
    <Link to="/" style={{ textDecoration: "none" }}>
      <div
        className={position ? "magentaLogo topLogo" : "magentaLogo bottomLogo"}
      >
        Mage<p className="logoFlair">n</p>ta
      </div>
    </Link>
  );
};

export default HomeLogo;
