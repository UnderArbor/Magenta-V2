import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import DeckSlotContainer from "./DeckSlot/DeckSlotContainer";

const DeckScrollList = ({ user, deckId, isAuthenticated }) => {
  return (
    <div className="deckScrollList">
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
        <div className="blockedDeckList">
          <p className="blockedDeckText">Must have an account to save decks</p>
        </div>
      )}
    </div>
  );
};

DeckScrollList.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.object,
  deckId: PropTypes.string,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  deckId: state.deck.deckId,
});

export default connect(mapStateToProps)(DeckScrollList);
