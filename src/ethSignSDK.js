import { SignProtocol } from "@ethsign/sp-sdk";
import { viemClient } from "./lib/viemClient";

let spClient;

export const getEthSignClient = () => {
  if (!spClient) {
    spClient = new SignProtocol({
      network: "testnet",
      rpcUrl: process.env.REACT_APP_RPC_URL,
      client: viemClient, // Pass the Viem client explicitly
    });
  }
  return spClient;
};
