import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { toggleDeckList, uploadPacket } from "../../actions/deck";
import { useHistory } from "react-router-dom";
import NewDeckZone from "./NewDeckZone";
import ImportDeckZone from "./ImportDeckZone";

const NewDeckContainer = ({ user, uploadPacket, toggleDeckList }) => {
  let history = useHistory();
  const [deckInfo, setDeckInfo] = useState({
    deckName: "",
    deckFormat: "Brew",
    deckCommander: "",
  });

  const [openFormat, setOpenFormat] = useState(false);

  const { deckName, deckFormat, deckCommander } = deckInfo;

  useEffect(() => {
    if (user !== null) {
      toggleDeckList(true);
    } else {
      toggleDeckList(false);
    }
  }, []);

  const createDeck = async () => {
    if (user) {
      const body = JSON.stringify({ user, deckName, deckFormat });
      await axios.post("/api/deck/init", body).then((res) => {
        history.push(`/builder/${res.data._id}`);
      });
    } else {
      history.push({
        pathname: "/builder/NewDeck",
        state: { name: deckName, format: deckFormat },
      });
    }
  };

  const queryChange = (e, field) => {
    if (field === "name") {
      setDeckInfo({ ...deckInfo, deckName: e.target.value });
    } else if (field === "format") {
      setDeckInfo({ ...deckInfo, deckFormat: e.target.value });
    } else {
      setDeckInfo({ ...deckInfo, deckCommander: e.target.value });
    }
  };

  return (
    <div className="newDeckContainer">
      <p className="createDeckTitle">Create a Deck</p>
      <div className="createDeckOptions">
        <NewDeckZone
          createDeck={createDeck}
          queryChange={queryChange}
          currentFormat={deckFormat}
          openFormat={openFormat}
          setOpenFormat={setOpenFormat}
          setDeckInfo={setDeckInfo}
        />
        <p className="biglyOR">OR</p>
        <ImportDeckZone createDeck={createDeck} uploadPacket={uploadPacket} />
        <p className="sillyMessage">Load a deck, you silly</p>
      </div>
    </div>
  );
};

NewDeckContainer.propTypes = {
  user: PropTypes.object,
  uploadPacket: PropTypes.func.isRequired,
  toggleDeckList: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { uploadPacket, toggleDeckList })(
  NewDeckContainer
);
