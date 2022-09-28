import React, { useState } from "react";
import { ethers } from "ethers";

function Pagev2({
  contractAddress,
  abi,
  currentContractWaves,
  setContractCurrentWaves,
  currentUserWaves,
  allMessages,
}) {
  const [loadingHash, setLoadingHash] = useState(true);
  const [message, setMessage] = useState("");

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

        setLoadingHash(false);
        await waveTxn.wait();
        console.log("mining...", waveTxn.hash);
        setLoadingHash(true);

        count = await wavePortalContract.getTotalWaves();
        setContractCurrentWaves(count.toNumber());
      } else {
        console.log("Ethereum object doesnt exist");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async (_message) => {
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

        let messageTxn = await wavePortalContract.message(_message);
        console.log("mining message txn", messageTxn.hash);
        await messageTxn.wait();
      }
    } catch (error) {}
  };

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    sendMessage(message);
    setMessage("");
  };

  return (
    <section className="pagev2">
      <header>
        <h3>
          Total Number Of Waves: <span>{currentContractWaves}</span>
        </h3>
        <h3>
          Your current Waves: <span>{currentUserWaves}</span>
        </h3>
      </header>
      <div className="test">
        <div className="wave-test">
          <p>Send a wave for a chance to win some ehtereum back</p>
          <button onClick={wave} className="test-button">
            Wave
          </button>
          {!loadingHash ? <p>status: loading</p> : <p>status: idle</p>}
        </div>
        <div className="message-test">
          <form onSubmit={onSubmit}>
            <label>Message</label>
            <input type="text" onChange={onChange} value={message} />
            <button className="test-button">send message</button>
          </form>
        </div>
      </div>
      <table className="message-table">
        <thead>
          <tr>
            <th>Address</th>
            <th>Time</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {allMessages.map((message, index) => {
            return (
              <tr key={index}>
                <td>{message.address}</td>
                <td>{message.timestamp.toString()}</td>
                <td>{message.message}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}

export default Pagev2;
