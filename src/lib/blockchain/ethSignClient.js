// src/lib/blockchain/ethSignClient.js
import { SignProtocolClient } from "@ethsign/sp-sdk";

// Configuration object
const sdkConfig = {
  network: process.env.REACT_APP_NETWORK || "testnet",
  rpcUrl: process.env.REACT_APP_RPC_URL,
  // Add other SDK config options here
};

let spClientInstance;

export const getEthSignClient = () => {
  if (!spClientInstance) {
    spClientInstance = new SignProtocolClient(sdkConfig);

    // Optional: Verify connection
    console.debug("EthSign SDK initialized:", spClientInstance);
  }
  return spClientInstance;
};
