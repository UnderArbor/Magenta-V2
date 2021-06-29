import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Navigation from "../../../General/Navigation";
import DeckSlotContainer from "./DeckSlotContainer";

const DeckListPage = ({ user, isAuthenticated, deckId }) => {
  const title = user !== null ? `${user.userName}'s Decks` : "Your Decks";

  return (
    <div className="deckListPage">
      <Navigation mainPage={false} />
      <div className="deckListUser">{title}</div>
      <div className="deckInventory">
        {user && isAuthenticated ? (
          user.decks.map((deck) => {
            return (
              <DeckSlotContainer
                deckId={deck._id}
                key={deck._id}
                globalDeckId={deckId}
                user={user}
              />
            );
          })
        ) : (
          <div className="blockedDeckList deckPageBlock">
            <p className="blockedDeckText">
              Must have an account to save decks
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

DeckListPage.propTypes = {
  user: PropTypes.object,
  isAuthenticated: PropTypes.bool.isRequired,
  deckId: PropTypes.string,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
  deckId: state.deck.deckId,
});

export default connect(mapStateToProps)(DeckListPage);
