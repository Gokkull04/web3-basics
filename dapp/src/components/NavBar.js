import React from 'react';
import Button from './button';

const Navbar = () => {
  return (
    <nav className="bg-gray-900 p-4 flex justify-between items-center">
      <div className="text-white text-2xl font-bold">
        web3-basic
      </div>
      <Button />
    </nav>
  );
};

export default Navbar;
