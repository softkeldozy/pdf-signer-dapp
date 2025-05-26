import { ethers } from "ethers";

// Singleton provider instance
let provider;

export const getEthersProvider = () => {
  if (!provider) {
    provider = new ethers.BrowserProvider(window.ethereum);
  }
  return provider;
};

export const getEthersSigner = async () => {
  return await getEthersProvider().getSigner();
};
