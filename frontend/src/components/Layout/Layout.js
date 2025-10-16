import React from 'react';
import Sidebar from '../Sidebar/Sidebar';

const Layout = ({ children }) => {
  return (
    <Sidebar>
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </Sidebar>
  );
};

export default Layout; 