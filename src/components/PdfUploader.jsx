import { useState } from "react";
import {
  pdfToHex,
  validatePdf,
  extractPdfMetadata,
  pdfToBase64,
} from "../utils/pdfUtils";

const PdfUploader = ({ onFileProcessed, onError }) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setIsProcessing(true);

      // 1. Validate PDF
      validatePdf(file, {
        maxSizeMB: 5,
        allowedTypes: ["application/pdf"],
      });

      // 2. Extract metadata (optional)
      const metadata = extractPdfMetadata(file);
      console.log("PDF Metadata:", metadata);

      // 3. Create preview (optional)
      const preview = await pdfToBase64(file);
      setPreviewUrl(preview);

      // 4. Convert to hex for blockchain
      const pdfHex = await pdfToHex(file);

      // 5. Pass to parent component
      onFileProcessed({
        rawFile: file,
        hexData: pdfHex,
        previewUrl: preview,
      });
    } catch (error) {
      console.error("PDF Processing Error:", error);
      onError(error.message);
      resetUploader();
    } finally {
      setIsProcessing(false);
    }
  };

  const resetUploader = () => {
    setPreviewUrl(null);
    // Clear file input
    const input = document.querySelector('input[type="file"]');
    if (input) input.value = "";
  };

  return (
    <div className="pdf-uploader">
      <label>
        {isProcessing ? "Processing PDF..." : "Upload PDF Document"}
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          disabled={isProcessing}
        />
      </label>

      {previewUrl && (
        <div className="pdf-preview">
          <iframe
            src={previewUrl}
            title="PDF Preview"
            width="100%"
            height="400px"
          />
          <p>Ready for signing</p>
        </div>
      )}
    </div>
  );
};

export default PdfUploader;
