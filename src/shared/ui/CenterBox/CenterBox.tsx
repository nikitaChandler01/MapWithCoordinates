import React from 'react';

const CenterBox = ({ children }: { children: React.ReactNode }) => {
 return (
  <div className="center-box flex h-100 w-100 justify-center align-center">
   {children}
  </div>
 );
};

export default CenterBox;

