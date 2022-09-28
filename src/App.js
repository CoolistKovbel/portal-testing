import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Pagev1 from "./components/Pagev1";
import Pagev2 from "./components/Pagev2";
import abi from "./utils/WavePortal.json";

export default function App() {
  const [currentAccount, setCurrentAccount] = useState("");

  const contractAddress = "0xD2ef1123CA4008BFa9995052CAB5f950C42c9082";

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

  const wave = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(
          contractAddress,
          abi.abi,
          signer
        );

        let count = await wavePortalContract.getTotalWaves();
        console.log("Retrieve total wave count...", count.toNumber());

        const waveTxn = await wavePortalContract.wave();

        await waveTxn.wait();
        console.log("mining...", waveTxn.hash);

        count = await wavePortalContract.getTotalWaves();
        console.log("Total waved: ", count.toNumber());
      } else {
        console.log("Ethereum object doesnt exist");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <div className="app">
      <Header currentAccount={currentAccount} connectWallet={connectWallet} />
      {currentAccount ? <Pagev2 /> : <Pagev1 />}
    </div>
  );
}

{
  /* <header className="mainHeader">
<h2>Portal</h2>

</header>
<div className="test">
<p>This is basically a small test to be able to send a wave</p>
<button onClick={wave} className="test-button">
  Wave
</button>
</div> */
}
