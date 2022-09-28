import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Pagev1 from "./components/Pagev1";
import Pagev2 from "./components/Pagev2";
import abi from "./utils/WavePortal.json";

export default function App() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [currentContractWaves, setContractCurrentWaves] = useState("");
  const [currentUserWaves, setCurrentUserWaves] = useState("");
  const [allMessages, setAllMessages] = useState([]);

  const contractAddress = "0x3d95Bd39FA08d31C98e1aBC728C3d17b2fd0B45A";

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
        await getAllMessages();
        const userWave = await getUserWaves(account);
        setCurrentUserWaves(userWave);
      } else {
        console.log("No account found");
      }

      const totalWave = await getContractTotalWaves();
      setContractCurrentWaves(totalWave);
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

      const totalWave = await getContractTotalWaves();
      setContractCurrentWaves(totalWave);

      const userWave = await getUserWaves(accounts[0]);
      setCurrentUserWaves(userWave);
    } catch (error) {
      console.log(error);
    }
  };

  const getContractTotalWaves = async () => {
    try {
      const { ethereum } = window;

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const wavePortalContract = new ethers.Contract(
        contractAddress,
        abi.abi,
        signer
      );

      let count = await wavePortalContract.getTotalWaves();
      return count.toNumber();
    } catch (error) {
      console.log(error);
    }
  };

  const getUserWaves = async (userAccount) => {
    try {
      const { ethereum } = window;

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const wavePortalContract = new ethers.Contract(
        contractAddress,
        abi.abi,
        signer
      );

      let count = await wavePortalContract.getNumberOfWavesOfUser(userAccount);
      return count.toNumber();
    } catch (error) {
      console.log(error);
    }
  };

  const getAllMessages = async () => {
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

        const messages = await wavePortalContract.getAllMessages();
        console.log(messages);
        let messagesCleaned = [];
        messages.forEach((message) => {
          messagesCleaned.push({
            address: message.user,
            timestamp: new Date(message.timestamp * 1000),
            message: message.message,
          });
        });

        setAllMessages(messagesCleaned);
      } else {
        console.log("Eth obj doesnt exist");
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
      {currentAccount ? (
        <Pagev2
          contractAddress={contractAddress}
          abi={abi}
          currentContractWaves={currentContractWaves}
          setContractCurrentWaves={setContractCurrentWaves}
          currentUserWaves={currentUserWaves}
          allMessages={allMessages}
        />
      ) : (
        <Pagev1 />
      )}
    </div>
  );
}
