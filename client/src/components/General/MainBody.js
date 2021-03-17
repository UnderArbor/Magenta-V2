import React from "react";
import { motion, AnimatePresence } from "framer-motion";

import FeatureMockupDark from "../../utils/images/Feature_Dark.svg";

import FeatureMockupLight from "../../utils/images/Feature_Light.svg";

const MainBody = () => {
  const bodyVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 100,
      transition: {
        duration: 10,
      },
    },
    exit: {
      opactiy: 0,
      transition: {
        duration: 100000,
      },
    },
  };

  return (
    <AnimatePresence>
      <motion.div
        className="contentContainer"
        variants={bodyVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <p className="featureHeader">Features</p>
        <div className="infoContainer">
          <div className="featureContainer">
            <p className="featureTitle">Feature 1</p>
            <p className="featureBody">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmon tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet.
            </p>
          </div>
          <img className="featureMockup" src={FeatureMockupDark} />
        </div>
        <div className="infoContainer reverseInfoContainer">
          <img
            className="featureMockup beforeMockup"
            src={FeatureMockupLight}
          />
          <div className="featureContainer">
            <p className="featureTitle">Feature 2</p>
            <p className="featureBody">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmon tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet.
            </p>
          </div>
          <img className="featureMockup afterMockup" src={FeatureMockupLight} />
        </div>
        <div className="infoContainer">
          <div className="featureContainer">
            <p className="featureTitle">Feature 3</p>
            <p className="featureBody">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmon tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet.
            </p>
          </div>
          <img className="featureMockup" src={FeatureMockupDark} />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MainBody;
