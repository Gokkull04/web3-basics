import { ethers } from 'ethers';
import abi from "./abi/abi.json"; // Make sure the path is correct

const CONTRACT_ADDRESS = "0xd887477308537d0644E8bD6B247524c502cEA9d6"; 

const connectContract = async () => {
  if (typeof window.ethereum !== 'undefined') {
    await window.ethereum.request({ method: 'eth_requestAccounts' }); // Request wallet connection
    const provider = new ethers.BrowserProvider(window.ethereum); // Create a provider
    const signer = provider.getSigner(); // Get the signer (account)
    return new ethers.Contract(CONTRACT_ADDRESS, abi, signer); // Connect the contract with the signer
  } else {
    console.error("Ethereum wallet not detected");
    throw new Error("No Ethereum wallet detected");
  }
};

export const BUYMOMO = async (formData) => {
  try {
    const contract = await connectContract();
    if (contract) {
      const tx = await contract.storeData(
        formData.name,
        formData.message,
        ethers.parseEther(formData.amount) // Ensure the amount is in Ether
      );
      await tx.wait(); // Wait for the transaction to be mined
      console.log("Transaction successful!");
    }
  } catch (error) {
    console.error("Error buying momo:", error);
  }
};

export const GETMEMO = async () => {
  try {
    const contract = await connectContract();
    if (contract) {
      const data = await contract.retrieveAllData();
      return data;
    }
  } catch (error) {
    console.error("Error fetching memo:", error);
  }
};
