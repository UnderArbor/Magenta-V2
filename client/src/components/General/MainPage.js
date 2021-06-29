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
              <button className="headerButton builderEnter">
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
    </div>
  );
};
export default MainPage;
