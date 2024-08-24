import React, { useEffect, useState } from 'react';
import { GETMEMO } from '../integration'; // Ensure correct import
import NavBar from '../components/NavBar';
import { ethers } from 'ethers'; // Import ethers for formatting Ether

const GetMemo = () => {
  const [memos, setMemos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GETMEMO();
        setMemos(data);
      } catch (error) {
        console.error("Error fetching memos:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <NavBar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">All Memos</h2>
        <div className="bg-white p-8 shadow-md rounded-md w-full max-w-3xl">
          {memos.length > 0 ? (
            <ul>
              {memos.map((memo, index) => (
                <li key={index} className="border-b border-gray-200 py-4">
                  <p><strong>Name:</strong> {memo.name}</p>
                  <p><strong>Message:</strong> {memo.message}</p>
                  <p><strong>Amount:</strong> {ethers.formatEther(memo.amount.toString())} ETH</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center">No memos found</p>
          )}
        </div>
      </div>
    </>
  );
};

export default GetMemo;
