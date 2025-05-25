// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ISignProtocol {
    function verifyAttestation(
        address attester,
        bytes32 dataHash,
        bytes calldata signature
    ) external view returns (bool);
}

contract PdfVerifier {
    ISignProtocol public signProtocol;
    address public trustedAttester;

    constructor(address _signProtocol, address _trustedAttester) {
        signProtocol = ISignProtocol(_signProtocol);
        trustedAttester = _trustedAttester;
    }

    function verifyPdf(bytes calldata signature, bytes calldata pdfHash) external {
        require(
            signProtocol.verifyAttestation(
                trustedAttester,
                keccak256(abi.encodePacked(pdfHash)),
                signature
            ),
            "Invalid PDF signature"
        );
        emit PdfVerified(msg.sender, pdfHash);
    }

    event PdfVerified(address indexed verifier, bytes pdfHash);
}