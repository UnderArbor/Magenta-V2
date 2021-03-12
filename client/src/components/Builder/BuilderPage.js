import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Route, useRouteMatch } from "react-router-dom";

import BuilderContainer from "./BuilderContainer";
import NewDeckContainer from "../Buttons/NewDeckContainer";
import Navigation from "../General/Navigation";
import DeckScrollList from "../Builder/Deck/DeckScrollList";

import { toggleDeckList } from "../../actions/deck";

const BuilderPage = ({ openDeckList, toggleDeckList }) => {
  let { path, url } = useRouteMatch();

  useEffect(() => () => toggleDeckList(false), []);

  return (
    <div className="builderPage">
      <Navigation openDeckList={openDeckList} toggleDeckList={toggleDeckList} />
      {openDeckList && <DeckScrollList />}
      <Route exact path={path} component={NewDeckContainer} />
      <Route path={`${path}/:deckId`} component={BuilderContainer} />
    </div>
  );
};

BuilderPage.propTypes = {
  openDeckList: PropTypes.bool.isRequired,
  toggleDeckList: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  openDeckList: state.deck.openDeckList,
});

export default connect(mapStateToProps, { toggleDeckList })(BuilderPage);
