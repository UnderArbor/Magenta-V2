import React from "react";

const ImportDisplay = ({ importInfo }) => {
  return (
    <div className="importInfo">
      <p className="importTitle">Importing Cards...</p>
      <div className="progress progressBar">
        <div
          className="progress progressAmount"
          style={{ width: `${importInfo.ratio}%` }}
        ></div>
      </div>
      <div className="importNameContainer">
        <p className="importName">
          {importInfo.index} / {importInfo.length}:
        </p>
        <p className="importName">{importInfo.name}</p>
      </div>
    </div>
  );
};

export default ImportDisplay;
