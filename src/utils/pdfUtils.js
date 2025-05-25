/**
 * PDF Utilities for Sign Protocol dApp
 * Handles file conversion, hashing, and validation
 */

// 1. Convert PDF to Hex (for on-chain storage)
export const pdfToHex = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const hexString = Array.from(new Uint8Array(e.target.result))
          .map((byte) => byte.toString(16).padStart(2, "0"))
          .join("");
        resolve(`0x${hexString}`);
      } catch (error) {
        reject(new Error("PDF to hex conversion failed"));
      }
    };
    reader.onerror = () => reject(new Error("File reading failed"));
    reader.readAsArrayBuffer(file);
  });
};

// 2. Generate SHA-256 hash (for integrity checks)
export const generatePdfHash = async (file) => {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
};

// 3. Validate PDF file (size + type)
export const validatePdf = (file, options = {}) => {
  const { maxSizeMB = 10, allowedTypes = ["application/pdf"] } = options;

  if (!allowedTypes.includes(file.type)) {
    throw new Error("Invalid file type. Only PDFs are accepted");
  }

  if (file.size > maxSizeMB * 1024 * 1024) {
    throw new Error(`File too large. Max size: ${maxSizeMB}MB`);
  }

  return true;
};

// 4. Extract PDF metadata (optional)
export const extractPdfMetadata = (file) => {
  return {
    name: file.name,
    size: file.size,
    lastModified: file.lastModified,
    type: file.type,
  };
};

// 5. PDF to Base64 (for previews)
export const pdfToBase64 = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
};
