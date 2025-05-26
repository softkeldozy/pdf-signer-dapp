// src/features/attestations/hooks/useAttestation.js
import { getEthSignClient } from "../../lib/blockchain/ethSignClient";

export function useAttestation() {
  const signDocument = async (documentHash, signerAddress) => {
    try {
      const client = getEthSignClient();
      return await client.issueAttestation({
        schemaId: "YOUR_SCHEMA_ID",
        data: { documentHash, signer: signerAddress },
      });
    } catch (error) {
      console.error("Attestation failed:", error);
      throw new Error("Signing failed");
    }
  };

  return { signDocument };
}
