// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Certification {
    struct Certificate {
        address owner;
        string certificateHash;
        bool isRevoked;
    }

    mapping(address => Certificate) public certificates;

    event CertificateIssued(address indexed owner, string certificateHash);
    event CertificateRevoked(address indexed owner);

    function issueCertificate(string memory _certificateHash) public {
        require(certificates[msg.sender].owner == address(0), "Certificate already issued.");
        
        certificates[msg.sender] = Certificate(msg.sender, _certificateHash, false);
        emit CertificateIssued(msg.sender, _certificateHash);
    }

    function verifyCertificate(address _owner) public view returns (string memory) {
        require(certificates[_owner].owner != address(0), "Certificate not found.");
        require(!certificates[_owner].isRevoked, "Certificate is revoked.");
        return certificates[_owner].certificateHash;
    }

    function revokeCertificate(address _owner) public {
        require(certificates[_owner].owner == msg.sender, "You don't have permission to revoke.");
        certificates[_owner].isRevoked = true;
        emit CertificateRevoked(_owner);
    }
}