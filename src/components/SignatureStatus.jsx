import { useEffect, useState } from "react";
import { ethers } from "ethers";

const SignatureStatus = ({ signature, txHash }) => {
  const [txReceipt, setTxReceipt] = useState(null);

  // Check transaction confirmation
  useEffect(() => {
    if (!txHash) return;

    const checkConfirmation = async () => {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const receipt = await provider.getTransactionReceipt(txHash);
      setTxReceipt(receipt);
    };

    checkConfirmation();
  }, [txHash]);

  return (
    <div className="signature-status">
      {signature && (
        <div className="status-card">
          <h3>Signature Status</h3>
          <p>
            <strong>Signature:</strong>
            <span className="monospace">
              {signature.slice(0, 12)}...{signature.slice(-6)}
            </span>
          </p>

          {txHash ? (
            <p>
              <strong>Transaction:</strong>
              <a
                href={`https://etherscan.io/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {txHash.slice(0, 10)}...{txHash.slice(-6)}
              </a>
              {txReceipt ? (
                <span
                  className={`status-badge ${
                    txReceipt.status ? "success" : "failed"
                  }`}
                >
                  {txReceipt.status ? "✓ Confirmed" : "✗ Failed"}
                </span>
              ) : (
                <span className="status-badge pending">⏳ Pending</span>
              )}
            </p>
          ) : (
            <p>Waiting for blockchain confirmation...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SignatureStatus;
