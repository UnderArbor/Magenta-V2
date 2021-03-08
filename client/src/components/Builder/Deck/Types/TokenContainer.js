import React from "react";
import { AnimatePresence } from "framer-motion";

import TypeHeader from "./TypeHeader";
import Token from "./Token";

const TokenContainer = ({ tokens }) => {
  const imageVariant = {
    hidden: {
      opacity: 0,
      y: -8,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        ease: "easeOut",
        duration: 0.45,
      },
    },
    exit: {
      opacity: 0,
      y: -8,
    },
  };

  const cardVariant = {
    hidden: {
      opacity: 0,
      y: 8,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        ease: "easeOut",
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      y: 8,
      transition: {
        ease: "easeOut",
        duration: 0.35,
      },
    },
  };

  return (
    <div className="tokenContent">
      <div className="typeContainer">
        <div className="typeTitle">Tokens</div>
        <hr className="typeDivider" />
        <AnimatePresence>
          {tokens.map((token) => {
            return (
              <Token
                token={token}
                key={token.name}
                imageVariant={imageVariant}
                cardVariant={cardVariant}
              />
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TokenContainer;
