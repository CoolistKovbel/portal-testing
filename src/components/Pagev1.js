import React from "react";

import heroImg from "../img/btc-hero-img.png";

function Pagev1() {
  return (
    <section className="account-not-connected">
      <div className="hero">
        <div className="hero-content">
          <h2>Welcome to de Portal</h2>
          <p>
            In order to access the site you must connect your wallet, you must
            use metamask make sure you have installed it
          </p>
          <p>
            If not be sure to download it{" "}
            <a href="https://metamask.io/download/" target="_blank">
              here
            </a>
          </p>
        </div>
        <div className="hero-image-container">
          <img src={heroImg} alt="btc world" />
        </div>
      </div>
      <div className="features">
        <div className="single-feature">
          <div className="single-feature-content">
            <i>👋</i>
            <h3>Send Wave</h3>
            <p>You will be able to send a wave</p>
          </div>
        </div>
        <div className="single-feature">
          <i>🏆</i>
          <h3>Chance to win</h3>
          <p>You will be able to make back some eth with each wave</p>
        </div>
        <div className="single-feature">
          <i>🤯</i>
          <h3>Experience web 3</h3>
          <p>Will be able to Experience eth on testnet</p>
        </div>
      </div>
    </section>
  );
}

export default Pagev1;
