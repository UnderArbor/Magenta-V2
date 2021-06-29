import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Commander from "./Commander";

import {
  adjustSettingProperties,
  cloakSettings,
} from "../../../../actions/deck";

const CommanderContainer = ({
  commanders,
  typeIndex,
  adjustSettingProperties,
  boards,
  currentBoard,
  moveBoards,
  changeCardSet,
  changeDeckArt,
  modifyProperty,
  moveCard,
  changeMainProperty,
  propertyList,
  settingBooleans,
  cloakSettings,
}) => {
  const [openSettings1, setOpenSettings1] = useState(false);
  const [openSettings2, setOpenSettings2] = useState(false);

  const [bigImageSrc1, setImageSrc1] = useState(null);

  const [bigImageSrc2, setImageSrc2] = useState(null);

  return (
    <div
      className={`commanderContainer ${
        commanders.length === 0 && "emptyCommander"
      }`}
    >
      {commanders.map((commander, index) => (
        <Commander
          key={commander.name}
          cardIndex={index}
          typeIndex={typeIndex}
          commanderLength={commanders.length}
          commander={commander}
          openSettings={index === 0 ? openSettings1 : openSettings2}
          setOpenSettings={index === 0 ? setOpenSettings1 : setOpenSettings2}
          cloakSettings={cloakSettings}
          bigImageSrc={index === 0 ? bigImageSrc1 : bigImageSrc2}
          setImageSrc={index === 0 ? setImageSrc1 : setImageSrc2}
          adjustSettingProperties={adjustSettingProperties}
          boards={boards}
          currentBoard={currentBoard}
          moveBoards={moveBoards}
          changeCardSet={changeCardSet}
          changeDeckArt={changeDeckArt}
          modifyProperty={modifyProperty}
          moveCard={moveCard}
          changeMainProperty={changeMainProperty}
          propertyList={propertyList}
          settingBooleans={settingBooleans}
        />
      ))}
    </div>
  );
};

CommanderContainer.propTypes = {
  settingBooleans: PropTypes.object.isRequired,
  cloakSettings: PropTypes.func.isRequired,
  adjustSettingProperties: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  settingBooleans: state.deck.settingBooleans,
});

export default connect(mapStateToProps, {
  cloakSettings,
  adjustSettingProperties,
})(CommanderContainer);
