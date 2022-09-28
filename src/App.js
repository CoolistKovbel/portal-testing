import * as React from "react";
import { ethers } from "ethers";
import "./App.css";

export default function App() {
  const wave = () => {};

  return (
    <div className="app">
      <header className="mainHeader">
        <h2>Portal</h2>
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
