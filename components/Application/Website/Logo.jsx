import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center">
      <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
        <span className="text-white text-3xl font-bold">r</span>
      </div>
      <div className="ml-2">
        <h1 className="text-3xl font-bold text-orange-500">ROBU.IN</h1>
        <p className="text-sm text-blue-500">Your Ideas, Our Parts</p>
      </div>
    </div>
  );
};

export default Logo;
