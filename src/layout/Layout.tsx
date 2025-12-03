import React from 'react';
import './Layout.scss';
import Logo from '@assets/Logo';
import { Button } from '@shared/ui/Button';
import LogoutIcon from '@assets/logout-svgrepo-com';

const Layout = ({ children }: { children: React.ReactNode }) => {
 return (
  <div className="layout h-100 w-100">
   <div className="layout__body flex-vertical gap-8 h-100 w-100">
    <header className="layout__header w-100 flex justify-space-between">
     <Logo />
     <Button link icon={<LogoutIcon width={26} />} />
    </header>
    <div className="layout__content h-100 flex-vertical">{children}</div>
   </div>
  </div>
 );
};

export default Layout;

