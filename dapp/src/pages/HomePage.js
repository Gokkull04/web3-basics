import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BUYMOMO } from '../integration';
import NavBar from '../components/NavBar';

const HomePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    message: '',
    amount: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await BUYMOMO(formData); // Call the BUYMOMO function to store data
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md rounded-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Enter Details</h2>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Your Name"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Your Message"
              rows="4"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="amount" className="block text-gray-700 mb-2">Amount</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Amount"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition"
          >
            Submit
          </button>
        </form>
        <Link to="/getmemo" className="mt-8 text-blue-500 hover:underline">
          View All Memos
        </Link>
      </div>
    </>
  );
};

export default HomePage;
