import React, { useState } from "react";
import { Link } from "react-router-dom";
import ScrollTrigger from "react-scroll-trigger";

import Navigation from "./Navigation";
import MainBody from "./MainBody";

const MainPage = () => {
  const [navSticky, setNavSticky] = useState(false);
  const [buildSticky, setBuildSticky] = useState(false);

  return (
    <div className="mainPage">
      <Navigation
        mainPage={true}
        navSticky={navSticky}
        buildSticky={buildSticky}
      />
      <div className="headerBody">
        <div className="heroText">Welcome to Magenta</div>
        <p className="taglineText">A Magic: the Gathering Deckbuilder</p>
        <div className="headerButtonsContainer">
          <ScrollTrigger
            onEnter={() => {
              setNavSticky(false);
              setBuildSticky(false);
            }}
            onExit={() => {
              setNavSticky(true);
              setBuildSticky(true);
            }}
          >
            <Link to="/builder">
              <button className="headerButton builderEnter mainBuilderEnter">
                Deck Builder
              </button>
            </Link>
          </ScrollTrigger>
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
          <ScrollTrigger
            onEnter={() => setBuildSticky(false)}
            onExit={() => setBuildSticky(true)}
          >
            <Link to="/builder" className="salesPitchButton">
              <button className="headerButton builderEnter mainBuilderEnter">
                Deck Builder
              </button>
            </Link>
          </ScrollTrigger>
        </div>
      </div>
    </div>
  );
};
export default MainPage;
