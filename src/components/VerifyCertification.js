import React, { useState } from 'react';

function VerifyCertification({ state }) {
  const [address, setAddress] = useState('');
  const [ipfsHash, setIpfsHash] = useState('');

  const verify = async () => {
    try {
      const { contract, web3 } = state;

      const accounts = await web3.eth.getAccounts();
      if (accounts.length === 0) {
        console.error("No Ethereum accounts found. Please check your MetaMask connection.");
        return;
      }

      const account = accounts[0];
      
      // Assuming your contract's `verifyCertificate` function returns the IPFS hash
      const tx = await contract.methods.verifyCertificate(address).call({ from: account });

      setIpfsHash(tx);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h2>Verify Certification</h2>
      <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button onClick={verify}>Verify Certificate</button>
      {ipfsHash && (
        <div>
          <h1>IPFS Hash: {ipfsHash}</h1>
          <img
            src={`https://ipfs.io/ipfs/${ipfsHash}`}
            alt="Certificate"
            style={{ maxWidth: '300px', maxHeight: '300px' }}
          />
        </div>
      )}
    </div>
  );
}

export default VerifyCertification;
