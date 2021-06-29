import React from "react";
import info from "../../utils/icons/information-button.svg";

import ReactTooltip from "react-tooltip";

const ImportDeckZone = ({ createDeck, uploadPacket }) => {
  return (
    <div className="importDeckZone">
      <input
        type="file"
        id="file"
        className="inputFile"
        accept=".txt"
        hidden
        onChange={async (e) => {
          createDeck();
          uploadPacket(e.target.files[0]);
        }}
      />
      <label className="inputFileLabel" htmlFor="file">
        Import deck
      </label>
      <img src={info} className="infoIcon" data-tip data-for="info" />
      <ReactTooltip id="info">
        <p>You can import a .txt file in these formats:</p>
        <ul>
          <li>Word</li>
          <li>Chart</li>
          <li>Else</li>
        </ul>
      </ReactTooltip>
    </div>
  );
};

export default ImportDeckZone;
