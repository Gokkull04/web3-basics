import { ethers } from 'ethers';
import abi from "./abi/abi.json"; // Ensure this path is correct

const CONTRACT_ADDRESS = "0xd887477308537d0644E8bD6B247524c502cEA9d6"; 

// Function to get the contract instance with signer
const getContractWithSigner = async () => {
  if (typeof window.ethereum !== 'undefined') {
    // Request account access
    await window.ethereum.request({ method: 'eth_requestAccounts' });

    // Create an ethers provider from the window.ethereum object
    const provider = new ethers.BrowserProvider(window.ethereum);

    // Get the signer from the provider (which is the connected wallet)
    const signer = await provider.getSigner();

    // Create the contract instance with the signer
    return new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
  } else {
    throw new Error("Ethereum wallet not detected");
  }
};

export const BUYMOMO = async (formData) => {
  try {
    const contract = await getContractWithSigner();
    if (contract) {
      // Send the transaction to store data
      const tx = await contract.storeData(
        formData.name,
        formData.message,
        ethers.parseEther(formData.amount) // Convert the amount to Ether
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
    const contract = await getContractWithSigner();
    if (contract) {
      const data = await contract.retrieveAllData();
      return data;
    }
  } catch (error) {
    console.error("Error fetching memo:", error);
  }
};
