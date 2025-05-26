import { useState } from "react";
import { useSign } from "../features/attestations/hooks/useSign";
import ErrorBoundary from "./ErrorBoundary";
import EnhancedError from "../lib/EnhancedError"; // Make sure to import

function SignButton({ documentHash, signerAddress }) {
  const { signAttestation } = useSign();
  const [isSigning, setIsSigning] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleClick = async () => {
    if (isSigning) return;

    setIsSigning(true);
    setIsSuccess(false);

    try {
      // Actual payload for EthSign SDK
      const attestation = await signAttestation({
        schemaId: "YOUR_SCHEMA_ID", // Required
        data: {
          documentHash, // From props
          signer: signerAddress, // From props
        },
        // Optional:
        indexingValue: signerAddress, // For querying later
        revocable: true, // If needed
      });

      setIsSuccess(true);
      console.log("Attestation created:", attestation);

      // Optional: Trigger next step
      // onSubmitSuccess(attestation);
    } catch (error) {
      if (error instanceof EnhancedError) {
        alert(error.toUserMessage());
        console.error("Attestation failed:", error.toJSON());
      } else {
        console.error("Unknown error:", error);
        alert("Unexpected error occurred");
      }
    } finally {
      setIsSigning(false);
    }
  };

  return (
    <ErrorBoundary>
      <button
        onClick={handleClick}
        disabled={isSigning}
        className={isSuccess ? "success" : ""}
      >
        {isSigning ? "Signing..." : "Sign Document"}
        {isSuccess && " ✓"}
      </button>
    </ErrorBoundary>
  );
}
export default SignButton; // Add this line
