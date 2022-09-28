import React, { useState } from "react";
import { ethers } from "ethers";

function Pagev2({
  contractAddress,
  abi,
  currentContractWaves,
  setContractCurrentWaves,
}) {
  const [loadingHash, setLoadingHash] = useState(true);

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

  return (
    <section className="pagev2">
      <header>
        <h3>
          Total Number Of Waves: <span>{currentContractWaves}</span>
        </h3>
        <h3>
          Your current Waves: <span>111</span>
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
      </div>
    </section>
  );
}

export default Pagev2;
