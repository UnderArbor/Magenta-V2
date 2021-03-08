import React from "react";
import { Link } from "react-router-dom";

import Navigation from "./Navigation";
import MainBody from "./MainBody";

const MainPage = () => {
  return (
    <div className="mainPage">
      <div className="headerBody">
        <Navigation />
        <div className="heroText">Welcome to Magenta</div>
        <p className="taglineText">A Magic: the Gathering Deckbuilder</p>
        <div className="headerButtonsContainer">
          <Link to="/builder">
            <button className="headerButton builderEnter mainBuilderEnter">
              Deck Builder
            </button>
          </Link>
          <Link to="/decks">
            <button className="headerButton decklistEnter">Deck List</button>
          </Link>
        </div>
      </div>
      <MainBody />
      <div className="salesPitchDiv">
        <img
          className="salesPitchImage"
          src={
            "https://images.unsplash.com/photo-1529641484336-ef35148bab06?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          }
        />
        <div className="salesPitchCover" />
        <div className="salesPitchCTA">
          <p className="salesPitchTitle">Get Started</p>
          <Link to="/builder" className="salesPitchButton">
            <button className="headerButton builderEnter">Deck Builder</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default MainPage;
