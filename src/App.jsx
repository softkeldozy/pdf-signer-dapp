import { useState, useEffect } from "react";
import { ethers } from "ethers";
import "./App.css";
import PdfUploader from "./components/PdfUploader";
import SignatureStatus from "./components/SignatureStatus";
import WalletConnector from "./components/WalletConnector";
import { useSignProtocol } from "./hooks/useSignProtocol";

function App() {
  const [pdfData, setPdfData] = useState(null);
  const [signature, setSignature] = useState("");
  const [txHash, setTxHash] = useState("");
  const [account, setAccount] = useState("");
  const { initializeContract, signPdf, verifyPdf } = useSignProtocol();

  // Initialize contract when account changes
  useEffect(() => {
    if (account) initializeContract();
  }, [account, initializeContract]);

  // Handle PDF processing completion
  const handleFileProcessed = (fileData) => {
    setPdfData(fileData); // { rawFile, hexData, previewUrl }
    console.log("PDF ready for signing:", fileData);
  };

  // Handle signing and verification
  const handleSignAndVerify = async () => {
    if (!pdfData || !account) return;

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // 1. Sign with Sign Protocol
      const attestation = await signPdf(pdfData.hexData, signer);
      setSignature(attestation.signature);

      // 2. Verify on-chain
      const tx = await verifyPdf(attestation.signature, pdfData.hexData);
      setTxHash(tx.hash);
    } catch (error) {
      console.error("Signing failed:", error);
      alert(`Signing error: ${error.message}`);
    }
  };

  return (
    <div className="app">
      <WalletConnector onConnect={setAccount} />
      <h1>PDF Signer with Sign Protocol</h1>
      {/* PDF Upload Section */}
      <PdfUploader
        onFileProcessed={handleFileProcessed}
        onError={(message) => alert(message)}
      />
      {/* Action Button */}
      {pdfData && (
        <button onClick={handleSignAndVerify} disabled={!account}>
          {account ? "Sign & Verify" : "Connect Wallet First"}
        </button>
      )}
      return (
      <div className="app">
        {/* ... other components for later ad ons... */}

        {/* Status of Signature Transaction Hash */}
        {/* <SignatureStatus signature={signature} txHash={txHash} /> */}

        {pdfData?.previewUrl && (
          <div className="pdf-preview-container">{/* ... */}</div>
        )}
      </div>
      );
      {/* Status Display */}
      <SignatureStatus signature={signature} txHash={txHash} />
      {/* Optional PDF Preview */}
      {pdfData?.previewUrl && (
        <div className="pdf-preview-container">
          <h3>Document Preview</h3>
          <iframe
            src={pdfData.previewUrl}
            title="PDF Preview"
            width="100%"
            height="500px"
          />
        </div>
      )}
    </div>
  );
}

export default App;
