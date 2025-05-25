import { useState } from "react";

const WalletConnector = ({ onConnect }) => {
  const [isConnected, setIsConnected] = useState(false);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        onConnect(accounts[0]);
        setIsConnected(true);
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  return (
    <div className="wallet-connector">
      {isConnected ? (
        <span>Connected</span>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
};

export default WalletConnector;
