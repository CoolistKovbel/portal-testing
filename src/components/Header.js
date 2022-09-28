import React from "react";
import logo from "../img/portal-logo.png";

function Header({ currentAccount, connectWallet }) {
  return (
    <header className="mainHeader">
      <div className="logo-container">
        <img src={logo} alt="portal logo" />
      </div>

      <nav>
        <a>Home</a>
        <a>About</a>
      </nav>

      <div className="user-account">
        {currentAccount ? (
          <p>User Account: {currentAccount.substr(0, 8)}</p>
        ) : (
          <button onClick={connectWallet} className="test-button">
            Connect Account
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
