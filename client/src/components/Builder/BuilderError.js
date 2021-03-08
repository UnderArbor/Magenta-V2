import React from "react";

import Navigation from "../General/Navigation";

const BuilderError = () => {
  return (
    <div className="builderPage">
      <Navigation />
      <div className="errorContainer">
        <p className="errorMessage">Beep Boop, your URL is poop</p>
      </div>
    </div>
  );
};

export default BuilderError;
