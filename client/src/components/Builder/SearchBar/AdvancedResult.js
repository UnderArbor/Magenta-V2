import React from "react";
import getCardInfo from "../../../utils/functions/getCardInfo";

const AdvancedResult = ({
  result,
  addCard,
  isHovering = false,
  selectedBoard,
}) => {
  return (
    <div className="resultContainer">
      <img
        src={result.image_uris.large}
        className="asResultImage"
        onClick={async () => {
          console.log("selectedBoard: ", selectedBoard);
          addCard(await getCardInfo(result.name), selectedBoard);
        }}
      />
      {/* {isHovering && (
        <img className="asBigResult" src={result.image_uris.large} />
      )} */}
    </div>
  );
};

export default AdvancedResult;
