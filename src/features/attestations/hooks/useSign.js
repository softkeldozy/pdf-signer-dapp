import { safeSdkCall } from "../../services/blockchain";
import { spClient } from "../../../lib/ethSignSDK";

export function useSign() {
  const signAttestation = async (payload) => {
    return safeSdkCall(() => spClient.issueAttestation(payload), {
      operationName: "issueAttestation",
      contractVersion: "1.2.0",
    });
  };

  return { signAttestation };
}
