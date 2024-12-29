import Addstudent from '@/components/Addstudent'
import Appsidebar from '@/components/ui/appsidebar'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator';
import React from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

const Dashboard = () => {
  return (
    <>
<SidebarProvider>
  <Appsidebar/>
  <SidebarInset>
<header className="flex h-16 shrink-0 items-center bg-white border-b border-gray-500 gap-2 transition-[width,height] ease-linear fixed w-full top-0 z-50 ">
  <div className="flex items-center gap-2 px-4">
      <SidebarTrigger className=" -ml-1" />
      <Separator className="h-4 mr-2 " orientation="vertical " />

      <Breadcrumb>
      <BreadcrumbList>
      <BreadcrumbItem className="hidden md:block">
      home
      </BreadcrumbItem>
      <BreadcrumbSeparator className="hidden md:block"/>
      <BreadcrumbItem className="hidden md:block">
      <BreadcrumbPage>
      Add student

      </BreadcrumbPage>
      </BreadcrumbItem>
      </BreadcrumbList>
      </Breadcrumb>
      </div>
   </header>
   
          <Addstudent/>
  </SidebarInset>
</SidebarProvider>
       
        
      
    </>
  )
}

export default Dashboard
