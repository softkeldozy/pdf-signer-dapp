import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";

// Configure only what EthSign SDK needs
export const viemClient = createPublicClient({
  chain: mainnet,
  transport: http(process.env.REACT_APP_RPC_URL),
});

// Minimal viem exports
export { createWalletClient } from "viem";
