import Image from 'next/image';
import React from 'react';

const Header = () => {
  return (
    <header className=" shadow">
      <div className="flex justify-between items-center text-center mx-auto py-4 px-4">
        <Image src="/leader.svg" alt="Leader Consulting Logo" width={150} height={200} className="mr-4" />
        <h1 className="text-2xl font-bold text-neutral-600">POA GENERATOR</h1>
        <div></div>
        <div className=' xl:hidden'></div>
      </div>
    </header>
  );
};

export default Header;