import React, { useEffect, useState } from "react";
import axios from "axios";

import DeckSlot from "./DeckSlot";

const DeckSlotContainer = ({ deckId, globalDeckId, user }) => {
  const [deckInfo, setDeckInfo] = useState({
    name: "",
    picture: "",
    id: deckId,
  });

  useEffect(async () => {
    try {
      await axios.get(`api/deck/${deckId}`).then((res) => {
        setDeckInfo({
          ...deckInfo,
          name: res.data.name,
          picture: res.data.picture,
        });
      });
    } catch (error) {
      console.log(error);
    }
  }, [user]);

  return <DeckSlot deckInfo={deckInfo} globalDeckId={globalDeckId} />;
};

export default DeckSlotContainer;
