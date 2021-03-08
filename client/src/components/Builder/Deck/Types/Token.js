import React from "react";
import ReactHoverObserver from "react-hover-observer";
import { motion } from "framer-motion";

const Token = ({ token, imageVariant, cardVariant }) => {
  return (
    <motion.div
      className="tokenContainer"
      variants={cardVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <ReactHoverObserver
        hoverDelayInMs={170}
        {...{
          onMouseOver: ({ e, setIsHovering, unsetIsHovering }) => {
            if (
              e.target.className === "bigCardImage" ||
              e.target.className === "cardName" ||
              e.target.className === "settings"
            ) {
              unsetIsHovering();
            } else {
              setIsHovering();
            }
          },
        }}
      >
        {({ isHovering }) => (
          <div>
            <div className="cardArtContainer">
              <img src={token.image} className="cardArt" />
            </div>
            {isHovering && (
              <motion.img
                className="bigCardImage"
                draggable="false"
                src={token.cardImage}
                variants={imageVariant}
                initial="hidden"
                animate="visible"
                exit="exit"
              />
            )}
          </div>
        )}
      </ReactHoverObserver>
      <p className="cardName">{token.name}</p>
    </motion.div>
  );
};

export default Token;
