// src/services/sdkService.js
import { getEthSignClient } from "../lib/blockchain/ethSignClient";

export const createAttestation = async (data) => {
  const client = getEthSignClient();
  return client.issueAttestation({
    schemaId: process.env.REACT_APP_SCHEMA_ID,
    data,
    indexingValue: data.signerAddress,
    revocable: true,
  });
};
