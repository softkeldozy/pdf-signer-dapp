const { ethers } = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  // Sign Protocol Testnet Address (sepolia)
  const SIGN_PROTOCOL_ADDRESS = "0xb3F3A880ae1564B7763cB83F48f7703904B59ba1"; // Replace with actual testnet address

  // Deployer will be the default trusted attester
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  // Deploy contract
  const PdfVerifier = await ethers.getContractFactory("PdfVerifier");
  const verifier = await PdfVerifier.deploy(
    SIGN_PROTOCOL_ADDRESS,
    deployer.address // Trusted attester = deployer
  );

  console.log("Deployed to:", verifier.address);

  // Save address and ABI to frontend
  const frontendPath = path.join(__dirname, "../frontend/src/contracts");
  if (!fs.existsSync(frontendPath)) {
    fs.mkdirSync(frontendPath);
  }

  fs.writeFileSync(
    path.join(frontendPath, "PdfVerifier.json"),
    JSON.stringify(
      {
        address: verifier.address,
        abi: JSON.parse(verifier.interface.formatJson()),
      },
      null,
      2
    )
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
