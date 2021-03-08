import React from "react";
import { Link } from "react-router-dom";

const BuilderButton = () => {
  return (
    <Link to="/builder">
      <button className="headerButton builderEnter" style={{ height: "40px" }}>
        Deck Builder
      </button>
    </Link>
  );
};

export default BuilderButton;
