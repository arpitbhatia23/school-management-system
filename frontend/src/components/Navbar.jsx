import Appsidebar from '@/components/ui/appsidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import React from 'react';

const Navbar = () => {
  return (
    <SidebarProvider>
      <Appsidebar />
    </SidebarProvider>
  );
};

export default Navbar;
