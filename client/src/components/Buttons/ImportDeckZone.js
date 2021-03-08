import React from "react";
import axios from "axios";

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
    </div>
  );
};

export default ImportDeckZone;
