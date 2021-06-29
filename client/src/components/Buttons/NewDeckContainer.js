import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { toggleDeckList, uploadPacket } from "../../actions/deck";
import { useHistory } from "react-router-dom";
import NewDeckZone from "./NewDeckZone";
import ImportDeckZone from "./ImportDeckZone";

import commanders from "../../utils/json/commanders.json";
import getCardInfo from "../../utils/functions/getCardInfo";

const NewDeckContainer = ({ user, uploadPacket, toggleDeckList }) => {
  let history = useHistory();
  const [deckInfo, setDeckInfo] = useState({
    deckName: "New Deck",
    deckFormat: "Brew",
    deckCommander: "",
  });
  const [showCommanders, setShowCommanders] = useState(false);

  const [openFormat, setOpenFormat] = useState(false);

  const [commanderList, setCommanderList] = useState(commanders);

  const commanderRef = useRef(null);

  const { deckName, deckFormat, deckCommander } = deckInfo;

  useEffect(async () => {
    if (user !== null) {
      toggleDeckList(true);
    } else {
      toggleDeckList(false);
    }

    function handleClickOutside(event) {
      if (
        commanderRef.current &&
        !commanderRef.current.contains(event.target)
      ) {
        setShowCommanders(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(async () => {
    if (deckFormat !== "Brawl" && deckFormat !== "Commander/EDH") {
      setDeckInfo({ ...deckInfo, deckCommander: "" });
    }
  }, [deckFormat]);

  useEffect(() => {
    let newCommanderList = commanders.filter((commander) => {
      const modifiedCommander = commander.name.toLowerCase();
      return modifiedCommander.startsWith(deckCommander.toLowerCase());
    });
    setCommanderList(newCommanderList);
  }, [deckCommander]);

  const createDeck = async () => {
    if (user) {
      let body = JSON.stringify({ user, deckName, deckFormat });
      await axios.post("/api/deck/init", body).then(async (res) => {
        const deckId = res.data._id;
        const cards =
          deckCommander !== "" ? [await getCardInfo(deckCommander)] : [];
        if (cards.length > 0) {
          cards[0].mainType = "Commander";
          cards[0].mainCMC = -1;
          cards[0].mainTag = "Commander";
        }
        const boards = [
          { name: "Mainboard", cards: cards },
          { name: "Sideboard", cards: [] },
          { name: "Maybepile", cards: [] },
        ];

        body = { boards };
        await axios.put(`/api/deck/boardChange/${deckId}`, body).then((res) => {
          history.push(`/builder/${deckId}`);
        });
      });
    } else {
      history.push({
        pathname: "/builder/NewDeck",
        state: { name: deckName, format: deckFormat, commander: deckCommander },
      });
    }
  };

  const queryChange = (value, field) => {
    if (field === "name") {
      setDeckInfo({ ...deckInfo, deckName: value });
    } else if (field === "format") {
      setDeckInfo({ ...deckInfo, deckFormat: value });
    } else if (field === "commander") {
      setDeckInfo({ ...deckInfo, deckCommander: value });
    }
  };

  return (
    <div className="newDeckContainer">
      <div className="createDeckOptions">
        <NewDeckZone
          createDeck={createDeck}
          queryChange={queryChange}
          currentFormat={deckFormat}
          openFormat={openFormat}
          setOpenFormat={setOpenFormat}
          deckCommander={deckCommander}
          setDeckInfo={setDeckInfo}
          showCommanders={showCommanders}
          setShowCommanders={setShowCommanders}
          commanderList={commanderList}
          commanderRef={commanderRef}
          showCommander={
            deckFormat === "Commander/EDH" || deckFormat === "Brawl"
          }
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
