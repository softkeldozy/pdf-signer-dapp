import { useState } from "react";
import { ethers } from "ethers";
import PdfVerifier from "../contracts/PdfVerifier.json";
import { SignProtocolClient } from "@ethsign/sp-sdk";

export const useSignProtocol = () => {
  const [contract, setContract] = useState(null);

  // Initialize contract connection
  const initializeContract = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const deployedContract = new ethers.Contract(
      PdfVerifier.address,
      PdfVerifier.abi,
      signer
    );
    setContract(deployedContract);
  };

  // Sign PDF with Sign Protocol
  const signPdf = async (pdfFile, signer) => {
    const sp = new SignProtocolClient("ethereum");
    const pdfHex = await fileToHex(pdfFile);

    const attestation = await sp.issueAttestation(signer, {
      schemaId: "PDF_SIGN_SCHEMA",
      data: {
        pdfHash: pdfHex,
        signer: await signer.getAddress(),
        timestamp: Math.floor(Date.now() / 1000),
      },
    });
    return attestation;
  };

  // Verify PDF on-chain
  const verifyPdf = async (signature, pdfHash) => {
    if (!contract) throw new Error("Contract not initialized");
    return await contract.verifyPdf(signature, pdfHash);
  };

  // Helper: Convert PDF to hex
  const fileToHex = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const hex = Array.from(new Uint8Array(e.target.result))
          .map((b) => b.toString(16).padStart(2, "0"))
          .join("");
        resolve(`0x${hex}`);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  return { initializeContract, signPdf, verifyPdf };
};
