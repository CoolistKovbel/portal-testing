import React, { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [currentAccount, setCurrentAccount] = useState("");

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("make Sure you have metamask");
      } else {
        console.log("there is an ethereum object", window);
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an account: ", account);
        setCurrentAccount(account);
      } else {
        console.log("No account found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Download metamask HOE");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected: ", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const wave = () => {};

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <div className="app">
      <header className="mainHeader">
        <h2>Portal</h2>
        {currentAccount ? (
          <p>User Account: {currentAccount}</p>
        ) : (
          <button onClick={connectWallet} className="test-button">
            Connect Account
          </button>
        )}
      </header>
      <div className="test">
        <p>This is basically a small test to be able to send a wave</p>
        <button onClick={wave} className="test-button">
          Wave
        </button>
      </div>
    </div>
  );
}
