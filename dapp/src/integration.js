import { ethers } from 'ethers';
import abi from "../abi/abi.json"; // Ensure that your contract ABI is located here

const CONTRACT_ADDRESS = "0xd887477308537d0644E8bD6B247524c502cEA9d6"; 

// Function to connect to the contract
const connectContract = async () => {
  if (typeof window.ethereum !== 'undefined') {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
  } else {
    console.error("Ethereum wallet not detected");
  }
};

// Function to store data in the contract
export const BUYMOMO = async (formData) => {
  try {
    const contract = await connectContract();
    if (contract) {
      const tx = await contract.storeData(
        formData.name,
        formData.message,
        ethers.parseEther(formData.amount)
      );
      await tx.wait(); // Wait for transaction confirmation
      console.log("Transaction successful!");
    }
  } catch (error) {
    console.error("Error buying momo:", error);
  }
};

// Function to retrieve all data from the contract
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
