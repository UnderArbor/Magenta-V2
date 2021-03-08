import React from "react";
import HomeLogo from "./HomeLogo";

import Patreon from "../../utils/icons/patreon.svg";

const Footer = () => {
  return (
    <div className="footerContainer">
      <div className="footerInfo">
        <div className="footerCategory">
          <div className="footerLabel">Account</div>
          <div className="footerItem notAllowed">Login</div>
          <div className="footerItem notAllowed">Register</div>
          <div className="footerItem notAllowed">Settings</div>
        </div>

        <div className="footerCategory">
          <div className="footerLabel">Features</div>
          <div className="footerItem notAllowed">Deck Builder</div>
          <div className="footerItem notAllowed">Deck List</div>
          <div className="footerItem notAllowed">Search</div>
        </div>
        <div className="footerCategory" style={{ marginLeft: "120px" }}>
          <div className="footerLabel">Trademark</div>
        </div>
        <div className="footerCategory">
          <div className="footerLabel">Support</div>
          <img className="patreonImage notAllowed" src={Patreon} />
        </div>
      </div>
      <HomeLogo position={false} />
    </div>
  );
};

export default Footer;
