import React, { useEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import "./css/core.scss";
import "./css/mana.scss";
import "./css/modal.scss";
import "./css/advancedsearch.scss";
import "./css/deckBanner.scss";
import "./css/deckTools.scss";

import BuilderPage from "./components/Builder/BuilderPage";
import DeckListPage from "./components/Builder/Deck/DeckSlot/DeckListPage";
import Footer from "./components/General/Footer";
import MainPage from "./components/General/MainPage";
import BuilderError from "./components/Builder/BuilderError";

import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/functions/setAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  const location = useLocation();
  const { pathname } = useLocation();

  useEffect(() => {
    store.dispatch(loadUser(false));
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Provider store={store}>
      <Switch location={location} key={location.key}>
        <Route path="/builder" component={BuilderPage} />
        <Route path="/decks" component={DeckListPage} />
        <Route path="/error" component={BuilderError} />
        <Route path="/" component={MainPage} />
      </Switch>
      <Footer />
    </Provider>
  );
};

export default App;
