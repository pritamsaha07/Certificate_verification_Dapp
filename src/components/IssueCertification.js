import React from 'react';
import Web3 from 'web3';

function IssueCertification({ state, hash }) {
  const Issue = async () => {
    try {
      const { contract } = state;
      console.log(hash);

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const fromAccount = accounts[0];
      
      const options = {
        from: fromAccount,
        gas: 5000000,
      };

      contract.methods.issueCertificate(hash).send(options, (error, transactionHash) => {
        if (error) {
          console.error(error);
        } else {
          console.log("Transaction is sent with hash: ", transactionHash);
         
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h2>Issue Certification</h2>
      <button onClick={Issue}>Issue Certificate</button>
    </div>
  );
}

export default IssueCertification;
